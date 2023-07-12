using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using WinScout.Autentikacija;
using WinScout.Models;
using WinScout.Service;
using WinScout.RequestResponse;
using Newtonsoft.Json;

namespace WinScout.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class NalogController : ControllerBase
    {
        public ModelContext Context { get; set; }
        public IUserService Service { get; set; }

        public NalogController(ModelContext context, IUserService service)
        {
            this.Context = context;
            Service = service;
        }

        [HttpPost]
        [Route("LogIn")]
        public async Task<IActionResult> SignIn([FromBody] LogInZahtev zahtev)
        {
            Korisnik korisnik = await Context.Korisnici.Where(p => p.Mail == zahtev.Mail).FirstOrDefaultAsync();
            if(korisnik == null)
            {
                return BadRequest(new { message = "Korisnik ne postoji. Moguce da ste uneli pogresan mail." });
            }
            string _message = Service.ProveriPrisutpNalogu(korisnik.ID);
            if (_message != null)
            {
                return BadRequest(new { message = _message });
            }
            else if (!Service.ProveriSifru(korisnik.Password, korisnik.Salt, zahtev.Password))
            {
                return BadRequest(new { message = "Pogresna sifra." });
            }

            string token = Service.GenerisiToken(korisnik);
            korisnik.Online = true;
            Context.Update<Korisnik>(korisnik);
            await Context.SaveChangesAsync();
            LogInOdgovor odgovor = new LogInOdgovor(korisnik.ID, korisnik.Naziv, korisnik.TipKorisnika, token);

            return Ok(odgovor);
        }

        [HttpPost]
        [Route("SignUp")]
        public async Task<IActionResult> SignUp([FromForm] string objekat, [FromForm] IFormFile? Slika)
        {
            SignUpZahtev zahtev = JsonConvert.DeserializeObject<SignUpZahtev>(objekat);

            if (Context.Korisnici.Any(p => String.Equals(p.Mail, zahtev.Mail) || String.Equals(p.Naziv, zahtev.Ime)))
            {
                return BadRequest(new { message = "Korisnik vec postoji." });
            }
            if (Service.Banovan(zahtev.Mail))
            {
                return BadRequest(new { message = "Banovan." });
            }
            if (string.IsNullOrWhiteSpace(zahtev.Password))
            {
                return BadRequest(new { message = "Nevalidan password." });
            }

            byte[] hash, salt;
            Service.HesirajSifru(out hash, out salt, zahtev.Password);

            IUserService.MailType tipMejla = IUserService.MailType.Verifikacija;

            switch (zahtev.TipKorisnika)
            {
                case "Posetilac":
                    Posetilac posetilac = new Posetilac
                    { 
                        Naziv = zahtev.Ime,
                        Mail = zahtev.Mail,
                        TipKorisnika = zahtev.TipKorisnika,
                        Komentari = null, 
                        Odobren = false,
                        Online = false,
                        Password = hash, 
                        Salt = salt,
                        PIN = null
                    };
                    await Context.Korisnici.AddAsync(posetilac);
                    await Context.SaveChangesAsync();
                    Service.PosaljiMail(posetilac, tipMejla);
                    break;
                case "Prodavac":
                    IUserService.ImageType tip = IUserService.ImageType.Prodavac;
                    string slika = Service.DodajSliku(Slika, tip);
                    Prodavac prodavac = new Prodavac 
                    {
                        Naziv = zahtev.Ime,
                        Mail = zahtev.Mail,
                        Telefon = zahtev.Telefon,
                        Slika = slika, 
                        TipKorisnika = zahtev.TipKorisnika, 
                        Komentari = null, 
                        Odobren = false, 
                        Online = false,
                        Password = hash, 
                        Salt = salt,
                        Mesto = zahtev.Mesto,
                        Adresa = zahtev.Adresa,
                        Lokacija = null,
                        Proizvodi = null,
                        PIN = null
                    };
                    await Context.Korisnici.AddAsync(prodavac);
                    Lokacija lokacija = new Lokacija { X = (double)zahtev.X, Y = (double)zahtev.Y };
                    prodavac.Lokacija = lokacija;
                    await Context.SaveChangesAsync();
                    Service.PosaljiMail(prodavac, tipMejla);
                    break;
                default:
                    return BadRequest(new { message = "Doslo je do greske. Tip korisnika nije naveden." });
            }

            return Ok(new { message = "Uspesno kreiranje korisnika, validirajte registraciju mejlom." });

        }

        [HttpPost]
        [Route("KreirajAdministratora")]
        public async Task<IActionResult> KreirajAdministratora([FromBody] string code)
        {
            Korisnik korisnik = await Context.Korisnici.Where(p => String.Equals(p.TipKorisnika,"Admin")).FirstOrDefaultAsync();
            if(korisnik != null)
            {
                return BadRequest(new { message = "Jedan administrator vec postoji."});
            }
            else
            {
                string naziv, tipKorisnika, mail;
                byte[] password, salt;
                bool online, odobren;
                Service.Admin(code, out naziv, out tipKorisnika,out mail, out password, out salt, out online, out odobren);
                if (!odobren)
                {
                    return BadRequest(new { message = "Uneli ste pogresan kod." });
                }
                Administrator admin = new Administrator {
                    Naziv = naziv,
                    TipKorisnika = tipKorisnika,
                    Mail = mail,
                    Password = password,
                    Salt = salt,
                    Online = online,
                    Odobren = odobren,
                    PIN = null,
                    Slika = "Slike/admin.png"
                };
                await Context.Korisnici.AddAsync(admin);
                await Context.SaveChangesAsync();
                return Ok("Otvoren je Admin nalog.");
            }
        }

        [HttpGet]
        [Route("Verifikacija/{korisnikID}")]
        public async Task<IActionResult> VerifikujNalog(int korisnikID) {
            Korisnik korisnik = await Context.FindAsync<Korisnik>(korisnikID);
            if (korisnik.Odobren)
            {
                return Ok(new { message = "Nalog je vec validiran." });
            }
            else
            {
                korisnik.Odobren = true;
                Context.Update<Korisnik>(korisnik);
                await Context.SaveChangesAsync();
                return Redirect("https://localhost:5001/user/login/");
            }
        }

        [Autorizacija]
        [HttpPost]
        [Route("PasswordReset")]
        public async Task<IActionResult> PasswordReset([FromBody] PasswordChangeZahtev zahtev)
        {
            Korisnik korisnik = (Korisnik)HttpContext.Items["User"]; ;
            if (!Service.ProveriSifru(korisnik.Password, korisnik.Salt, zahtev.Stari))
            {
                return BadRequest(new { message = "Pogresna sifra." });
            }

            byte[] hash, salt;
            Service.HesirajSifru(out hash, out salt, zahtev.Novi);

            korisnik.Password = hash;
            korisnik.Salt = salt;
            Context.Update<Korisnik>(korisnik);
            await Context.SaveChangesAsync();

            return Ok(new { message = "Uspesno promenjena sifra." });
        }


        [HttpPost]
        [Route("ForgotPasswordRequest")]
        public async Task<IActionResult> ForgotPasswordRequest([FromBody] string mail)
        {
            Korisnik korisnik = await Context.Korisnici.Where(p => String.Equals(p.Mail, mail)).FirstOrDefaultAsync();
            if (korisnik == null)
            {
                return BadRequest(new { message = "Pogresan mejl." });
            }

            IUserService.MailType tipMejla = IUserService.MailType.ResetPassword;
            Service.PosaljiMail(korisnik, tipMejla);

            return Ok(new { message = "Poslat vam je mejl za promenu sifre."});
        }

        [HttpPost]
        [Route("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] PasswordRecoverZahtev zahtev)
        {
            Korisnik korisnik = await Context.FindAsync<Korisnik>(zahtev.ID);
            if(korisnik == null)
            {
                return BadRequest(new { message = "Korisnik ne postoji. Pogresan ID."});
            }
            string _message = Service.ProveriPrisutpNalogu(korisnik.ID);
            if (_message != null)
            {
                return BadRequest(new { message = _message });
            }
            if(korisnik.PIN != int.Parse(zahtev.Pin))
            {
                return BadRequest(new { message = "Uneli ste pogesan kod." });
            }
            if(!Service.ProveriSifru(korisnik.Password, korisnik.Salt, zahtev.Password))
            {
                byte[] hash, salt;
                Service.HesirajSifru(out hash, out salt, zahtev.Password);

                korisnik.Password = hash;
                korisnik.Salt = salt;
                Context.Update<Korisnik>(korisnik);
                await Context.SaveChangesAsync();
            }
            return Ok(new { message = "Uspesno promenjena sifra." });
        }

        [Autorizacija]
        [HttpPost]
        [Route("ChangeAccountInfo")]
        public async Task<IActionResult> ChangeAccountInfo([FromForm] string objekat, [FromForm] IFormFile? Slika)
        {
            ChangeNalogZahtev zahtev = JsonConvert.DeserializeObject<ChangeNalogZahtev>(objekat);

            Korisnik korisnik = (Korisnik)HttpContext.Items["User"];

            if (zahtev.Ime != null)
            {
                korisnik.Naziv = zahtev.Ime;
            }

            if (korisnik.TipKorisnika == "Prodavac")
            {
                Prodavac prodavac = await Context.FindAsync<Prodavac>(korisnik.ID);
                string slika = null;
                if (Slika != null)
                {
                    IUserService.ImageType tip = IUserService.ImageType.Prodavac;
                    if (!Service.ObrisiSliku(prodavac.Slika, tip))
                    {
                        Console.WriteLine("Neuspesno brisanje slike " + prodavac.Slika);
                    }
                    slika = Service.DodajSliku(Slika, tip);
                    prodavac.Slika = slika;
                }
                if (zahtev.Telefon != null)
                {
                    prodavac.Telefon = zahtev.Telefon;
                }
                if (zahtev.Mesto != null)
                {
                    prodavac.Mesto = zahtev.Mesto;
                }
                if (zahtev.Adresa != null)
                {
                    prodavac.Adresa = zahtev.Adresa;
                }
                if (zahtev.X != null || zahtev.Y != null)
                {
                    Lokacija lokacija = await Context.FindAsync<Lokacija>(korisnik.ID);
                    if (zahtev.X != null)
                    {
                        lokacija.X = (double)zahtev.X;
                    }
                    else
                    {
                        lokacija.Y = (double)zahtev.Y;
                    }
                    Context.Update<Lokacija>(lokacija);
                }
                Context.Update<Prodavac>(prodavac);
                await Context.SaveChangesAsync();
                return Ok();
            }

            Context.Update<Korisnik>(korisnik);
            await Context.SaveChangesAsync();
            return Ok();

        }

        [Autorizacija]
        [HttpPut]
        [Route("LogOut")]
        public async Task<IActionResult> LogOut()
        {
            Korisnik korisnik = (Korisnik)HttpContext.Items["User"];
            
            korisnik.Online = false;
            Context.Update<Korisnik>(korisnik);
            await Context.SaveChangesAsync();
               
            return Ok();
        }

    }

    //private string GenerisiToken(Korisnik korisnik)
    //{
    //    JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
    //    byte[] key = Encoding.ASCII.GetBytes(_appSettings.Secret);
    //    SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
    //    {
    //        Subject = new ClaimsIdentity(new Claim[]
    //        {
    //            new Claim(ClaimTypes.Name, korisnik.ID.ToString()),
    //            new Claim(ClaimTypes.Role, korisnik.TipKorisnika),
    //            new Claim("status", korisnik.Online.ToString())
    //        }),
    //        Expires = DateTime.UtcNow.AddDays(7),
    //        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
    //    };
    //    SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
    //    return tokenHandler.WriteToken(token);
    //}




}
