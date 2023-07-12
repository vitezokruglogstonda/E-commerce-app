using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WinScout.Autentikacija;
using WinScout.Models;
using WinScout.Service;
using WinScout.RequestResponse;
using Microsoft.EntityFrameworkCore;

namespace WinScout.Controllers
{
    [Autorizacija(1)]
    [Route("[controller]")]
    [ApiController]
    public class PosetilacController : Controller
    {
        public ModelContext Context { get; set; }
        public IUserService Service { get; set; }

        public PosetilacController(ModelContext context, IUserService service)
        {
            this.Context = context;
            this.Service = service;
        }

        [HttpGet]
        [Route("PreuzmiPosetioca")]
        public async Task<IActionResult> PreuzmiPosetioca() 
        {
            Posetilac posetilac = await Context.FindAsync<Posetilac>(((Korisnik)HttpContext.Items["User"]).ID);
            if (posetilac == null)
            {
                return BadRequest(new { message = "Nalog ne postoji."});
            }
            else
            {
                Context.Entry(posetilac).Collection(p => p.Favourites).Query().Where(p => p.Odobren==true).ToList();
                return Ok(posetilac);
            }
        }

        [HttpGet]
        [Route("PreuzmiProizvod/{tipProizvoda}/{proizvodID}")]
        public async Task<IActionResult> PreuzmiProizvod(string tipProizvoda, int proizvodID)
        {
            Posetilac posetilac = await Context.FindAsync<Posetilac>(((Korisnik)HttpContext.Items["User"]).ID);
            if (posetilac == null)
            {
                return BadRequest(new { message = "Nalog ne postoji." });
            }
            Context.Entry(posetilac).Collection(p => p.Favourites).Query().Where(p => p.Odobren == true).ToList();
            bool zapracen = false;
            ProizvodResponse odgovor;
            switch (tipProizvoda)
            {
                case "Prozor":
                    Prozor prozor = await Context.FindAsync<Prozor>(proizvodID);
                    if (prozor == null)
                    {
                        return BadRequest(new { message = "Nije pronadjen proizvod. Moguce da ste uneli pogresne parametre." });
                    }
                    if (!prozor.Odobren)
                    {
                        return BadRequest(new { message = "Proizvod nije odobren." });
                    }
                    await Context.Entry(prozor).Collection(p => p.Komentari)
                        .Query()
                        .OrderBy(p => p.Index)
                        .Include(p => p.Odgovori)
                        .Include(p => p.Korisnik)
                        .OrderBy(p => p.Index)
                        .ToListAsync();
                    if (posetilac.Favourites.Contains(prozor))
                    {
                        zapracen = true;
                    }
                    odgovor = new ProizvodResponse { Proizvod = prozor, Zapracen = zapracen };
                    return Ok(odgovor);
                case "Vrata":
                    Vrata vrata = await Context.FindAsync<Vrata>(proizvodID);
                    if (vrata == null)
                    {
                        return BadRequest(new { message = "Nije pronadjen proizvod. Moguce da ste uneli pogresne parametre." });
                    }
                    if (!vrata.Odobren)
                    {
                        return BadRequest(new { message = "Proizvod nije odobren." });
                    }
                    await Context.Entry(vrata)
                        .Collection(p => p.Komentari)
                        .Query()
                        .OrderBy(p => p.Index)
                        .Include(p => p.Odgovori)
                        .Include(p => p.Korisnik)
                        .OrderBy(p => p.Index)
                        .ToListAsync();
                    if (posetilac.Favourites.Contains(vrata))
                    {
                        zapracen = true;
                    }
                    odgovor = new ProizvodResponse { Proizvod = vrata, Zapracen = zapracen };
                    return Ok(odgovor);
                default:
                    return BadRequest(new { message = "Nije pronadjen proizvod. Moguce da ste uneli pogresne parametre." });
            }
        }

        [HttpPost]
        [Route("DodajKomentar")]
        public async Task<IActionResult> DodajKomentar([FromBody] KomentarZahtev zahtev)
        {
            Korisnik korisnik = (Korisnik)HttpContext.Items["User"];
            Proizvod proizvod = await Context.Proizvodi.FindAsync(zahtev.ProizvodID);
            Komentar iznad = null;
            int index = 0;
            if (proizvod == null)
            {
                return BadRequest(new { message = "Proizvod ne postoji. Moguce da ste uneli pogresan ID." });
            }
            if (proizvod.Komentari == null)
            {
                proizvod.Komentari = new List<Komentar>();
                proizvod.BrojKomentara = 1;
            }
            else if(zahtev.KomentarID != null)
            {
                iznad = await Context.Komentari.FindAsync(zahtev.KomentarID);
                if (iznad == null)
                {
                    return BadRequest(new { message = "Komentar na koji se dodaje odgovor ne postoji."});
                }
                if (iznad.Odgovori == null)
                {
                    iznad.Odgovori = new List<Komentar>();
                    iznad.BrojOdgovora = 1;
                }
                else
                {
                    index = (int)iznad.BrojOdgovora;
                    iznad.BrojOdgovora++;
                }
            }
            else
            {
                index = (int)proizvod.BrojKomentara;
                proizvod.BrojKomentara++;
            }
            Komentar komentar = new Komentar
            {
                Sadrzaj = zahtev.Sadrzaj,
                Index = index,
                ProizvodID = zahtev.ProizvodID,
                Proizvod = proizvod,
                KorisnikID = korisnik.ID,
                Korisnik = korisnik,
                KomentarID = zahtev.KomentarID,
                Iznad = iznad,
                BrojOdgovora = null,
                Odobren = false,
                Odgovori = null
            };
            Context.Komentari.Add(komentar);
            if(korisnik.Komentari == null)
            {
                korisnik.Komentari = new List<Komentar>();
            }
            korisnik.Komentari.Add(komentar);
            Context.Update<Korisnik>(korisnik);
            if(iznad == null)
            {
                proizvod.Komentari.Add(komentar);
                Context.Update<Proizvod>(proizvod);
            }
            else
            {
                iznad.Odgovori.Add(komentar);
                Context.Update<Komentar>(iznad);
            }
            await Context.SaveChangesAsync();
            return Ok(new { message = "Uspesno dodavanje komentara."});
        }

        [HttpPut]
        [Route("IzmeniKomentar/{komentarID}")]
        public async Task<IActionResult> IzmeniKomentar(int komentarID, [FromBody] string sadrzaj)
        {
            Komentar komentar = await Context.FindAsync<Komentar>(komentarID);
            if (komentar == null)
            {
                return BadRequest(new { message = "Izabrani komentar ne postoji." });
            }
            if (komentar.KorisnikID != ((Korisnik)HttpContext.Items["User"]).ID)
            {
                return BadRequest(new { message = "Nemate pristup tudjem komentaru." });
            }
            komentar.Sadrzaj = sadrzaj;
            komentar.Odobren = false;
            Context.Update<Komentar>(komentar);
            await Context.SaveChangesAsync();
            return Ok(new { message = "Uspesno izmenjen komentar."});
        }

        [HttpPut]
        [Route("Subscribe/{proizvodID}")]
        public async Task<IActionResult> Subscribe(int proizvodID)
        {
            Posetilac posetilac = await Context.FindAsync<Posetilac>(((Korisnik)HttpContext.Items["User"]).ID);
            Proizvod proizvod = await Context.FindAsync<Proizvod>(proizvodID);
            if (proizvod == null)
            {
                return BadRequest(new { message = "Proizvod ne postoji. Verovatno ste uneli pogresan ID." });
            }
            Service.Subscribe(posetilac, proizvod);
            await Context.SaveChangesAsync();
            return Ok(new { message = "Proizvod je dodat u Favourites."});
        }

        [HttpPut]
        [Route("Unsubscribe/{proizvodID}")]
        public async Task<IActionResult> Unsubscribe(int proizvodID)
        {
            Posetilac posetilac = await Context.FindAsync<Posetilac>(((Korisnik)HttpContext.Items["User"]).ID);
            Proizvod proizvod = await Context.FindAsync<Proizvod>(proizvodID);
            if (proizvod == null)
            {
                return BadRequest(new { message = "Proizvod ne postoji. Verovatno ste uneli pogresan ID." });
            }
            Service.Unsubscribe(posetilac, proizvod);
            await Context.SaveChangesAsync();
            return Ok(new { message = "Proizvod je izbacen iz Favourites." });
        }

        [HttpPut]
        [Route("Oceni/{proizvodID}/{ocena}")]
        public async Task<IActionResult> Oceni(int proizvodID, int ocena)
        {
            if(ocena <1 || ocena > 5)
            {
                return BadRequest(new { message = "Nevalidna ocena." });
            }
            Proizvod proizvod = await Context.Proizvodi.FindAsync(proizvodID);
            if(proizvod == null)
            {
                return BadRequest(new { message = "Proizvod ne postoji. Moguce da ste uneli pogresan ID" });
            }
            Service.Oceni(proizvod, ocena);
            await Context.SaveChangesAsync();
            return Ok(new { message = "Uspesno ocenjen proizvod." });
        }

        //explicit loading?
        [HttpDelete]
        [Route("IzbrisiPosetioca/{id}")]
        public async Task<IActionResult> IzbrisiPosetioca(int id)
        {
            Posetilac posetilac = await Context.FindAsync<Posetilac>(((Korisnik)HttpContext.Items["User"]).ID);

            if (posetilac.Komentari != null)
            {
                foreach (Komentar komentar in posetilac.Komentari)
                {
                    await IzbrisiKomentar(komentar.ID);
                }
            }
            if (posetilac.Favourites != null)
            {
                foreach (Proizvod proizvod in posetilac.Favourites)
                {
                    Service.Unsubscribe(posetilac, proizvod);
                }
            }
            Context.Korisnici.Remove(posetilac);
            await Context.SaveChangesAsync();

            return Ok();

        }

        [HttpDelete]
        [Route("IzbrisiKomentar/{komentarID}")]
        public async Task<IActionResult> IzbrisiKomentar(int komentarID)
        {
            Korisnik korisnik = (Korisnik)HttpContext.Items["User"];
            Komentar komentar = await Context.Komentari.FindAsync(komentarID);
            
            if (komentar != null)
            {
                if (komentar.KorisnikID != korisnik.ID)
                {
                    return BadRequest(new { message = "Nemate pristup tudjem komentaru." });
                }
                await Context.Entry(komentar).Reference(p => p.Iznad).LoadAsync();
                if (komentar.Iznad != null)
                {
                    await Context.Entry(komentar.Iznad).Collection(p => p.Odgovori).LoadAsync();
                    komentar.Iznad.BrojOdgovora--;
                    komentar.Iznad.Odgovori.Remove(komentar);
                    Context.Update<Komentar>(komentar.Iznad);
                }
                await Context.Entry(komentar).Collection(p => p.Odgovori).LoadAsync();
                if (komentar.Odgovori != null)
                {
                    foreach (Komentar odgovor in komentar.Odgovori)
                    {
                        await IzbrisiKomentar(odgovor.ID);
                    }
                }
                await Context.Entry(komentar).Reference(p => p.Korisnik).LoadAsync();
                await Context.Entry(komentar).Reference(p => p.Proizvod).LoadAsync();
                await Context.Entry(komentar.Korisnik).Collection(p => p.Komentari).LoadAsync();
                await Context.Entry(komentar.Proizvod).Collection(p => p.Komentari).LoadAsync();
                komentar.Proizvod.BrojKomentara--;
                komentar.Proizvod.Komentari.Remove(komentar);
                Context.Update<Proizvod>(komentar.Proizvod);
                komentar.Korisnik.Komentari.Remove(komentar);
                Context.Update<Korisnik>(komentar.Korisnik);
                Context.Komentari.Remove(komentar);
                await Context.SaveChangesAsync();
            }
            return Ok(new { message = "Uspesno izbrisan komentar." });
        }
    }
}
