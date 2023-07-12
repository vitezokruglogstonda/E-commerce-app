using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WinScout.Models
{
    public class Vrata : Proizvod
    {
        [JsonIgnore]
        [Required]
        [Column("Duzina")]
        public double Duzina { get; set; }

        [JsonIgnore]
        [Required]
        [Column("Sirina")]
        public double Sirina { get; set; }
        [NotMapped]
        public string Dimenzije
        {
            get
            {
                string dim = "";
                dim += this.Duzina.ToString() + "x" + this.Sirina.ToString(); //merna jedinica
                return dim;
            }
        }
        [Required]
        [Column("Materijal")]
        public string Materijal { get; set; }
        
        [Column("Primena")]
        public string Primena { get; set; }
        
        [Column("Koeficijent_Prolaza_Toplote")]
        public double Koeficijent { get; set; }

        [Column("Staklo")]
        public string? Staklo { get; set; }

        [Column("Debljina_stakla")]
        public double? DebljinaStakla { get; set; }
        
        [Column("Broj_Komora")]
        public int Komore { get; set; }

        [Column("Tip_Vrata")]
        public string TipVrata { get; set; }
    }
}
