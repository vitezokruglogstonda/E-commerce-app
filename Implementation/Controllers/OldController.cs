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
    [ApiController]
    [Route("[controller]")]
    public class OldController : ControllerBase
    {

        public ModelContext Context { get; set; }
        public IUserService Service { get; set; }

        public OldController(ModelContext context, IUserService service)
        {
            this.Context = context;
            this.Service = service;
        }
        //-----------------ovo su stari-----------------

        [HttpGet]
        [Route("PreuzmiSveProizvode")]
        public async Task<List<Proizvod>> PreuzmiSve()
        {
            return await Context.Proizvodi.ToListAsync();
        }

        //[Authorize]
        [HttpGet]
        [Route("PreuzmiOdProdavca/{id}")]
        public async Task<List<Proizvod>> PreuzmiOdProdavca(int id)
        {
            return await Context.Proizvodi.Where(p => p.ProdavacID == id && p.Odobren == true).ToListAsync();
        }

        [HttpGet]
        [Route("PreuzmiProizvod/{id}")]
        public async Task<Proizvod> PreuzmiJedan(int id)
        {
            return await Context.Proizvodi.Where(p => p.ID == id).FirstOrDefaultAsync();
        }

        [HttpGet]
        [Route("PreuzmiProdavca/{id}")]
        public async Task<ActionResult<Prodavac>> PreuzmiProdavca(int id)
        {
            Prodavac tmp = await Context.FindAsync<Prodavac>(id);
            //Korisnik tmp = await Context.Korisnici.Where(p => p.ID == id).FirstOrDefaultAsync();
            tmp.Proizvodi = await Context.Proizvodi.Where(p => p.ProdavacID == tmp.ID).ToListAsync();
            return tmp;
        }

        private async Task<List<Proizvod>> Feed(int amount, int _noOfItems, int rating)
        {
            List<Proizvod> ret = new List<Proizvod>();
            List<Proizvod> tmp = new List<Proizvod>();
            if (_noOfItems < amount)
            {
                if (rating != 0)
                {
                    tmp = await Context.Proizvodi.Where(p => p.Ocena == rating && p.Odobren == true).ToListAsync();
                }
                else
                {
                    tmp = await Context.Proizvodi.Where(p => p.Ocena == null && p.Odobren == true).ToListAsync();
                }
                if (tmp.Count > 0)
                {
                    if (_noOfItems + tmp.Count < amount)
                    {
                        _noOfItems += tmp.Count;
                        if (rating > 0)
                        {
                            rating--;
                        }
                        tmp.AddRange(await Feed(amount, _noOfItems, rating));
                    }
                    if (tmp.Count > amount)
                    {
                        ret = (List<Proizvod>)tmp.Take(amount);
                    }
                    ret = tmp;
                }
            }
            return ret;
        }

        [HttpGet]
        [Route("PopuniFeed/{amount}")]
        public async Task<List<Proizvod>> PopuniFeed(int amount)
        {
            List<Proizvod> proizvodi = new List<Proizvod>();
            int _noOfItems = 0;

            proizvodi.AddRange(await Feed(amount, _noOfItems, 5));

            List<Proizvod> povratna = new List<Proizvod>();
            Proizvod p = null;
            for (int i = proizvodi.Count; i > 0; i--)
            {
                switch (proizvodi[i].TipProizvoda)
                {
                    case "Prozor":
                        p = await Context.FindAsync<Prozor>(proizvodi[i].ID);
                        break;
                    case "Vrata":
                        p = await Context.FindAsync<Vrata>(proizvodi[i].ID);
                        break;
                    default:
                        break;
                }
                povratna.Add(p);
            }
            return povratna;
        }

        [HttpPost]
        [Route("DodajProizvod")]
        public async Task<IActionResult> DodajProizvod([FromBody] Proizvod proizvod)
        {
            Prodavac prodavac = await Context.FindAsync<Prodavac>(proizvod.ProdavacID);
            proizvod.Prodavac = prodavac;
            if (prodavac.Proizvodi == null)
                prodavac.Proizvodi = new List<Proizvod>();
            prodavac.Proizvodi.Add(proizvod);
            Context.Proizvodi.Add(proizvod);
            await Context.SaveChangesAsync();
            return Ok();
        }

        [Autorizacija(2)]
        [HttpPost]
        [Route("DodajProzor")]
        public async Task<IActionResult> DodajProizvod([FromBody] Prozor prozor)
        {
            Prodavac prodavac = await Context.FindAsync<Prodavac>(prozor.ProdavacID);
            prozor.Prodavac = prodavac;
            if (prodavac.Proizvodi == null)
                prodavac.Proizvodi = new List<Proizvod>();
            prodavac.Proizvodi.Add(prozor);
            Context.Proizvodi.Add(prozor);
            await Context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        [Route("DodajVrata")]
        public async Task<IActionResult> DodajVrata([FromBody] Vrata vrata)
        {
            Prodavac prodavac = await Context.FindAsync<Prodavac>(vrata.ProdavacID);
            vrata.Prodavac = prodavac;
            if (prodavac.Proizvodi == null)
                prodavac.Proizvodi = new List<Proizvod>();
            prodavac.Proizvodi.Add(vrata);
            Context.Proizvodi.Add(vrata);
            await Context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        [Route("DodajProdavca")]
        public async Task<IActionResult> DodajProdavca([FromBody] Prodavac prodavac)
        {
            if (prodavac == null)
            {
                return BadRequest();
            }
            else
            {
                //DODAVANJE LOKACIJE
                await Context.Korisnici.AddAsync(prodavac);
                await Context.SaveChangesAsync();
                return Ok();
            }

        }

        [HttpPost]
        [Route("DodajLokaciju")]
        public async Task<ActionResult<Lokacija>> DodajLokaciju([FromBody] Lokacija lok)
        {
            if (lok == null)
            {
                return BadRequest("lose matori");
            }
            else
            {
                await Context.Lokacije.AddAsync(lok);
                await Context.SaveChangesAsync();
                return Ok("sve oke");
            }

        }

        [HttpDelete]
        [Route("IzbrisiKorisnika/{id}")]
        public async Task<IActionResult> IzbrisiKorisnika(int id)
        {
            Korisnik tmp = await Context.FindAsync<Korisnik>(id);
            Context.Korisnici.Remove(tmp);
            await Context.SaveChangesAsync();
            return Ok();
        }
    }
}
