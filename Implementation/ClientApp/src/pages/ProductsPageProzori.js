import {React,useEffect,useState} from 'react'
import axios from "axios";
import styled from 'styled-components'
import { Filters, ProductList, Sort, PageHero } from '../components'
import { ProizvodiContext } from '../context/reg_context';


const ProductsPageProzori = () => {
const [products, setProducts] = useState([]);

const [CenaMin, setCenaMin] = useState(null);
const [CenaMax, setCenaMax] = useState(null);
const [MinOcena, setMinOcena] = useState(null);
const [Duzina, setDuzina] = useState(null);
const [Sirina, setSirina] = useState(null);
const [Materijal, setMaterijal] = useState(null);
const [SistemOtvaranja, setSistemOtvaranja] = useState(null);
const [Koeficijent, setKoeficijent] = useState(null);
const [Primena, setPrimena] = useState(null);
const [Staklo, setStaklo] = useState(null);
const [DebljinaStakla, setDebljinaStakla] = useState(null);
const [Komore, setKomore] = useState(null);
const [Paneli, setPaneli] = useState(null);
const [Roletne, setRoletne] = useState(Boolean);
const [Mrezica, setMrezica] = useState(null);
const [TipProzora, setTipProzora] = useState(null);
const [TipVrata, setTipVrata] = useState(null);

const [urlNext, setUrl] = useState(null);


const [tipProzivoda, settipProzivoda] = useState("Prozor");
const [sortOrder, setsortOrder] = useState("Rastuce");
const [pageNumber, setpageNumber] = useState(1);
const [pageSize, setpageSize] = useState(10);
const [gridView, setGridView] = useState(true);




const [nextPage,setNextPage] = useState(null);
const [prevPage,setPrevPage] = useState(null);


const [ucitajPredhodnu,setUcitajPredhodnu] = useState(false);
const [ucitajNarednu,setNarednu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const filter = {
        CenaMin:CenaMin,
        MinOcena:MinOcena,
        CenaMax:CenaMax,
        Duzina:Duzina,
        Sirina:Sirina,
        Materijal:Materijal,
        SistemOtvaranja:SistemOtvaranja,
        Koeficijent:Koeficijent,
        Primena:Primena,
        Staklo:Staklo,
        DebljinaStakla:DebljinaStakla,
        Komore:Komore,
        Paneli:Paneli,
        Roletne:Roletne,
        Mrezica:Mrezica,
        TipProzora:TipProzora,
        TipVrata:TipVrata
        }
        var url = `https://localhost:5001/API/PreuzmiSveProizvode/Prozor/${sortOrder}/${pageNumber}/${pageSize}`;
        console.log(ucitajPredhodnu,ucitajNarednu)
        if(ucitajPredhodnu)
        {
          url=prevPage;
          setUcitajPredhodnu(false)
        }
        else if(ucitajNarednu)
        {
          url=nextPage;
          setNarednu(false);
        }

        const msg =axios.post(url,filter)
      .then(response => {
            console.log(response)
            console.log(response.data)
            setProducts(response.data.data)
            const next=response.data.nextPage;
            const prev=response.data.previousPage;
            setNextPage(next);
            setPrevPage(prev);
      })
      .catch(error => {
      console.log(error)
       console.error('There was an error!', error);
      })
        
    }
    fetchData();
  }, [sortOrder,pageSize,CenaMin,CenaMax,MinOcena,Duzina,Sirina,Materijal,SistemOtvaranja,Koeficijent,Staklo
  ,DebljinaStakla,Komore,Paneli,Roletne,Mrezica,TipProzora,Primena,TipVrata,pageNumber])

  return (
    <>
      <PageHero title='Prozori' />
      <ProizvodiContext.Provider value={{
        tipProzivoda,
         CenaMin,
         MinOcena,
         CenaMax,
         Duzina,
         Sirina,
         Materijal,
         SistemOtvaranja,
         Koeficijent,
         Primena,
         Staklo,
         DebljinaStakla,
         Komore,
         Paneli,
         Roletne,
         Mrezica,
         TipProzora,
         TipVrata,
         sortOrder,
        pageNumber,
        pageSize,
        gridView,
        setCenaMin,
        setCenaMax,
        setMinOcena,
        setDuzina,
        setSirina,
        setMaterijal,
        setSistemOtvaranja,
        setKoeficijent,
        setPrimena,
        setStaklo,
        setDebljinaStakla,
        setKomore,
        setPaneli,
        setRoletne,
        setMrezica,
        setTipProzora,
        setTipVrata,
        setTipVrata,
        settipProzivoda,
        setsortOrder,
        setpageNumber,
        setpageSize,
        products
        }} >

      <Wrapper className='page'>
        <div className='section-center products'>
          
          <Filters />
          <div>
            <Sort />
            <ProductList />
            <div className="linkss">
        {prevPage!== null && <button className="btn k" onClick={() => {setUrl(prevPage);setUcitajPredhodnu(true);setpageNumber(pageNumber-1)}}>Predhodna stranica</button>}
        {nextPage!== null && <button className="btn k" onClick={() => {setUrl(prevPage);setNarednu(true);setpageNumber(pageNumber+1)}}>Sledeca stranica</button>}
        </div>
          </div>
        </div>
        
      </Wrapper>
      </ProizvodiContext.Provider>
    </>
  )
}


const Wrapper = styled.div`
input[type=number] {
  -moz-appearance: textfield;
}
  input{
    display: block;
    width: 100%;
    height: 45px;
    padding: 5px 5px 5px 40px;
    border: 1px solid #ccc;
    border-radius: 3px;
    &[type=password]{
      padding-right: 90px;
    }

    &:focus{
        border-color: var(--clr-primary-5);
        outline: none;

        &+label{
          display: block;
        }
  
    }
  
   
  }
  
.k{
  margin:10px;
}
  .linkss{
    display: flex;
    justify-content: center;
    margin:40px;
  }
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`

export default ProductsPageProzori
