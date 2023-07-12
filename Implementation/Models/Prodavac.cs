using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WinScout.Models
{
    public class Prodavac : Korisnik
    {
        
        [Column("Slika")]
        [StringLength(100)]
        public string? Slika { get; set; }

        [DataType(DataType.PhoneNumber)]
        public string Telefon { get; set; }

        [StringLength(50)]
        [Column("Grad")]
        public string Mesto { get; set; }

        [StringLength(50)]
        public string Adresa { get; set; }

        public Lokacija Lokacija { get; set; }

        [NotMapped]
        public virtual List<Proizvod> Proizvodi { get; set; }

    }
}
