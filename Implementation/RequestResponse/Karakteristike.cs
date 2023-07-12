using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WinScout.RequestResponse
{
    public class Karakteristike
    {
        public List<string> Materijal { get; set; }
        public List<string>? SistemOtvaranja { get; set; }
        public List<string>? Staklo{ get; set; }
        public List<string>? TipProzora { get; set; }
        public List<string>? Primena{ get; set; }
        public List<string>? TipVrata { get; set; }
        public List<string>? Dodaci { get; set; }

        public Karakteristike(string tipProizvoda)
        {
            switch (tipProizvoda)
            {
                case "Prozor":
                    this.Materijal = new List<string>();
                    this.SistemOtvaranja = new List<string>();
                    this.Staklo = new List<string>();
                    this.TipProzora = new List<string>();
                    this.Dodaci = new List<string>();
                    break;
                case "Vrata":
                    this.Materijal = new List<string>();
                    this.Primena = new List<string>();
                    this.TipVrata = new List<string>();
                    break;
                default:
                    break;
            }
        }


    }
}
