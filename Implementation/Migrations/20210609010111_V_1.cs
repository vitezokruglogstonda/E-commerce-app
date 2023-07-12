using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WinScout.Migrations
{
    public partial class V_1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ban",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Mail = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ban", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Korisnik",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Tip_Korisnika = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password_Hash = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    Password_Salt = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    Activity_Status = table.Column<bool>(type: "bit", nullable: false),
                    Odobren = table.Column<bool>(type: "bit", nullable: false),
                    PIN = table.Column<int>(type: "int", nullable: true),
                    Slika = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Telefon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Grad = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Adresa = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnik", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Lokacija",
                columns: table => new
                {
                    ProdavacID = table.Column<int>(type: "int", nullable: false),
                    Geo_Sirina = table.Column<double>(type: "float", nullable: false),
                    Geo_Duzina = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lokacija", x => x.ProdavacID);
                    table.ForeignKey(
                        name: "FK_Lokacija_Korisnik_ProdavacID",
                        column: x => x.ProdavacID,
                        principalTable: "Korisnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Proizvod",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv_Proizvoda = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cena = table.Column<decimal>(type: "money", nullable: false),
                    Tip_Proizvoda = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProdavacID = table.Column<int>(type: "int", nullable: false),
                    OpisProizvoda = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Ocena = table.Column<double>(type: "float", nullable: true),
                    OcenaKoeficijent = table.Column<int>(type: "int", nullable: false),
                    Odobren = table.Column<bool>(type: "bit", nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrojKomentara = table.Column<int>(type: "int", nullable: true),
                    Duzina = table.Column<double>(type: "float", nullable: true),
                    Sirina = table.Column<double>(type: "float", nullable: true),
                    Materijal = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SistemOtvaranja = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Koeficijent_Prolaza_Toplote = table.Column<double>(type: "float", nullable: true),
                    Staklo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Debljina_stakla = table.Column<double>(type: "float", nullable: true),
                    Broj_Komora = table.Column<int>(type: "int", nullable: true),
                    Broj_Panela = table.Column<int>(type: "int", nullable: true),
                    Tip_Prozora = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Roletne = table.Column<bool>(type: "bit", nullable: true),
                    Mrezica = table.Column<bool>(type: "bit", nullable: true),
                    Primena = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tip_Vrata = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Proizvod", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Proizvod_Korisnik_ProdavacID",
                        column: x => x.ProdavacID,
                        principalTable: "Korisnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Komentar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Sadrzaj = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Redni_Broj = table.Column<int>(type: "int", nullable: false),
                    ProizvodID = table.Column<int>(type: "int", nullable: false),
                    KomentarID = table.Column<int>(type: "int", nullable: true),
                    BrojOdgovora = table.Column<int>(type: "int", nullable: true),
                    Odobren = table.Column<bool>(type: "bit", nullable: false),
                    KorisnikID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Komentar", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Komentar_Komentar_KomentarID",
                        column: x => x.KomentarID,
                        principalTable: "Komentar",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Komentar_Korisnik_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Komentar_Proizvod_ProizvodID",
                        column: x => x.ProizvodID,
                        principalTable: "Proizvod",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "PosetilacProizvod",
                columns: table => new
                {
                    FavouritesID = table.Column<int>(type: "int", nullable: false),
                    SubscribersID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PosetilacProizvod", x => new { x.FavouritesID, x.SubscribersID });
                    table.ForeignKey(
                        name: "FK_PosetilacProizvod_Korisnik_SubscribersID",
                        column: x => x.SubscribersID,
                        principalTable: "Korisnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_PosetilacProizvod_Proizvod_FavouritesID",
                        column: x => x.FavouritesID,
                        principalTable: "Proizvod",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Komentar_KomentarID",
                table: "Komentar",
                column: "KomentarID");

            migrationBuilder.CreateIndex(
                name: "IX_Komentar_KorisnikID",
                table: "Komentar",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_Komentar_ProizvodID",
                table: "Komentar",
                column: "ProizvodID");

            migrationBuilder.CreateIndex(
                name: "IX_PosetilacProizvod_SubscribersID",
                table: "PosetilacProizvod",
                column: "SubscribersID");

            migrationBuilder.CreateIndex(
                name: "IX_Proizvod_ProdavacID",
                table: "Proizvod",
                column: "ProdavacID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ban");

            migrationBuilder.DropTable(
                name: "Komentar");

            migrationBuilder.DropTable(
                name: "Lokacija");

            migrationBuilder.DropTable(
                name: "PosetilacProizvod");

            migrationBuilder.DropTable(
                name: "Proizvod");

            migrationBuilder.DropTable(
                name: "Korisnik");
        }
    }
}
