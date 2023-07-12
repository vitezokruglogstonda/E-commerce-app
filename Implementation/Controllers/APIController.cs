using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WinScout.Models;
using WinScout.Autentikacija;
using WinScout.Service;
using WinScout.RequestResponse;
using Microsoft.Extensions.Options;

namespace WinScout.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class APIController : ControllerBase
    {

        public ModelContext Context { get; set; }
        public IUserService Service{ get; set; }
        public URLs URL { get; set; }

        public APIController(ModelContext context, IUserService service, IOptions<URLs> url)
        {
            this.Context = context;
            this.Service = service;
            this.URL = url.Value;
        }

        [HttpGet]
        [Route("PreuzmiPodavca/{prodavacID}")]
        public async Task<IActionResult> PreuzmiPodavca(int prodavacID)
        {
            Prodavac prodavac = await Context.FindAsync<Prodavac>(prodavacID);
            if (prodavac == null || prodavac.Odobren==false)
            {
                return BadRequest(new { message = "Prodavac nije pronadjen. Mozda ste uneli pogresan ID ili nije odobren."});
            }
            await Context.Entry(prodavac).Reference(p => p.Lokacija).LoadAsync();
            await Context.Entry(prodavac).Collection(p => p.Proizvodi).Query().Where(p => p.Odobren == true).ToListAsync();
            return Ok(prodavac);
        }

        [HttpGet]
        [Route("PopuniFeed/{amount}")]
        public async Task<List<Proizvod>> PopuniFeed(int amount)
        {
            List<Proizvod> proizvodi = await Context.Proizvodi.OrderByDescending(p => p.Ocena).Take(amount).ToListAsync();
            //if(amount > proizvodi.Count)
            //{
            //    proizvodi = (List<Proizvod>)proizvodi.Take(amount);
            //}
            if(proizvodi == null)
            {
                proizvodi = await Context.Proizvodi.Take(amount).ToListAsync();
            }
            return proizvodi;
        }

        [HttpGet]
        [Route("PreuzmiProizvod/{tipProizvoda}/{proizvodID}")]
        public async Task<IActionResult> PreuzmiProizvod(string tipProizvoda, int proizvodID)
        {
            switch (tipProizvoda)
            {
                case "Prozor":
                    Prozor prozor = await Context.FindAsync<Prozor>(proizvodID);
                    if(prozor == null)
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
                    return Ok(prozor);
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
                    return Ok(vrata);
                default:
                    return BadRequest(new { message = "Nije pronadjen proizvod. Moguce da ste uneli pogresne parametre." });
            }
        }

        [HttpPost]
        [Route("PreuzmiSveProizvode/{tipProizvoda}/{sortOrder}/{pageNumber}/{pageSize}/")]
        public async Task<IActionResult> PreuzmiProizvode(string tipProizvoda, string sortOrder, int? pageNumber, int? pageSize, [FromBody] FilterRequest? filter)
        {
            pageNumber = pageNumber == null ? 1 : pageNumber;
            pageSize = pageSize == null ? 12 : pageSize;

            List<Proizvod> proizvodi;
            switch (sortOrder)
            {
                case "Rastuce":
                        proizvodi = await Context
                        .Proizvodi
                        .OrderBy(p => p.Cena)
                        .Where(p => String.Equals(p.TipProizvoda, tipProizvoda) && p.Odobren == true)
                        .Skip(((int)pageNumber - 1) * (int)pageSize)
                        .Take((int)pageSize)
                        .ToListAsync();
                    break;
                case "Opadajuce":
                        proizvodi = await Context
                        .Proizvodi
                        .OrderByDescending(p => p.Cena)
                        .Where(p => String.Equals(p.TipProizvoda, tipProizvoda) && p.Odobren == true)
                        .Skip(((int)pageNumber - 1) * (int)pageSize)
                        .Take((int)pageSize)
                        .ToListAsync();
                    break;
                default:
                    return BadRequest(new { message = "Odaberite sort order."});
            }

            if (proizvodi == null)
            {
                return Ok(new { message = "Trenutno nema proizvoda ovog tipa." });
            }

            if (filter != null)
            {
                proizvodi = Service.Filtriraj(proizvodi, filter, tipProizvoda);
            }

            Uri? prev, next;
            if (pageNumber == 1)
            {
                prev = null;
            }
            else
            {
                prev = new Uri(URL.PreuzmiSveProizvode + tipProizvoda.ToString() + "/" + sortOrder + "/" + (pageNumber - 1).ToString() + "/" + pageSize.ToString());
            }
            if (proizvodi.Count < pageSize)
            {
                pageSize = proizvodi.Count;
                next = null;
            }
            else
            {
                next = new Uri(URL.PreuzmiSveProizvode + tipProizvoda.ToString() + "/" + sortOrder + "/" + (pageNumber + 1).ToString() + "/" + pageSize.ToString());
            }

            pageSize = proizvodi.Count < pageSize ? proizvodi.Count : pageSize;

            PageResponse odgovor = new PageResponse
            {
                PageNumber = (int)pageNumber,
                PageSize = (int)pageSize,
                PreviousPage = prev,
                NextPage = next,
                Data = proizvodi
            };


            return Ok(odgovor);
        }

        [HttpGet]
        [Route("PreuzmiSveProizvode")]
        public async Task<IActionResult> PreuzmiSveProizvode()
        {
            List<Proizvod> proizvodi = await Context.Proizvodi
                .Where(p => p.Odobren == true)
                .ToListAsync();
            if(proizvodi == null)
            {
                return Ok(new { message = "Trenutno nema proizvoda."});
            }
            return Ok(proizvodi);
        }

        [HttpGet]
        [Route("Search/{pretraga}")]
        public async Task<IActionResult> Search(string pretraga)
        {
            List<SearchResult> rezultat = new List<SearchResult>();
            List<Prodavac> prodavci = new List<Prodavac>();
            List<Proizvod> proizvodi = new List<Proizvod>();

            proizvodi = await Context.Proizvodi
                .Where(p => p.Naziv.ToUpper().Contains(pretraga.ToUpper()))
                .ToListAsync();
            foreach(Proizvod p in proizvodi)
            {
                SearchResult rez = new SearchResult { Klasa = "Proizvod", Objekat = p};
                rezultat.Add(rez);
            }

            prodavci = await Context.Korisnici
                .OfType<Prodavac>()
                .Where(p => p.Naziv.ToUpper().Contains(pretraga.ToUpper()))
                .ToListAsync();
            foreach (Prodavac p in prodavci)
            {
                SearchResult rez = new SearchResult { Klasa = "Prodavac", Objekat = p };
                rezultat.Add(rez);
            }

            return Ok(rezultat);
        }

    }
}
