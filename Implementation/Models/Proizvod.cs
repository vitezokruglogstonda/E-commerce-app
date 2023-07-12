using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WinScout.Models
{
    //public enum Ocena
    //{
    //    Lose = 1,
    //    Ok = 2,
    //    Dobro = 3,
    //    Super = 4,
    //    Odlicno = 5
    //}

    [Table("Proizvod")]
    public class Proizvod
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [Column("Naziv_Proizvoda")]
        public string Naziv { get; set; }

        [Required]
        [DataType(DataType.Currency)]
        [Column(TypeName = "money")]
        public decimal Cena { get; set; }

        [Required]
        [Column("Tip_Proizvoda")]
        public string TipProizvoda { get; set; }

        [Required]
        [ForeignKey("FK_Prodavac")]
        public int ProdavacID { get; set; }

        [StringLength(400)]
        public string? OpisProizvoda { get; set; }

        [JsonIgnore]
        [Range(1,5)]
        public double? Ocena { get; set; }

        [JsonIgnore]
        public int OcenaKoeficijent { get; set; }

        [NotMapped]
        public int? OcenaDisplay { 
            get 
            {
                if(this.Ocena != null)
                {
                    if (this.Ocena < 1.5)
                    {
                        return 1;
                    }
                    else if (this.Ocena < 2.5)
                    {
                        return 2;
                    }
                    else if (this.Ocena < 3.5)
                    {
                        return 3;
                    }
                    else if (this.Ocena < 4.5)
                    {
                        return 4;
                    }
                    else
                    {
                        return 5;
                    }
                }
                else
                {
                    return null;
                }
            }
        }

        [Required]
        public bool Odobren { get; set; }

        [Column("Slika")]
        public string? Slika { get; set; }

        public int? BrojKomentara { get; set; }

        public virtual List<Komentar> Komentari { get; set; }

        [JsonIgnore]
        public Prodavac Prodavac { get; set; }

        [JsonIgnore]
        public virtual List<Posetilac>? Subscribers { get; set; }

    }
}
