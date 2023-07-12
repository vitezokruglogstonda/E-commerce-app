using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WinScout.RequestResponse
{
    public class FilterRequest
    {
        public decimal? CenaMin { get; set; }
        public decimal? CenaMax { get; set; }
        public int? MinOcena { get; set; }
        public double? Duzina { get; set; }
        public double? Sirina { get; set; }
        public string? Materijal { get; set; }
        public string? SistemOtvaranja{ get; set; }
        public double? Koeficijent { get; set; }
        public string? Primena { get; set; }
        //public bool? ImaStaklo { get; set; }
        public string? Staklo { get; set; }
        public double? DebljinaStakla { get; set; }
        public int? Komore { get; set; }
        public int? Paneli { get; set; }
        public bool? Roletne { get; set; }
        public bool? Mrezica { get; set; }
        public string? TipProzora { get; set; }
        public string? TipVrata { get; set; }
    }
}
