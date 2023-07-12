using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WinScout.RequestResponse
{
    public class LogInOdgovor
    {
        public int ID { get; set; }

        public string Ime{ get; set; }

        public string Token { get; set; }

        public string TipKorisnika { get; set; }

        public string? Slika { get; set; }

        public LogInOdgovor(int id, string ime, string tip, string token, string slika = null)
        {
            this.ID = id;
            this.Ime = ime;
            this.TipKorisnika = tip;
            this.Token = token;
            this.Slika = slika;
        }

    }
}
