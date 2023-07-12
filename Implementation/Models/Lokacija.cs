using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WinScout.Models
{
    [Table("Lokacija")]
    public class Lokacija
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ProdavacID { get; set; }
        [Required]
        [Column("Geo_Sirina")]
        public double X { get; set; }
        [Required]
        [Column("Geo_Duzina")]
        public double Y { get; set; }
        [JsonIgnore]
        public Prodavac Prodavac { get; set; }
    }
}
