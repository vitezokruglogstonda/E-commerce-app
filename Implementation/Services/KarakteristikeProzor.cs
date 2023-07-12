using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WinScout.Service
{
    public class KarakteristikeProzor
    {
        enum Materijal
        {
            Drvo,
            PVC,
            Aluminijum
        }
        enum SistemOtvaranja
        {
            Prema_unutra,
            Prema_vani,
            Kip
        }
        enum Staklo
        {
            Jednoslojno,
            Dvoslojno,
            Troslojno
        }
        enum TipProzora
        {
            Okretno_nagibni,
            Pivot,
            Klizni,
            Fiksni,
            Harmonika
        }
        enum Dodaci
        {
            Roletne,
            Mreza_za_komarce
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
        public List<string> VratiSistemeOtvaranja()
        {
            List<string> tmp = new List<string>();
            foreach (string i in Enum.GetNames(typeof(SistemOtvaranja)))
            {
                tmp.Add(i);
            }
            return tmp.ToList();
        }
        public List<string> VratiStaklo()
        {
            List<string> tmp = new List<string>();
            foreach (string i in Enum.GetNames(typeof(Staklo)))
            {
                tmp.Add(i);
            }
            return tmp.ToList();
        }
        public List<string> VratiTipoveProzora()
        {
            List<string> tmp = new List<string>();
            foreach (string i in Enum.GetNames(typeof(TipProzora)))
            {
                tmp.Add(i);
            }
            return tmp.ToList();
        }
        public List<string> VratiDodatke()
        {
            List<string> tmp = new List<string>();
            foreach (string i in Enum.GetNames(typeof(Dodaci)))
            {
                tmp.Add(i);
            }
            return tmp.ToList();
        }
    }
}
