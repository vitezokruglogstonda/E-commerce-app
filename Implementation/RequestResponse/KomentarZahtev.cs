using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WinScout.RequestResponse
{
    public class KomentarZahtev
    {
        [Required]
        [StringLength(100)]
        public string Sadrzaj { get; set; }

        [Required]
        public int ProizvodID { get; set; }

        public int? KomentarID { get; set; }

    }
}
