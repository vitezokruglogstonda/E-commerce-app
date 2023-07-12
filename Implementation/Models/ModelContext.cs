using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WinScout.Models
{
    public class ModelContext : DbContext
    {

        public DbSet<Korisnik> Korisnici { get; set; }

        public DbSet<Lokacija> Lokacije { get; set; }
        
        public DbSet<Proizvod> Proizvodi { get; set; }
       
        public DbSet<Komentar> Komentari { get; set; }

        public DbSet<Ban> Banovani { get; set; }

        public ModelContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder mb)
        {

            mb.Entity<Korisnik>().HasDiscriminator<string>(d => d.TipKorisnika)
                .HasValue<Posetilac>("Posetilac")
                .HasValue<Prodavac>("Prodavac")
                .HasValue<Administrator>("Admin");

            mb.Entity<Proizvod>().HasDiscriminator<string>(d => d.TipProizvoda)
                 .HasValue<Prozor>("Prozor")
                 .HasValue<Vrata>("Vrata");

            mb.Entity<Posetilac>().HasBaseType<Korisnik>();
            mb.Entity<Prodavac>().HasBaseType<Korisnik>();
            mb.Entity<Administrator>().HasBaseType<Korisnik>();
            mb.Entity<Prozor>().HasBaseType<Proizvod>();
            mb.Entity<Vrata>().HasBaseType<Proizvod>();

            //mb.Entity<Prozor>().Property(p => p.Duzina).HasColumnName("Duzina");

            mb.Entity<Prodavac>().HasMany(p => p.Proizvodi).WithOne(p => p.Prodavac).HasForeignKey(p => p.ProdavacID);
            mb.Entity<Prodavac>().HasOne(p => p.Lokacija).WithOne(p => p.Prodavac);
            mb.Entity<Korisnik>().HasMany(p => p.Komentari).WithOne(p => p.Korisnik);
            mb.Entity<Proizvod>().HasMany(p => p.Komentari).WithOne(p => p.Proizvod);
            mb.Entity<Komentar>().HasMany(p => p.Odgovori).WithOne(p => p.Iznad);

            //mb.Entity<Posetilac>()
            //    .HasMany(p => p.Favourites)
            //    .WithMany()
            //    .Map(m => {
            //        m.MapLeftKey("ID");
            //        m.MapRightKey("ID");
            //    });

        }

    }
}
