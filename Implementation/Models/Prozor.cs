using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WinScout.Models
{
    public class Prozor : Proizvod
    {
        [JsonIgnore]
        [Column("Duzina")]
        public double Duzina { get; set; }
        [JsonIgnore]
        [Column("Sirina")]
        public double Sirina { get; set; }
        [NotMapped]
        public string Dimenzije { 
            get {
                string dim = "";
                dim += this.Duzina.ToString() + "x" + this.Sirina.ToString(); //merna jedinica
                return dim;
            }
        }
       
        [Column("Materijal")]
        public string Materijal { get; set; }
        
        [Column("SistemOtvaranja")]
        public string SistemOtvaranja { get; set; }
       
        [Column("Koeficijent_Prolaza_Toplote")]
        public double Koeficijent { get; set; }
    
        [Column("Staklo")]
        public string Staklo { get; set; }
       
        [Column("Debljina_stakla")]
        public double DebljinaStakla { get; set; }
        
        [Column("Broj_Komora")]
        public int Komore { get; set; }

        [Column("Broj_Panela")]
        public int? Paneli { get; set; }

        [Column("Tip_Prozora")]
        public string TipProzora { get; set; }
        
        [Column("Roletne")]
        public bool Roletne { get; set; }

        [Column("Mrezica")]
        public bool Mrezica { get; set; }
    }
}
