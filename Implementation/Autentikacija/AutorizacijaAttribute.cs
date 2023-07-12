using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WinScout.Models;

namespace WinScout.Autentikacija
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AutorizacijaAttribute : Attribute, IAuthorizationFilter
    {
       
        public List<string> Roles { get; set; }

        public AutorizacijaAttribute()
        {
            this.Roles = null;
            //this.Roles = new List<string>();
            //this.Roles.Add("Admin");
        }

        public AutorizacijaAttribute(int level)
        {
            this.Roles = new List<string>();
            this.Roles.Add("Admin");
            switch (level)
            {
                case 1:
                    this.Roles.Add("Posetilac");
                    break;
                case 2:
                    this.Roles.Add("Prodavac");
                    break;
                default:
                    break;
            }
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            Korisnik korisnik = (Korisnik)context.HttpContext.Items["User"];
            if (korisnik == null)
            {
                context.Result = new JsonResult(new { message = "Neovlascen" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
            else if(this.Roles != null && !this.Roles.Contains(korisnik.TipKorisnika))
            {
                context.Result = new JsonResult(new { message = "Neovlascen" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
        }
    }
}
