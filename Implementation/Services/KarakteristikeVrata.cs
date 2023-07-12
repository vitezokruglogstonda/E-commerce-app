using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WinScout.Service
{
    public class KarakteristikeVrata
    {
        enum Materijal
        {
            Drvo,
            Staklo,
            PVC,
            Aluminijum
        }
        enum Primena
        {
            Spoljasnja,
            Unutrasnja
        }
        enum TipVrata
        {
            Jednokrilna,
            Dvokrilna,
            Trokrilna,
            Harmonika,
            Klizna
        }
        public List<string> VratiMaterijale()
        {
            List<string> tmp = new List<string>();
            foreach (string i in Enum.GetNames(typeof(Materijal)))
            {
                tmp.Add(i);
            }
            return tmp.ToList();
        }
        public List<string> VratiPrimene()
        {
            List<string> tmp = new List<string>();
            foreach (string i in Enum.GetNames(typeof(Primena)))
            {
                tmp.Add(i);
            }
            return tmp.ToList();
        }
        public List<string> VratiTipoveVrata()
        {
            List<string> tmp = new List<string>();
            foreach (string i in Enum.GetNames(typeof(TipVrata)))
            {
                tmp.Add(i);
            }
            return tmp.ToList();
        }
    }
}
