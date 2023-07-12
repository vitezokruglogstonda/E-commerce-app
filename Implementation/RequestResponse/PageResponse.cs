using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WinScout.Models;

namespace WinScout.RequestResponse
{
    public class PageResponse
    {
        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public Uri? PreviousPage { get; set; }

        public Uri? NextPage { get; set; }

        public List<Proizvod> Data { get; set; }

    }
}
