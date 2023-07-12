using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WinScout.Models
{
    public class Posetilac : Korisnik
    {

        public virtual List<Proizvod>? Favourites { get; set; }

    }
}
