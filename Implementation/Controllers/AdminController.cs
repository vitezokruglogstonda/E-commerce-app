using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WinScout.Autentikacija;
using WinScout.Models;
using WinScout.Service;

namespace WinScout.Controllers
{
    [Autorizacija(3)]
    [ApiController]
    [Route("[controller]")]
    public class AdminController : Controller
    {
        public ModelContext Context { get; set; }
        public IUserService Service { get; set; }

        public AdminController(ModelContext context, IUserService service)
        {
            this.Context = context;
            this.Service = service;
        }

        [HttpGet]
        [Route("PreuzmiPosetioce")]
        public async Task<IActionResult> PreuzmiPosetioce()
        {
            List<Korisnik> posetioci = await Context.Korisnici.Where(p => String.Equals(p.TipKorisnika, "Posetilac")).ToListAsync();
            if(posetioci != null)
            {
                return Ok(posetioci);
            }
            else
            {
                return BadRequest(new { message = "Nema ni jednog posetioca u bazi."}); 
            }
        }

        [HttpGet]
        [Route("PreuzmiProdavce")]
        public async Task<IActionResult> PreuzmiProdavce()
        {
            List<Korisnik> prodavci = await Context.Korisnici.Where(p => String.Equals(p.TipKorisnika, "Prodavac")).ToListAsync();
            if (prodavci != null)
            {
                return Ok(prodavci);
            }
            else
            {
                return BadRequest(new { message = "Nema ni jednog prodavca u bazi." });
            }
        }

        [HttpGet]
        [Route("PreuzmiNeodobreneProizvode")]
        public async Task<IActionResult> PreuzmiNeodobreneProizvode()
        {
            List<Proizvod> proizvodi = await Context.Proizvodi
                .Where(p => p.Odobren == false)
                .Include(p => p.Prodavac)
                .ToListAsync();
            if(proizvodi == null)
            {
                return Ok(new { message = "Trenutno su svi proizvodi odobreni."});
            }
            else
            {
                return Ok(proizvodi);
            }
        }

        [HttpGet]
        [Route("PreuzmiNeodobreneKomentare")]
        public async Task<IActionResult> PreuzmiNeodobreneKomentare()
        {
            List<Komentar> komentari = await Context.Komentari
                .Where(p => p.Odobren == false)
                .Include(p => p.Korisnik).ToListAsync();
            if (komentari == null)
            {
                return Ok(new { message = "Trenutno nema novih komentara." });
            }
            else
            {
                return Ok(komentari);
            }
        }

        [HttpPut]
        [Route("OdobriProizvod/{id}")]
        public async Task<IActionResult> OdobriProizvod(int id)
        {
            Proizvod proizvod = await Context.FindAsync<Proizvod>(id);
            if (proizvod == null)
            {
                return BadRequest("Proizvod ne postoji!");
            }
            else if (proizvod.Odobren)
            {
                return Ok("Proizvod je vec odobren.");
            }
            else
            {
                proizvod.Odobren = true;
                Context.Update<Proizvod>(proizvod);
                await Context.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpPut]
        [Route("OdobriKomentar/{id}")]
        public async Task<IActionResult> OdobriKomentar(int id)
        {
            Komentar komentar = await Context.FindAsync<Komentar>(id);
            if (komentar == null)
            {
                return BadRequest("Proizvod ne postoji!");
            }
            else if (komentar.Odobren)
            {
                return Ok("Proizvod je vec odobren.");
            }
            else
            {
                komentar.Odobren = true;
                Context.Update<Komentar>(komentar);
                await Context.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpDelete]
        [Route("IzbrisiProdavca/{id}")]
        public async Task<IActionResult> IzbrisiProdavca(int id)
        {
            Prodavac prodavac = await Context.FindAsync<Prodavac>(id);

            if(prodavac == null)
            {
                return BadRequest(new { message = "Prodavac ne postoji"});
            }

            await Context.Entry(prodavac).Collection(p => p.Komentari).LoadAsync();
            if (prodavac.Komentari != null)
            {
                foreach (Komentar komentar in prodavac.Komentari)
                {
                    await IzbrisiKomentar(komentar.ID);
                }
            }

            IUserService.ImageType tip = IUserService.ImageType.Prodavac;
            if (!Service.ObrisiSliku(prodavac.Slika, tip))
            {
                Console.WriteLine("Neuspesno brisanje slike " + prodavac.Slika);
            }

            await Context.Entry(prodavac).Collection(p => p.Proizvodi).LoadAsync();
            if (prodavac.Proizvodi != null)
            {
                foreach (Proizvod proizvod in prodavac.Proizvodi)
                {
                    await IzbrisiProizvod(proizvod.ID);
                }
            }

            Context.Korisnici.Remove(prodavac);
            Service.Ban(prodavac.Mail);
            await Context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [Route("IzbrisiPosetioca/{id}")]
        public async Task<IActionResult> IzbrisiPosetioca(int id)
        {
            Posetilac posetilac = await Context.FindAsync<Posetilac>(id);

            if (posetilac == null)
            {
                return BadRequest(new { message = "Prodavac ne postoji" });
            }

            await Context.Entry(posetilac).Collection(p => p.Komentari).LoadAsync();
            if (posetilac.Komentari != null)
            {
                foreach (Komentar komentar in posetilac.Komentari)
                {
                    await IzbrisiKomentar(komentar.ID);
                }
            }

            await Context.Entry(posetilac).Collection(p => p.Favourites).LoadAsync();
            if (posetilac.Favourites != null)
            {
                foreach (Proizvod proizvod in posetilac.Favourites)
                {
                    Service.Unsubscribe(posetilac, proizvod);
                }
            }
            Context.Korisnici.Remove(posetilac);
            Service.Ban(posetilac.Mail);
            await Context.SaveChangesAsync();

            return Ok();

        }

        [HttpDelete]
        [Route("IzbrisiProizvod/{id}")]
        public async Task<IActionResult> IzbrisiProizvod(int id)
        {
            Proizvod proizvod = await Context.Proizvodi.FindAsync(id);
            if (proizvod != null)
            {
                await Context.Entry(proizvod).Collection(p => p.Komentari).Query().ToListAsync();
                await Context.Entry(proizvod).Collection(p => p.Subscribers).Query().ToListAsync();
                Prodavac prodavac = await Context.FindAsync<Prodavac>(proizvod.ProdavacID);
                await Context.Entry(prodavac).Collection(p => p.Proizvodi).LoadAsync();
                prodavac.Proizvodi.Remove(proizvod);
                Context.Update<Prodavac>(prodavac);
                if (proizvod.Komentari != null)
                {
                    foreach (Komentar komentar in proizvod.Komentari)
                    {
                        await IzbrisiKomentar(komentar.ID);
                    }
                }
                IUserService.ImageType tip = IUserService.ImageType.Proizvod;
                Service.ObrisiSliku(proizvod.Slika, tip, proizvod.TipProizvoda);

                if (proizvod.Subscribers != null)
                {
                    foreach (Posetilac posetilac in proizvod.Subscribers)
                    {
                        Service.Unsubscribe(posetilac, proizvod);
                    }
                }
                Context.Proizvodi.Remove(proizvod);
                await Context.SaveChangesAsync();
            }
            return Ok(new { message = "Uspesno izbrisan proizvod." });
        }

        [HttpDelete]
        [Route("IzbrisiKomentar/{id}")]
        public async Task<IActionResult> IzbrisiKomentar(int id)
        {
            Komentar komentar = await Context.Komentari.FindAsync();
            if (komentar != null)
            {
                await Context.Entry(komentar).Collection(p => p.Odgovori).Query().ToListAsync();
                await Context.Entry(komentar).Reference(p => p.Iznad).LoadAsync();
                await Context.Entry(komentar.Iznad).Collection(p => p.Odgovori).Query().ToListAsync();
                await Context.Entry(komentar).Reference(p => p.Proizvod).LoadAsync();
                await Context.Entry(komentar.Proizvod).Collection(p => p.Komentari).Query().ToListAsync();
                await Context.Entry(komentar).Reference(p => p.Korisnik).LoadAsync();
                await Context.Entry(komentar.Korisnik).Collection(p => p.Komentari).Query().ToListAsync();

                if (komentar.Iznad != null)
                {
                    komentar.Iznad.BrojOdgovora--;
                    komentar.Iznad.Odgovori.Remove(komentar);
                    Context.Update<Komentar>(komentar.Iznad);
                }

                if (komentar.Odgovori != null)
                {
                    foreach (Komentar odgovor in komentar.Odgovori)
                    {
                        await IzbrisiKomentar(odgovor.ID);
                    }
                }

                komentar.Proizvod.BrojKomentara--;
                komentar.Proizvod.Komentari.Remove(komentar);
                Context.Update<Proizvod>(komentar.Proizvod);

                komentar.Korisnik.Komentari.Remove(komentar);
                Context.Komentari.Remove(komentar);
                await Context.SaveChangesAsync();
            }
            return Ok(new { message = "Uspesno izbrisan komentar." });
        }


    }
}
