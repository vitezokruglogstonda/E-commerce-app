import React, { useState, useEffect } from 'react';
import { PageHero } from '../components'
import styled from 'styled-components'


const InformisiPage = () => {


    return (
        <Wrapper>
            <PageHero title="Informisi se" />
            <div className='section section-center'>
                <div className='product-center'>
                    <section className='content'>
                        <div className='title'>
                            <h2>Informisi se</h2>
                            <div className='underline'></div>
                        </div>
                    </section>
                    <div className="proizvodi">
                        <div className='title naslov'>
                            <h2>Zasto WinScout?</h2>
                            <div className='underline naslov'></div>
                            <p>WinScout je inovativni Web portal čija je namena prezentovanje, kreiranje i održavanje sadržaja vezanih za prodaju građevinske stolarije. Karakteristični sadržaji kojima se ovi proizvodi prezentuju su osnovne odlike proizvoda iz ovog domena (prozora i vrata) u koje spadaju cene, materijali od kojih su proizvedeni okviri, tipovi proizvoda, dimenzije, i informacije o prodavcima, koji se oglašavaju i nude svoje proizvode preko portala, poput lokacije, kontakata, linkova ka njihovim zvaničnim sajtovima i mogućnost isporuke. Ako zelite da kupujete pametno i odgovorno, na pravom ste mestu. Osigurajte svoj dom i ujedno sacuvajte okolinu.</p>
                            <br></br>
                            <h2>Sta je energetska efikasnost?</h2>
                            <div className='underline naslov'></div>
                            <p>Energetska efikasnost je zbir svih isplaniranih i sprovedenih mera čiji je cilj minimalno moguće korišćenje energije, tako da nivo udobnosti i nivo proizvodnje ostanu iste pre i posle uvođenja energetskih mera.</p>
                            <p>Pojednostavljeno, energetska efikasnost znači upotrebiti manju količinu energije (energenata) za obavljanje istog posla –grejanje/ili hlađenje prostora, osvetljenje, proizvodnja raznih vrsta proizvoda u svim sektorima, pogon vozila, i dr. Pod pojmom energetska efikasnost podrazumevamo upotrebu energije u svim sektorima krajnje potrošnje energije: industriji, saobraćaju, uslužnim delatnostima, poljoprivredi i u domaćinstvima.</p>

                            <p>Važno je istaknuti da se energetska efikasnost nikako ne sme posmatrati kao štednja energija. Naime, štednja uvek podrazumeva određena odricanja, dok efikasna upotreba energije nikada ne narušava uslove rada i življenja. Nadalje, poboljšanje efikasne potrošnje energije ne podrazumeva samo primenu tehničkih rešenja. Štaviše, svaka tehnologija i tehnička oprema, bez obzira koliko efikasna bila, gubi to svoje svojstvo ako ne postoje obrazovani ljudi koji će se njome znati služiti na najefikasniji mogući način. Prema tome, može se reći da je energetska efikasnost prvenstveno stvar svesti ljudi i njihovoj volji za promenom ustaljenih navika prema energetski efikasnim rešenjima, znači da to nije samo polje delovanja složenih tehničkih rešenja.</p>
                            <br></br>
                            <h2>Kupujte pametno I odgovorno</h2>
                            <div className='underline naslov'></div>
                            <p>Prozori i vrata su značajna investicija. Oni nude povećanu dnevnu svetlost i direktnu vezu s spoljnim svetom, što povećava osećaj slobode i ukupan kvalitet života. Takođe, prozori i vrata mogu smanjiti troškove energije, poboljšati prozračnost i smanjiti kondenzaciju. Zato se isplati uložiti malo vremena u učenje o najvažnijim činjenicama vezanim za vrata i prozore. Naoružani sa malo znanja, lakše ćete pronaći prave proizvode za svoj novi ili preuređeni dom.</p>
                            <br></br>
                            <h2>Položaj i dizajn</h2>
                            <div className='underline naslov'></div>
                            <p>Prostor u kome živimo je naš sastavni deo, jer u proseku provodimo više od 50% svog vremena u našim domovima. Ukoliko razmišljate u tom smeru, prozori predstavljaju osnovni deo sveobuhvatne funkcionalnosti i estetske vrednosti, oblikujući unutrašnji i spoljašnji izgled.</p>
                            <br></br>
                            <p>Položaj rama je još jedna stavka koja značajno utiče na vaš konačni odabir rama. Izlaganje suncu, vremenski uslovi, udar vetra i orijentacija rama su faktori koji moraju da se razmotre (npr. za severno orijentisane prozore ne preporučuju se energetski neefikasni ramovi zbog velikih gubitaka energije. Istovremeno, južno orijentisani prozori podležu jačem solarnom zračenju).</p>
                            <p>Funkcija rama takodje igra ključnu ulogu u odabiru jer utiče na ventilaciju, čišćenje, senčenje i funkcionalnost.</p>
                            <p>Značajna stavka, kao što je zastakljivanje, vrlo je važna za energetsku efikasnost rama. Moderna stakla su u skladu sa standardima energetske efikasnosti, a noviji dvoslojni ili troslojni, sa jednim ili dva razmaka između njih za bolju termičku i zvučnu izolaciju brzo zamenjuju starije modele. Energetski efikasna stakla mogu biti skupa, ali mogu da se smatraju ulaganjem, jer predstavljaju dugoročno uštedu vašim troškovima energije.</p>
                        </div>
                    </div>
                    <section className='content'>
                        <div className='title'>
                            <br></br>
                            <h2>Materijali</h2>
                            <div className='underline'></div>
                        </div>
                    </section>
                    <div className="proizvodi">
                        <div className='title naslov'>
                            <h2>Zasto Aluminijum?</h2>
                            <div className='underline naslov'></div>
                            <p>Postoji više nego dovoljno materijala koji se koriste za prozore i vrata. Ali zašto je aluminijum dobar izbor? Pre svega, aluminijum je metal sa odličnim mehaničkim osobinama, koji se revolucionarno koristi u mnogim tehnološkim sektorima. Iako mnogo lakši od drugih metala, poseduje veoma visok nivo čvrstoće zbog čega se  mnogo koristi u aeronautici, veoma zahtevnoj oblasti. Takođe, veoma je otporan na mnoge oblike korozije i troškovi potrebni za održavanje su skoro ravni nuli.</p>
                            <p>Pored toga, aluminijum je treći najzastupljeniji element u zemljinoj kori. On je zeleni materijal koji se zauvek može reciklirati, očuvajući sve svoje karakteristike bez degradacije kvaliteta. Energija potrebna za reciklažu je samo 5% od ukupne energije za inicijalnu proizvodnju, što ga čini jednim od najzelenijih materijala u građevinarstvu.</p>
                            <p>U slučaju velikih temperaturnih fluktuacija, ne dolazi do izvijanja, što je veoma značajno pogotovo u regijama sa puno sunčanih dana i visokih temperatura u toku leta. Zbog toga nudi veoma precizne dimenzije koje ostaju nepromenjene i nisu sklone ekspanziji i skupljanju. Dakle, postiže se maksimalna otpornost na vodu i vazduh  što dovodi do perfektnog zaptivanja rama i krila prozora.</p>
                            <p>Takođe, robustni aluminijumski ramovi omogućavaju kreiranje velikih razmaka između nosećih profila za maksimalni prodor prirodnog osvetljenja, bez opasnosti od uvijanja ili savijanja ramova, što je čest slučaj sa drugim slabijim materijalima. Čak i sa veoma tankim profilima, aluminijumska dvokrilna vrata mogu nositi više od 1000 kilograma!</p>
                            <p>Na kraju, u slučaju požara aluminijumski prozori i vrata ne podstiču širenje, čak ga i ograničavaju. Aluminijum za razliku od drugih materijala apsorbuje i uklanja veliki deo toplote nastale od požara. Kada se aluminijum topi na 660 stepeni Celzijus usporava brzinu vatre bez stvaranja zapaljivih i toksičnih gasova.</p>
                            <p>Aluminijumski prozori i vrata pružaju veoma visok nivo bezbednosti zahvaljujući svojoj trajnosti i čvrstini, sprečavajući moguće uljeze.</p>
                            <p>Često se kaže da je osnovni nedostatak aluminijumskih ramova kada govorimo o toplotnoj i zvučnoj izolaciji, što je potpuni mit! Napredak u tehnologiji i kontinuiranom istraživanju su doveli do stvaranja aluminijumskih ramova sa veoma visokom toplotnom izolacijom.</p>
                            <p>Aluminijumski ramovi poboljšani sa specijalnim izolacionim poliamidima mogu da pruže visok nivo toplotne izolacije pogodnim za pasivne objekte sa nultim ili gotovo nultim nivoom potrošnje energije. U kombinaciji sa visokoizolovanim panelima, toplotno izolovani aluminijumski prozori štite Vaš dom od neželjenih temperatura iz spoljašnjeg okruženja kako u zimskim tako i letnjim vremenskim uslovima. Osim toga, zahvaljujući naprednim zaptivkama, prožaju otpornost čak i za hladne severne vetrove se efikasno rešavaju bez ikakve opasnosti da zima prođe unutra.</p>
                            <p>Na kraju, visoka refleksija aluminijuma (albedo) odbija sunčevo zračenje i smanjuje toplotu koja se apsorbuje u ramovima tokom perioda intenzivne izloženosti suncu, doprinoseći očuvanju temperature unutrašnjeg enterijera tokom leta. U stvari, ovo je takođe razlog zašto se većinom aluminijumske lamele uglavnom koriste za senčenje fasada.</p>
                            <p>Zvučna izolacija je takođe jedna od osnovnih karakteristika koje treba uzeti u obzir prilikom izbora prozora i vrata, posebno za objekte smeštene u urbanim sredinama sa visokim nivoom buke.</p>
                            <br></br>
                            <h2>Drvo</h2>
                            <div className='underline naslov'></div>
                            <p>Drvena vrata i prozori nude elegantna i funkcionalna rešenja za Vaš dom. U dom unose lepotu, toplinu i daju mu lični pečat. Ukoliko gradite ili renovirate dom ili poslovni prostor, odlučite se za drvenu stolariju koja će ispuniti sve vaše zahteve i potrebe - ekološka je, elegantna, funkcionalna i odličan izolator.</p>
                            <p>Drveni prozori predstavljaju su jedan od najboljih načina da zaštite vaš dom ili poslovni prostor od spoljašnjih uticaja. Drveni prozori pružaju izuzetnu izolaciju tokom hladnih zimskih dana ali tokom leta.  Sem toplotne izolacija, drveni prozori su nenadmašni zvučni izolatori koji će vas zaštiti od ulične buke.</p>
                            <p>Pored ugradnje drvenih prozora kao sledeća stavka koja se nameće ukoliko želite topao, lep i funkcionalan dom ili poslovni prostor jeste ugradnja drvenih vrata.
                                Drvena vrata pored odlične toplotne izolacije tokom zime i leta pružaju i zvučnu izolaciju.</p>
                            <p>Drvena stolarija je u potpunosti ekološki prihvatljiva jer drveni okviri neće zagađivati životnu sredinu na kraju svog životnog ciklusa. Nakon što ih zamenite, oni će istruleti i rasprasti se.</p>
                            <p>Laminirano drvo je lepljeno drvo koje unapređuje fizičke karakteristike samog drveta, ističe njegovu lepotu i omogućava njegovo lakše oblikovanje. Laminirano drvo sastoji se od pojedinačnih drvenih slojeva različitih veličina, koji su zalepljeni zajedno u kontrolisanim industrijskim uslovima uz pomoć posebnih veziva.
                                Drvena stolarija se lako može ofarbati i na taj način dobijate stolariju u željenoj boji! </p>
                        </div>
                    </div>
                    <section className='content'>
                        <div className='title'>
                            <br></br>
                            <h2>Tipovi prozora</h2>
                            <div className='underline'></div>
                        </div>
                    </section>
                    <div className="proizvodi">
                        <div className='title naslov'>
                            <h2>Okretno-nagibni prozori</h2>
                            <div className='underline naslov'></div>
                            <p>Okretno-nagibni prozori pružaju odličan nivo termičke izolacije, zvučne izolacije, vazdušnu i vodonepropustljivost, ali ne mogu da pokriju velike širine, veće od 2,00 m, čak i kod dvokrilnih vrata. Takođe zahtevaju odgovarajuću količinu prostora u enterijeru tako da se prozor ili vrata mogu otvoriti bez prepreka.</p>
                            <p>karakteristike okretno-nagibnih prozora i spoljnih vrata:</p>
                            <ul >
                                <li>Otvaranje prema unutra sa ili bez nagibne funkcije</li>
                                <li>Otvaranje prema spolja</li>
                                <li>Vrata na vrhu (otvaraju se prema spolja, sa donje strane)</li>
                                <li>Vertikalni ili horizontalni pivot prozori</li>
                                <li>Kombinacija kliznog i okretno-nagibnog prozora sa mehanizmom za odstupanje</li>
                            </ul>
                            <br></br>
                            <h2>Klizni prozori</h2>
                            <div className='underline naslov'></div>
                            <p>Klizni prozori i vrata su vrlo dobar izbor u slučaju da treba da pokrijete širine veće od 1,70 m. Osim toga, klizni prozori su idealna opcija kada imate ograničen prostor oko prozora. Takođe, za velike raspone možete da koristite tehnološki vrhunski podizno-klizni sistem koji je mnogo lakši za klizanje i pruža izvrsno dihtovanje protiv vazduha i vode, zahvaljujući posebnom mehanizmu podizanja koji podiže krilo, omogućujući svojim točkićima glatko klizanje na šinama rama. Moderni klizni prozori i vrata prešli su dug razvojni put i pružaju pouzdana rešenja sa izvrsnom funkcionalnošću.</p>
                            <br></br>
                            <h2>Fiksni prozori</h2>
                            <div className='underline naslov'></div>
                            <p>Fiksni prozori su pričvršćeni na zid bez ikakvog zatvaranja ili otvaranja. Generalno, oni su predviđeni za pružanje osvetljenja prostoriji. Potpuno zastakljena krila fiksirana su na ram prozora. Ova vrsta prozora se koristi samo u situacijama u kojima je potrebno samo svetlo ili visual, jer nije moguće provetravanje putem fiksnog prozora.</p>
                            <br></br>
                            <h2>Harmonika / sklopivi prozori</h2>
                            <p>Ako postoje vrlo veliki rasponi i želite jednostavan pristup spoljašnjim zonama, možete da odaberete rešenje harmonika vrata. Glavna njihova prednost je potpuno ili delimično preklapanje krila na strani rama. Ovo rešenje obično se koristi u prostorima  kao što su restorani i kafići ili u velikim kućama, pružajući punu slobodu kretanja i jednostavan pristup.</p>
                            <p>Ukratko, pružena je ogromna količina rešenja i stoga bi trebalo da budete oprezni sa detaljima u svakom pojedinačnom prostoru. Generalno, kako biste odabrali pravu vrstu prozora ili vrata, trebalo bi uzeti u obzir sledeće:</p>
                            <ul >
                                <li>Raspon koji želite da pokrijete (dužina, širina, visina)</li>
                                <li>Klimatske uslove okoline</li>
                                <li>Pristup prozoru ili vratima kako bi se otvorio / zatvorio, kao i da li može da se očisti sa spoljne i unutrašnje strane</li>
                                <li>Nivo bezbednosti koji želite da postignete</li>
                            </ul>
                        </div>
                    </div>
                    <section className='content'>
                        <div className='title'>
                            <br></br>
                            <h2>Ispitivanje toplotne izolacije prozora ili vrata</h2>
                            <div className='underline'></div>
                        </div>
                    </section>
                    <div className="proizvodi">
                        <div className='title naslov'>
                            
                            <p>Tip prozora ili vrata utiče na stepen termičke izolacije, tako da, kao što je gore spomenuto, okretno-nagibni sistemi prozora obično nude veću termičku izolaciju od kliznih prozora, budući da njihova konstrukcija omogućava bolje dihtovanje zahvaljujući izolacionim gumama postavljenim oko prozorskih krila i ramova. Iz istog razloga, tj. stepena nepropustljivosti, dvokrilni klizni prozor kome jedno krilo klizi, a drugo je fiksno, nudi veću termičku izolaciju od odgovarajućeg gde oba krila klizaju.</p>
                            <p>Međutim, kako bismo bili sigurni da prozor koji odaberemo ima visok stepen termičke izolacije, trebalo bi da razmotrimo dva ključna pokazatelja: Uf-vrednost i Uw-vrednost.</p>
                            <p>Uf označava stepen termičke izolacije prozora bez stakla, tako da meri samo termički gubitak rama i krila. Kroz Uf možemo direktno da uporedimo dva različita rama i da napravimo korisne zaključke o nivou termičke izolacije koju oni nude. Ipak, kako bismo došli do konačnog zaključka, trebali bismo da proverimo Uw vrednost, koja meri termičke gubitke prozora kao celine, uključujući staklenu ploču. S obzirom na činjenicu da staklo predstavlja obično 70% -80% ukupne površine prozora, očigledno  da je indikator Uw ključan za termičku izolaciju prozora.</p>
                            
                            <p>Na primer, jednostavan neizolovani aluminijumski prozor sa energetski efikasnim staklom može imati termičku izolaciju sličnu drugom skupljem termički izolovanom aluminijumskom prozoru koji ne uključuje energetski efikasnu staklenu ploču.</p>
                            
                            
                            <p>Dakle, moramo da obratimo pažnju na oba indikatora, ali više da naglasimo Uw što je zapravo konačna termička izolacija prozora. Imajte na umu da se na ulaznim vratima odgovarajući indikator naziva Ud i meri stepen termičke izolacije vrata kombinovnog sa primenjenim panelom.</p>
                            <p>Posljednje, ali ne i najmanje važno, indikator Ug određuje samo termičku izolaciju staklene ploče. Konkretno, Uf-vrednost u kombinaciji sa Ug-vrednošću vodi nas do konačne Uw-vrednosti (za prozore / balkonska vrata) ili Ud-vrijednost (za ulazna vrata).</p>
                            <p>Važno je zapamtiti da svi gore navedeni pokazatelji mere termičke gubitke, zbog čega se nazivaju i pokazatelji termičke transmisije. Što je niži termički gubitak, to je veća termička izolacija ispitanih prozora ili vrata. Stoga, niža vrednost Uf, Ug, Uw i Ud - veću energetsku efikasnost će imati vaši prozori i vrata. Na primer, klizna vrata sa Uw = 1,6 W / m2K će ponuditi veću termičku izolaciju od kliznih vrata s Uw = 1,9 W / m2K. Konačno, treba naglasiti da se Uw i Ud moraju uvek izračunati i upoređivati za određene dimenzije rama.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}
export default InformisiPage;
const Wrapper = styled.main`
            .size{
                font-size:20px  
}
            .proizvodi{
                margin-top: 4rem;
}
            .product-center {

                gap: 4rem;
  }
            .price {
                color: var(--clr-primary-5);
}
            .btn{
                margin:5px
}
            .desc {
                line-height: 2;
            max-width: 45em;
}
            .info {
                text - transform: capitalize;
            width: 300px;
            display: grid;
            grid-template-columns: 125px 1fr;
            span {
                font-weight: 700;
}
}

            .naslov {
                margin-left: 0;
            text-align: left;
            margin-top: 1rem;
            margin-bottom:1rem;
}


            @media (min-width: 992px) {
.product - center {
                grid-template-columns: 1fr 1fr;
            align-items: center;
    }
            .price {
                font-size: 1.25rem;
    }
  }
            `