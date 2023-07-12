using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WinScout.Models
{
    [Table("Komentar")]
    public class Komentar
    {
        [Key]
        public int ID { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Sadrzaj { get; set; }

        [Required]
        [Column("Redni_Broj")]
        public int Index { get; set; }

        [Required]
        [ForeignKey("FK_Proizvod")]
        public int ProizvodID { get; set; }

        [ForeignKey("FK_Komentar")]
        public int? KomentarID { get; set; }

        public int? BrojOdgovora { get; set; }
        [Required]
        public bool Odobren { get; set; }

        [Required]
        [ForeignKey("FK_Korisnik")]
        public int KorisnikID { get; set; }

        [JsonIgnore]
        public Proizvod Proizvod { get; set; }

        public virtual List<Komentar> Odgovori { get; set; }

        //ovo je navigacija na komentar na koji se postavlja odgovor (ukoliko je ovaj komentar odgovor na drugi komentar iznad njega)
        [JsonIgnore]
        public Komentar? Iznad { get; set; }

        //korisnik koji je postavio komentar
        [JsonIgnore]
        public Korisnik Korisnik { get; set; }

    }
}
