using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WinScout.RequestResponse
{
    public class PasswordRecoverZahtev
    {
        [Required]
        public int ID { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Pin{ get; set; }
    }
}
