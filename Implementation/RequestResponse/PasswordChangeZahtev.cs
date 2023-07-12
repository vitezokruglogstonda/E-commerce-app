using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WinScout.RequestResponse
{
    public class PasswordChangeZahtev
    {
        [Required]
        public string Stari { get; set; }
        [Required]
        public string Novi { get; set; }

    }
}
