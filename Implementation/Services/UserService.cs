using System.Net.Mail;
using System.Net;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using WinScout.Models;
using Microsoft.Extensions.Options;
using System.Security.Cryptography;
using WinScout.Autentikacija;
using WinScout.RequestResponse;

namespace WinScout.Service
{
    public interface IUserService
    {
        enum MailType
        {
            Verifikacija,
            ResetPassword
        };
        enum ImageType
        {
            Prodavac,
            Proizvod
        };
        void Admin(string code, out string naziv, out string tipKorisnika, out string mail, out byte[] password, out byte[] salt, out bool online, out bool odobren);
        string DodajSliku(IFormFile? slika, ImageType tipSlike, string tipProizvoda = null);
        bool ObrisiSliku(string slika, ImageType tipSlike, string tipProizvoda = null);
        string GenerisiToken(Korisnik korisnik);
        int PinGenerator();
        void PinUpdate(Korisnik korisnik, int PIN);
        bool ProveriSifru(byte[] sifra, byte[] salt, string zahtev);
        void HesirajSifru(out byte[] hash, out byte[] salt, string sifra);
        void PosaljiMail(Korisnik korisnik, MailType tip);
        string? ProveriPrisutpNalogu(int id, Korisnik tmpKorisnik = null);
        void IzvadiDimenzije(string dimenzije, out double duzina, out double sirina);
        void IzbrisiKomentar(int id);
        void IzbrisiProizvod(int id);
        void Subscribe(Posetilac posetilac, Proizvod proizvod);
        void Unsubscribe(Posetilac posetilac, Proizvod proizvod);
        void Ban(string mail);
        bool Banovan(string mail);
        void Oceni(Proizvod proizvod, int ocena);
        string UpisiKarakteristike(out Karakteristike karakteristike, string tipProizvoda);
        List<Proizvod> Filtriraj(List<Proizvod> proizvodi, FilterRequest filter, string tipProizvoda);

    }

    public class UserService : IUserService
    {
        public AppSettings _appSettings { get; set; }
        public MailSettings _mailSettings { get; set; }
        public IWebHostEnvironment Environment { get; set; }
        public ModelContext Context { get; set; }
        public URLs URL { get; set; }
        public KarakteristikeVrata karakteristikeVrata;
        public KarakteristikeProzor karakteristikeProzora;

        public UserService(IOptions<AppSettings> appSettings, IOptions<MailSettings> mailSettings, IOptions<URLs> url, IWebHostEnvironment environment, ModelContext context) {
            this._appSettings = appSettings.Value;
            this._mailSettings = mailSettings.Value;
            this.URL = url.Value;
            this.Environment = environment;
            this.Context = context;
            this.karakteristikeVrata = new KarakteristikeVrata();
            this.karakteristikeProzora = new KarakteristikeProzor();
        }
        public void Admin(string code, out string naziv, out string tipKorisnika, out string mail, out byte[] password, out byte[] salt, out bool online, out bool odobren)
        {
            //if (!this.ProveriSifru(Encoding.UTF8.GetBytes(_appSettings.AdminCode), Encoding.UTF8.GetBytes(_appSettings.Secret), code))
            if (!String.Equals(code, _appSettings.AdminCode))
            {
                naziv = null;
                tipKorisnika = null;
                mail = null;
                password = null;
                salt = null;
                online = false;
                odobren = false;
            }
            else
            {
                naziv = _mailSettings.Ime;
                tipKorisnika = _appSettings.TipKorisnika;
                mail = _mailSettings.Adresa;
                this.HesirajSifru(out password,out salt,_mailSettings.Password);
                online = false;
                odobren = true;
            }
        }
        public string DodajSliku(IFormFile? slika, IUserService.ImageType tipSlike, string tipProizvoda = null)
        {
            string folderPath = "Slike\\";
            switch (tipSlike)
            {
                case IUserService.ImageType.Prodavac:
                    folderPath += tipSlike.ToString();
                    break;
                case IUserService.ImageType.Proizvod:
                    folderPath += tipSlike.ToString() + "\\" + tipProizvoda;
                    break;
                default:
                    return null;
            }
            string uploadsFolder = Path.Combine(Environment.WebRootPath, folderPath);
            string imeFajla;
            if (slika != null)
            {
                imeFajla = Guid.NewGuid().ToString() + "_" + slika.FileName;
                string filePath = Path.Combine(uploadsFolder, imeFajla);
                slika.CopyTo(new FileStream(filePath, FileMode.Create));
            }
            else
            {
                imeFajla = "default.png";
            }
            return imeFajla;
        }
        public bool ObrisiSliku(string slika, IUserService.ImageType tipSlike, string tipProizvoda = null)
        {
            if(!String.Equals(slika, "default.png"))
            {
                string folderPath = "Slike\\";
                switch (tipSlike)
                {
                    case IUserService.ImageType.Prodavac:
                        folderPath += tipSlike.ToString();
                        break;
                    case IUserService.ImageType.Proizvod:
                        folderPath += tipSlike.ToString() + "\\" + tipProizvoda;
                        break;
                    default:
                        return false;
                }
                string uploadsFolder = Path.Combine(Environment.WebRootPath, folderPath);
                string filePath = Path.Combine(uploadsFolder, slika);

                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                    return true;
                }
                else
                {
                    return true;
                }
            }
            else
            {
                return true;
            }
        }
        public string GenerisiToken(Korisnik korisnik)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", korisnik.ID.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        public bool ProveriSifru(byte[] sifra, byte[] salt, string zahtev)
        {
            HMACSHA512 hashObj = new HMACSHA512(salt);
            byte[] password = System.Text.Encoding.UTF8.GetBytes(zahtev);
            byte[] hash = hashObj.ComputeHash(password);

            int len = hash.Length;
            for (int i = 0; i < len; i++)
            {
                if (sifra[i] != hash[i])
                {
                    return false;
                }
            }
            return true;
        }
        public void HesirajSifru(out byte[] hash, out byte[] salt, string sifra)
        {
            HMACSHA512 hashObj = new HMACSHA512();
            salt = hashObj.Key;
            byte[] password = Encoding.UTF8.GetBytes(sifra);
            hash = hashObj.ComputeHash(password);
        }
        public void PosaljiMail(Korisnik korisnik, IUserService.MailType tip)
        {
            MailMessage msg = new MailMessage();
            msg.From = new MailAddress(_mailSettings.Adresa, _mailSettings.Ime);
            msg.To.Add(korisnik.Mail);
            msg.Subject = _mailSettings.Subject;

            if (tip == IUserService.MailType.Verifikacija)
            {
                string path = Path.Combine(Environment.WebRootPath, "Mail\\Verify.html");
                string text = System.IO.File.ReadAllText(path);
                text = text.Replace("~", URL.VerifikacijaURL + korisnik.ID);
                msg.Body = text;
            }
            else if (tip == IUserService.MailType.ResetPassword)
            {
                string path = Path.Combine(Environment.WebRootPath, "Mail\\PasswordReset.html");
                string text = System.IO.File.ReadAllText(path);
                int PIN = PinGenerator();
                this.PinUpdate(korisnik, PIN);
                text = text.Replace("`", PIN.ToString());
                text = text.Replace("~", URL.PasswordResetURL + korisnik.ID);
                msg.Body = text;
            }

            msg.IsBodyHtml = true;

            var smtpClient = new SmtpClient("smtp.gmail.com");
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential(_mailSettings.Adresa, _mailSettings.Password);
            smtpClient.Port = 587;
            smtpClient.EnableSsl = true;
            smtpClient.Send(msg);

        }
        public int PinGenerator()
        {
            int _min = 1000;
            int _max = 9999;
            Random _rdm = new Random();
            return _rdm.Next(_min, _max);
        }
        public void PinUpdate(Korisnik korisnik, int PIN) {
            korisnik.PIN = PIN;
            Context.Update<Korisnik>(korisnik);
            Context.SaveChanges();
        }
        public string? ProveriPrisutpNalogu(int id, Korisnik tmpKorisnik = null)
        {
            Korisnik korisnik = Context.Korisnici.Find(id);
            if (korisnik == null)
            {
                string message = "Korisnik ne postoji. Moguce da je poslat pogresan ID.";
                return message;
            }
            else if (korisnik.Odobren == false)
            {
                string message = "Nalog nije odobren.";
                return message;
            }
            if(tmpKorisnik != null)
            {
                if (id != tmpKorisnik.ID)
                {
                    string message = "Nemate pristup ovom nalogu.";
                    return message;
                }
            }
            return null;
        }
        public void IzvadiDimenzije(string dimenzije, out double duzina, out double sirina)
        {
            string[] tmp = dimenzije.Split("x");
            duzina = double.Parse(tmp[0]);
            sirina = double.Parse(tmp[1]);
        }
        public void IzbrisiKomentar(int id)
        {
            Komentar komentar = Context.Komentari.Find(id);
            Context.Entry(komentar).Reference(p => p.Iznad).Load();
            Context.Entry(komentar.Iznad).Collection(p => p.Odgovori).Query().ToList();
            Context.Entry(komentar).Reference(p => p.Proizvod).Load();
            Context.Entry(komentar).Reference(p => p.Korisnik).Load();
            Context.Entry(komentar.Korisnik).Collection(p => p.Komentari).Query().ToList();

            if (komentar != null)
            {
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
                        IzbrisiKomentar(odgovor.ID);
                    }
                }
                komentar.Proizvod.BrojKomentara--;
                komentar.Proizvod.Komentari.Remove(komentar);
                Context.Update<Proizvod>(komentar.Proizvod);
                //Da li pristupa korisniku?
                komentar.Korisnik.Komentari.Remove(komentar);
                Context.Update<Korisnik>(komentar.Korisnik);
                Context.Komentari.Remove(komentar);
                Context.SaveChanges();
            }
        }
        public void IzbrisiProizvod(int id)
        {
            Proizvod proizvod =  Context.Proizvodi.Find(id);
            if (proizvod != null)
            {
                Context.Entry(proizvod).Collection(p => p.Komentari).Query().ToList();
                Context.Entry(proizvod).Collection(p => p.Subscribers).Query().ToList();
                Prodavac prodavac =  Context.Find<Prodavac>(proizvod.ProdavacID);
                Context.Entry(prodavac).Collection(p => p.Proizvodi).Query().ToList();
                prodavac.Proizvodi.Remove(proizvod);
                Context.Update<Prodavac>(prodavac);
                foreach (Komentar komentar in proizvod.Komentari)
                {
                    this.IzbrisiKomentar(komentar.ID);
                }
                IUserService.ImageType tip = IUserService.ImageType.Proizvod;
                this.ObrisiSliku(proizvod.Slika, tip, proizvod.TipProizvoda);
                foreach (Posetilac posetilac in proizvod.Subscribers)
                {
                    this.Unsubscribe(posetilac, proizvod);
                }
                Context.Proizvodi.Remove(proizvod);
                Context.SaveChanges();
            }
        }
        public void Subscribe(Posetilac posetilac, Proizvod proizvod)
        {
            Context.Entry(posetilac).Collection(p => p.Favourites).Load();
            Context.Entry(proizvod).Collection(p => p.Subscribers).Load();
            posetilac.Favourites.Add(proizvod);
            proizvod.Subscribers.Add(posetilac);
            Context.Update<Posetilac>(posetilac);
            Context.Update<Proizvod>(proizvod);
        }
        public void Unsubscribe(Posetilac posetilac, Proizvod proizvod)
        {
            Context.Entry(posetilac).Collection(p => p.Favourites).Query().ToList();
            Context.Entry(proizvod).Collection(p => p.Subscribers).Query().ToList();
            posetilac.Favourites.Remove(proizvod);
            proizvod.Subscribers.Remove(posetilac);
            Context.Update<Posetilac>(posetilac);
            Context.Update<Proizvod>(proizvod);
        }
        public List<Proizvod> Filtriraj(List<Proizvod> proizvodi, FilterRequest filter, string tipProizvoda)
        {
            if (filter.CenaMin != null)
                proizvodi = proizvodi.Where(p => p.Cena >= filter.CenaMin).ToList();
            if (filter.CenaMax != null)
                proizvodi = proizvodi.Where(p => p.Cena <= filter.CenaMax).ToList();
            if (filter.MinOcena != null)
                proizvodi = proizvodi.Where(p => p.Ocena >= filter.MinOcena).ToList();

            switch (tipProizvoda)
            {
                case "Prozor":
                    List<Prozor> prozori = new List<Prozor>();
                    foreach (Proizvod p in proizvodi)
                    {
                        prozori.Add(Context.Find<Prozor>(p.ID));
                    }

                    if (filter.Duzina != null)
                    {
                        prozori = prozori.Where(p => p.Duzina == filter.Duzina).ToList();
                    }
                    if (filter.Sirina != null)
                    {
                        prozori = prozori.Where(p => p.Sirina == filter.Sirina).ToList();
                    }
                    if (filter.Materijal != null)
                    {
                        prozori = prozori.Where(p => p.Materijal == filter.Materijal).ToList();
                    }
                    if (filter.SistemOtvaranja != null)
                    {
                        prozori = prozori.Where(p => p.SistemOtvaranja == filter.SistemOtvaranja).ToList();
                    }
                    if (filter.Koeficijent != null)
                    {
                        prozori = prozori.Where(p => p.Koeficijent == filter.Koeficijent).ToList();
                    }
                    if (filter.Staklo != null)
                    {
                        prozori = prozori.Where(p => p.Staklo == filter.Staklo).ToList();
                    }
                    if (filter.DebljinaStakla != null)
                    {
                        prozori = prozori.Where(p => p.DebljinaStakla == filter.DebljinaStakla).ToList();
                    }
                    if (filter.Komore != null)
                    {
                        prozori = prozori.Where(p => p.Komore == filter.Komore).ToList();
                    }
                    if (filter.Paneli != null)
                    {
                        prozori = prozori.Where(p => p.Paneli == filter.Paneli).ToList();
                    }
                    if (filter.Roletne != null)
                    {
                        prozori = prozori.Where(p => p.Roletne == filter.Roletne).ToList();
                    }
                    if (filter.Mrezica != null)
                    {
                        prozori = prozori.Where(p => p.Mrezica == filter.Mrezica).ToList();
                    }
                    if (filter.TipProzora != null)
                    {
                        prozori = prozori.Where(p => p.TipProzora == filter.TipProzora).ToList();
                    }

                    proizvodi.Clear();
                    foreach (Proizvod p in prozori) 
                    {
                        proizvodi.Add(p);
                    }
                    return proizvodi.ToList();

                case "Vrata":
                    List<Vrata> vrata = new List<Vrata>();
                    foreach (Proizvod p in proizvodi)
                    {
                        vrata.Add(Context.Find<Vrata>(p.ID));
                    }

                    if (filter.Duzina != null)
                    {
                        vrata = vrata.Where(p => p.Duzina == filter.Duzina).ToList();
                    }
                    if (filter.Sirina != null)
                    {
                        vrata = vrata.Where(p => p.Sirina == filter.Sirina).ToList();
                    }
                    if (filter.Materijal != null)
                    {
                        vrata = vrata.Where(p => p.Materijal == filter.Materijal).ToList();
                    }
                    if (filter.Primena != null)
                    {
                        vrata = vrata.Where(p => p.Primena == filter.Primena).ToList();
                    }
                    if (filter.Koeficijent != null)
                    {
                        vrata = vrata.Where(p => p.Koeficijent == filter.Koeficijent).ToList();
                    }
                    if (filter.Staklo != null)
                    {
                        vrata = vrata.Where(p => p.Staklo == filter.Staklo).ToList();
                    }
                    if (filter.DebljinaStakla != null)
                    {
                        vrata = vrata.Where(p => p.DebljinaStakla == filter.DebljinaStakla).ToList();
                    }
                    if (filter.Komore != null)
                    {
                        vrata = vrata.Where(p => p.Komore == filter.Komore).ToList();
                    }
                    if (filter.TipVrata != null)
                    {
                        vrata = vrata.Where(p => p.TipVrata == filter.TipVrata).ToList();
                    }

                    proizvodi.Clear();
                    foreach (Proizvod p in vrata)
                    {
                        proizvodi.Add(p);
                    }
                    return proizvodi.ToList();

                default:
                    return null;
            }
        }

        //da li treba Context.SaveChanges unutar funkcija
        public void Ban(string mail)
        {
            Ban ban = new Ban { Mail = mail };
            Context.Banovani.Add(ban);
        }
        public bool Banovan(string mail)
        {
            Ban ban = Context.Banovani.Where(p => String.Equals(p.Mail, mail)).FirstOrDefault();
            if(ban == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        public void Oceni(Proizvod proizvod, int ocena)
        {
            if (proizvod.Ocena == null)
            {
                proizvod.Ocena = ocena;
            }
            else
            {
                proizvod.Ocena = (proizvod.Ocena * proizvod.OcenaKoeficijent + ocena) / (proizvod.OcenaKoeficijent + 1);
            }
            proizvod.OcenaKoeficijent++;
            Context.Update<Proizvod>(proizvod);
        }
        public string UpisiKarakteristike(out Karakteristike karakteristike, string tipProizvoda) 
        {

            karakteristike = new Karakteristike(tipProizvoda);
            string message = null;
            switch (tipProizvoda)
            {
                case "Prozor":
                    karakteristike.Materijal = karakteristikeProzora.VratiMaterijale();
                    karakteristike.SistemOtvaranja = karakteristikeProzora.VratiSistemeOtvaranja();
                    karakteristike.Staklo = karakteristikeProzora.VratiStaklo();
                    karakteristike.TipProzora = karakteristikeProzora.VratiTipoveProzora();
                    karakteristike.Dodaci = karakteristikeProzora.VratiDodatke();
                    return message;
                case "Vrata":
                    karakteristike.Materijal = karakteristikeVrata.VratiMaterijale();
                    karakteristike.Primena = karakteristikeVrata.VratiPrimene();
                    karakteristike.TipVrata = karakteristikeVrata.VratiTipoveVrata();
                    return message;
                default:
                    karakteristike = null;
                    message = "Niste uneli pravilno tip proizvoda.";
                    return message;
            }
        }
    }
}
