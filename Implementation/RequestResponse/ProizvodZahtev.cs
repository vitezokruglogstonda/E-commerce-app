using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WinScout.RequestResponse
{
    public class ProizvodZahtev
    {
        [Required]
        public string Naziv { get; set; }
        [Required]
        public string TipProizvoda { get; set; }
        [Required]
        public decimal Cena { get; set; }
        [StringLength(200)]
        public string? OpisProizvoda{ get; set; }
        [Required]
        public string Dimenzije { get; set; }
        [Required]
        public string Materijal { get; set; }
        public string? Primena { get; set; }
        public string SistemOtvaranja { get; set; }
        public double? Koeficijent { get; set; }
        public string? Staklo { get; set; }
        public double? DebljinaStakla { get; set; }
        public int? Komore { get; set; }
        public int? Paneli { get; set; }
        public string? TipVrata { get; set; }
        public string? TipProzora { get; set; }
        [Required]
        public bool Roletne { get; set; }
        [Required]
        public bool Mrezica { get; set; }
    }
}
