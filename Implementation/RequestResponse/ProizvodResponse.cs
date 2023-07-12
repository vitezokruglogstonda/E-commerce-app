using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WinScout.Models;

namespace WinScout.RequestResponse
{
    public class ProizvodResponse
    {
        public Proizvod Proizvod { get; set; }

        public bool Zapracen { get; set; }

    }
}
