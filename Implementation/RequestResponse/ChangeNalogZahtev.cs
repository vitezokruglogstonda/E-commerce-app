using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WinScout.RequestResponse
{
    public class ChangeNalogZahtev
    {
        public string? Ime { get; set; }
        public string? Telefon { get; set; }
        public string? Mesto { get; set; }
        public string? Adresa { get; set; }
        public double? X { get; set; }
        public double? Y { get; set; }

    }
}
