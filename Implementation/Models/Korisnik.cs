using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WinScout.Models
{
    [Table("Korisnik")]
    public class Korisnik
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [StringLength(50)]
        [Column("UserName")]
        public string Naziv { get; set; }

        [Required]
        [Column("Tip_Korisnika")]
        public string TipKorisnika { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Mail { get; set; }

        [JsonIgnore]
        [DataType(DataType.Password)]
        [Column("Password_Hash")]
        public byte[] Password { get; set; }

        [JsonIgnore]
        [Column("Password_Salt")]
        public byte[] Salt { get; set; }

        [Column("Activity_Status")]
        public bool Online { get; set; }

        public bool Odobren { get; set; }
        [JsonIgnore]
        public int? PIN{ get; set; }

        public virtual List<Komentar> Komentari { get; set; }

    }
}
