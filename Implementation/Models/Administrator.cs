using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WinScout.Models
{
    public class Administrator : Korisnik
    {
        [Column("Slika")]
        [StringLength(100)]
        public string? Slika { get; set; }
        //public virtual List<Korisnik> LosiKorisnici { get; set; }
        //public virtual List<Proizvod> LosiProizvodi { get; set; }
        //public virtual List<Komentar> LosiKomentari { get; set; }
    }
}
