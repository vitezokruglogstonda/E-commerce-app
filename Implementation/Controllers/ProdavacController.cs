using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WinScout.Models;
using WinScout.Service;
using WinScout.Autentikacija;
using WinScout.RequestResponse;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace WinScout.Controllers
{
    [Autorizacija(2)]
    [Route("[controller]")]
    [ApiController]
    public class ProdavacController : ControllerBase
    {
        public ModelContext Context { get; set; }
        public IUserService Service { get; set; }

        public ProdavacController(ModelContext context, IUserService service)
        {
            this.Context = context;
            this.Service = service;
        }

        [HttpGet]
        [Route("PreuzmiProdavca")]
        public async Task<IActionResult> PreuzmiProdavca()
        {
            Prodavac prodavac = await Context
                .FindAsync<Prodavac>(((Korisnik)HttpContext.Items["User"]).ID);
            await Context.Entry(prodavac)
                .Reference(p => p.Lokacija)
                .LoadAsync();
            Context.Entry(prodavac)
                .Collection(p => p.Proizvodi)
                .Query()
                .ToList();
            return Ok(prodavac);
        }

        //proveri da l preuzima proizvode
        [HttpGet]
        [Route("PreuzmiNeodobreneProizvode")]
        public async Task<IActionResult> PreuzmiNeodobreneProizvode()
        {
            //List<Proizvod> proizvodi =  Context.Proizvodi
            //    .Where(p => p.ProdavacID == ((Korisnik)HttpContext.Items["User"]).ID && p.Odobren == false)
            //    .ToList();
            Prodavac prodavac = await Context
                .FindAsync<Prodavac>(((Korisnik)HttpContext.Items["User"]).ID);
            Context.Entry(prodavac)
                .Collection(p => p.Proizvodi)
                .Query()
                .Where(p => p.Odobren == false)
                .ToList();
            if (prodavac.Proizvodi == null)
            {
                return Ok(new { message = "Trenutno su svi proizvodi odobreni." });
            }
            else
            {
                return Ok(prodavac.Proizvodi);
            }
        }

        [HttpGet]
        [Route("PreuzmiProizvod/{tipProizvoda}/{proizvodID}")]
        public async Task<IActionResult> PreuzmiProizvod(string tipProizvoda, int proizvodID)
        {
            switch (tipProizvoda)
            {
                case "Prozor":
                    Prozor prozor = await Context.FindAsync<Prozor>(proizvodID);
                    if (prozor == null)
                    {
                        return BadRequest(new { message = "Nije pronadjen proizvod. Moguce da ste uneli pogresne parametre." });
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
                    await Context.Entry(vrata).Collection(p => p.Komentari)
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

        [HttpGet]
        [Route("PreuzmiKarakteristike/{tipProizvoda}")]
        public async Task<IActionResult> PreuzmiKarakteristike(string tipProizvoda)
        {
            Karakteristike karakteristike;
            string message = Service.UpisiKarakteristike(out karakteristike, tipProizvoda);
            if (message != null)
            {
                return BadRequest(new { message = message });
            }
            else
            {
                return Ok(karakteristike);
            }
        }

        [HttpPost]
        [Route("DodajProizvod")]
        public async Task<IActionResult> DodajProizvod([FromForm] string objekat, [FromForm] IFormFile? Slika)
        {
            ProizvodZahtev zahtev = JsonConvert.DeserializeObject<ProizvodZahtev>(objekat);

            Prodavac prodavac = await Context.FindAsync<Prodavac>(((Korisnik)HttpContext.Items["User"]).ID);
            await Context.Entry(prodavac).Collection(p => p.Proizvodi).Query().ToListAsync();

            if (prodavac.Proizvodi == null)
            {
                prodavac.Proizvodi = new List<Proizvod>();
            }
            else if (prodavac.Proizvodi.Any(p=> p.Naziv == zahtev.Naziv))
            {
                return BadRequest(new { message = "Proizvod vec postoji."});
            }

            IUserService.ImageType tip = IUserService.ImageType.Proizvod;
            string slika = Service.DodajSliku(Slika, tip, zahtev.TipProizvoda);

            double duzina, sirina;
            Service.IzvadiDimenzije(zahtev.Dimenzije, out duzina, out sirina);

            switch (zahtev.TipProizvoda)
            {
                case "Prozor":
                    Prozor prozor = new Prozor
                    {
                        Naziv = zahtev.Naziv,
                        TipProizvoda = zahtev.TipProizvoda,
                        Cena = zahtev.Cena,
                        OpisProizvoda = zahtev.OpisProizvoda,
                        Odobren = false,
                        Ocena = null,
                        OcenaKoeficijent = 0,
                        BrojKomentara = 0,
                        Komentari = null,
                        Prodavac = prodavac,
                        ProdavacID = prodavac.ID,
                        Subscribers = null,
                        Duzina = duzina,
                        Sirina = sirina,
                        Materijal = zahtev.Materijal,
                        SistemOtvaranja = zahtev.SistemOtvaranja,
                        Koeficijent = (double)zahtev.Koeficijent,
                        Staklo = zahtev.Staklo,
                        DebljinaStakla = (double)zahtev.DebljinaStakla,
                        Komore = (int)zahtev.Komore,
                        Paneli = (int)zahtev.Paneli,
                        TipProzora = zahtev.TipProzora,
                        Slika = slika,
                        Mrezica = zahtev.Mrezica,
                        Roletne = zahtev.Roletne,
                    };
                    //await Context.Proizvodi.AddAsync(prozor);
                    prodavac.Proizvodi.Add(prozor);
                    break;
                case "Vrata":
                    string staklo = "Nema";
                    if (zahtev.DebljinaStakla != null) 
                    {
                        staklo = "Ima"; 
                    }
                    Vrata vrata = new Vrata { 
                        Naziv = zahtev.Naziv, 
                        TipProizvoda = zahtev.TipProizvoda,
                        Cena = zahtev.Cena,
                        OpisProizvoda = zahtev.OpisProizvoda,
                        Odobren = false,
                        Ocena = null,
                        OcenaKoeficijent = 0,
                        BrojKomentara = 0,
                        Komentari = null,
                        Prodavac = prodavac,
                        ProdavacID = prodavac.ID,
                        Subscribers = null,
                        Duzina = duzina,
                        Sirina = sirina,
                        Materijal = zahtev.Materijal,
                        Primena = zahtev.Primena,
                        Koeficijent = (double)zahtev.Koeficijent,
                        Staklo = staklo,
                        DebljinaStakla = zahtev.DebljinaStakla,
                        Komore = (int)zahtev.Komore,
                        TipVrata = zahtev.TipVrata,
                        Slika=slika 
                    };
                    //await Context.Proizvodi.AddAsync(vrata);
                    prodavac.Proizvodi.Add(vrata);
                    break;
                default:
                    break;
            }
            Context.Update<Prodavac>(prodavac);
            await Context.SaveChangesAsync();
            return Ok(new { message = "Uspesno dodat proizvod."});
        }

        [HttpPut]
        [Route("IzmeniProizvod/{proizvodID}")]
        public async Task<IActionResult> IzmeniProizvod(int proizvodID, [FromForm] string objekat, [FromForm] IFormFile? Slika)
        {
            ProizvodZahtev zahtev = JsonConvert.DeserializeObject<ProizvodZahtev>(objekat);

            Korisnik korisnik = (Korisnik)HttpContext.Items["User"];
            switch (zahtev.TipProizvoda)
            {
                case "Prozor":
                    Prozor prozor = await Context.FindAsync<Prozor>(proizvodID);
                    if (prozor == null)
                    {
                        return BadRequest(new { message = "Proizvod ne postoji. Verovatno ste uneli pogresan ID."});
                    }
                    else if (prozor.ProdavacID != korisnik.ID)
                    {
                        return BadRequest(new { message = "Nemate pristup tudjem proizvodu." });
                    }
                    double duzina, sirina;
                    Service.IzvadiDimenzije(zahtev.Dimenzije, out duzina, out sirina);

                    prozor.Naziv = zahtev.Naziv;
                    prozor.TipProizvoda = zahtev.TipProizvoda;
                    prozor.Cena = zahtev.Cena;
                    prozor.OpisProizvoda = zahtev.OpisProizvoda;
                    prozor.Odobren = false;
                    prozor.Duzina = duzina;
                    prozor.Sirina = sirina;
                    prozor.Materijal = zahtev.Materijal;
                    prozor.SistemOtvaranja = zahtev.SistemOtvaranja;
                    prozor.Koeficijent = (double)zahtev.Koeficijent;
                    prozor.Staklo = zahtev.Staklo;
                    prozor.DebljinaStakla = (double)zahtev.DebljinaStakla;
                    prozor.Komore = (int)zahtev.Komore;
                    prozor.Paneli = (int)zahtev.Paneli;
                    prozor.TipProzora = zahtev.TipProzora;
                    prozor.Roletne = zahtev.Roletne;
                    prozor.Mrezica = zahtev.Mrezica;
        //AKO SE NE MENJA, SLIKA MORA BITI NULL
                    if (Slika != null)
                    {
                        IUserService.ImageType tip = IUserService.ImageType.Proizvod;
                        Service.ObrisiSliku(prozor.Slika, tip, "Prozor");
                        prozor.Slika = Service.DodajSliku(Slika, tip, zahtev.TipProizvoda);
                    }
                    Context.Update<Prozor>(prozor);
                    break;
                case "Vrata":
                    Vrata vrata = await Context.FindAsync<Vrata>(proizvodID);
                    if (vrata == null)
                    {
                        return BadRequest(new { message = "Proizvod ne postoji. Verovatno ste uneli pogresan ID." });
                    }
                    else if (vrata.ProdavacID != korisnik.ID)
                    {
                        return BadRequest(new { message = "Nemate pristup tudjem proizvodu." });
                    }
                    Service.IzvadiDimenzije(zahtev.Dimenzije, out duzina, out sirina);
                    string staklo = "Nema";
                    if (zahtev.DebljinaStakla != null)
                    {
                        staklo = "Ima";
                    }
                    vrata.Naziv = zahtev.Naziv;
                    vrata.TipProizvoda = zahtev.TipProizvoda;
                    vrata.Cena = zahtev.Cena;
                    vrata.OpisProizvoda = zahtev.OpisProizvoda;
                    vrata.Odobren = false;
                    vrata.Duzina = duzina;
                    vrata.Sirina = sirina;
                    vrata.Materijal = zahtev.Materijal;
                    vrata.Primena = zahtev.Primena;
                    vrata.Koeficijent = (double)zahtev.Koeficijent;
                    vrata.Staklo = staklo;
                    vrata.DebljinaStakla = (double)zahtev.DebljinaStakla;
                    vrata.Komore = (int)zahtev.Komore;
                    vrata.TipVrata = zahtev.TipVrata;
                    if (Slika != null)
                    {
                        IUserService.ImageType tip = IUserService.ImageType.Proizvod;
                        Service.ObrisiSliku(vrata.Slika, tip, "Vrata");
                        vrata.Slika = Service.DodajSliku(Slika, tip, zahtev.TipProizvoda);
                    }
                    Context.Update<Vrata>(vrata);
                    break;
                default:
                    break;
            }
            await Context.SaveChangesAsync();
            return Ok(new { message = "Uspesno promenjen proizvod."});
        }

        [HttpPost]
        [Route("DodajKomentar")]
        public async Task<IActionResult> DodajKomentar([FromBody] KomentarZahtev zahtev)
        {
            Korisnik korisnik = (Korisnik)HttpContext.Items["User"];
            await Context.Entry(korisnik).Collection(p => p.Komentari).Query().ToListAsync();
            Proizvod proizvod = await Context.Proizvodi.FindAsync(zahtev.ProizvodID);
            await Context.Entry(proizvod).Collection(p => p.Komentari).Query().ToListAsync();
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
            else if (zahtev.KomentarID != null)
            {
                iznad = await Context.Komentari.FindAsync(zahtev.KomentarID);
                if (iznad == null)
                {
                    return BadRequest(new { message = "Komentar na koji se dodaje odgovor ne postoji." });
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
            if (korisnik.Komentari == null)
            {
                korisnik.Komentari = new List<Komentar>();
            }
            korisnik.Komentari.Add(komentar);
            Context.Update<Korisnik>(korisnik);
            if (iznad == null)
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
            return Ok(new { message = "Uspesno dodavanje komentara." });
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
            return Ok(new { message = "Uspesno izmenjen komentar." });
        }

        [HttpDelete]
        [Route("IzbrisiProizvod/{proizvodID}")]
        public async Task<IActionResult> IzbrisiProizvod(int proizvodID) 
        {
            Korisnik korisnik = (Korisnik)HttpContext.Items["User"];
            Proizvod proizvod = await Context.Proizvodi.FindAsync(proizvodID);
            if (proizvod != null)
            {
                if (proizvod.ProdavacID != korisnik.ID)
                {
                    return BadRequest(new { message = "Nemate pristup tudjem proizvodu." });
                }
                Prodavac prodavac = await Context.FindAsync<Prodavac>(proizvod.ProdavacID);
                await Context.Entry(prodavac).Collection(p => p.Proizvodi).Query().ToListAsync();
                await Context.Entry(proizvod).Collection(p => p.Komentari).Query().ToListAsync();
                await Context.Entry(proizvod).Collection(p => p.Subscribers).Query().ToListAsync();

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
        [Route("IzbrisiKomentar/{komentarID}")]
        public async Task<IActionResult> IzbrisiKomentar(int komentarID)
        {
            Korisnik korisnik = (Korisnik)HttpContext.Items["User"];
            Komentar komentar = await Context.Komentari.FindAsync(komentarID);
            await Context.Entry(komentar).Collection(p => p.Odgovori).Query().ToListAsync();
            await Context.Entry(komentar).Reference(p => p.Iznad).LoadAsync();
            await Context.Entry(komentar.Iznad).Collection(p => p.Odgovori).Query().ToListAsync();
            await Context.Entry(komentar).Reference(p => p.Proizvod).LoadAsync();
            await Context.Entry(komentar.Proizvod).Collection(p => p.Komentari).Query().ToListAsync();
            await Context.Entry(komentar).Reference(p => p.Korisnik).LoadAsync();
            await Context.Entry(komentar.Korisnik).Collection(p => p.Komentari).Query().ToListAsync();

            if (komentar != null)
            {
                if (komentar.KorisnikID != korisnik.ID)
                {
                    return BadRequest(new { message = "Nemate pristup tudjem komentaru." });
                }
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
                Context.Update<Korisnik>(komentar.Korisnik);
                Context.Komentari.Remove(komentar);
                await Context.SaveChangesAsync();
            }
            return Ok(new { message = "Uspesno izbrisan komentar." });
        }

        //da li treba preuzeti komentare/proizvode eksplicitno pre brisanja
        [HttpDelete]
        [Route("IzbrisiProdavca")]
        public async Task<IActionResult> IzbrisiProdavca()
        {
            Prodavac prodavac = await Context.FindAsync<Prodavac>(((Korisnik)HttpContext.Items["User"]).ID);

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
            if(prodavac.Proizvodi != null)
            {
                foreach(Proizvod proizvod in prodavac.Proizvodi)
                {
                    await IzbrisiProizvod(proizvod.ID);
                }
            }

            Context.Korisnici.Remove(prodavac);
            await Context.SaveChangesAsync();

            return Ok();
        }

    }
}
