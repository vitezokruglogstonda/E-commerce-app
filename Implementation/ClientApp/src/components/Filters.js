import React,{useContext,useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ProizvodiContext } from '../context/reg_context';
import ReactStars from 'react-stars';




const Filters = () => {
  const [search,setSearch]=useState("")
    const {CenaMin,setCenaMin,CenaMax,setCenaMax,MinOcena,setMinOcena,Duzina, setDuzina,Sirina, setSirina, setMaterijal
    , setSistemOtvaranja,Koeficijent, setKoeficijent, setStaklo,DebljinaStakla, setDebljinaStakla,Komore, setKomore,Paneli, setPaneli
    , setRoletne, setMrezica, setTipProzora,tipProzivoda, setPrimena,setTipVrata} = useContext(ProizvodiContext);

    const rol = (e) => {
        if (e==="true")
        {
          setRoletne(true);
        }
        else{
          setRoletne(false);
        }
    }
    const mre = (e) => {
      if (e==="true")
      {
        setMrezica(true);
      }
      else{
        setMrezica(false);
      }
  }
  const reset = () => {
    setCenaMin(null)
    setCenaMax(null)
    setMinOcena(null)
    setDuzina(null)
setSirina(null)
setMaterijal(null)
setSistemOtvaranja(null)
setKoeficijent(null)
setStaklo(null)
setDebljinaStakla(null)
setKomore(null)
setPaneli(null)
setRoletne(null)
setMrezica(null)
setTipProzora(null)
setPrimena(null)
setTipVrata(null)
  }
  return (
    <Wrapper>
      <div className='content'>
      <div className='form-control'>
             <h3>Search</h3>
             <br></br>
           <input
             type="text"
             value={search}
             onChange={e => setSearch(e.target.value)}
             />
             <Link className="btn " to={`/search/${search}`}>Search</Link>
          </div>
        <h3>Filteri</h3>
        <br></br>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='form-control'>
             <h5>Minimalna cena</h5>
           <input
             type="number"
             value={CenaMin}
             onChange={e => setCenaMin(e.target.value==="" ? null:e.target.value )}
             />
          </div>
          <div className='form-control'>
             <h5>Maksimalna cena</h5>
           <input
             type="number"
             value={CenaMax}
             onChange={e => setCenaMax(e.target.value==="" ? null:e.target.value )}
             />
          </div>
           <div className='form-control'>
             <h5>Minimalna ocena</h5>
           <ReactStars
                value={MinOcena}
                count={5}
                size ={ 30}
                half={false}
                onChange={(newRating) => {setMinOcena(newRating===0 ? null:newRating )}}
                />
          </div>
          <div className='form-control'>
             <h5>Duzina</h5>
           <input
             type="number"
             value={Duzina}
             onChange={e => setDuzina(e.target.value==="" ? null:e.target.value )}
             />
          </div>
          <div className='form-control'>
             <h5>Sirina</h5>
           <input
             type="number"
             value={Sirina}
             onChange={e => setSirina(e.target.value==="" ? null:e.target.value )}
             />
          </div>
          <div className='form-control'>
             <h5>Koeficijent prolaza toplote</h5>
           <input
             type="number"
             value={Koeficijent}
             onChange={e => setKoeficijent(e.target.value==="" ? null:e.target.value )}
             />
          </div>
          {/*mat za prozor*/}
          {tipProzivoda==="Prozor" && <div className='form-control'>
             <h5>Materijal</h5>
           <select className="btn kar" onChange={e => setMaterijal(e.target.value==="" ? null:e.target.value )}>
              <option value="" selected  >
                Materijal
               </option>
               <option value="Drvo">Drvo</option>
               <option value="PVC">PVC</option>
               <option value="Aluminijum">Aluminijum</option>
            </select>
          </div>}
          {tipProzivoda==="Vrata" && <div className='form-control'>
             <h5>Materijal</h5>
           <select className="btn kar" onChange={e => setMaterijal(e.target.value==="" ? null:e.target.value )}>
              <option value="" selected  >
                Materijal
               </option>
               <option value="Drvo">Drvo</option>
               <option value="PVC">PVC</option>
               <option value="Aluminijum">Aluminijum</option>
               <option value="Staklo">Staklo</option>
            </select>
          </div>}
          {tipProzivoda==="Vrata" && <div className='form-control'>
             <h5>Primena</h5>
           <select className="btn kar" onChange={e => setPrimena(e.target.value==="" ? null:e.target.value )}>
              <option value="" selected  >
                Primena
               </option>
               <option value="Spoljasnja">Spoljasnja</option>
               <option value="Unutrasnja">Unutrasnja</option>
            </select>
          </div>}

          <div className='form-control'>
             <h5>Sistem Otvaranja</h5>
           <select className="btn kar" onChange={e => setSistemOtvaranja(e.target.value==="" ? null:e.target.value )}>
              <option value="" selected  >
                Sistem Otvaranja
               </option>
               <option value="Prema_unutra">Prema_unutra</option>
               <option value="Prema_vani">Prema_vani</option>
               <option value="Kip">Kip</option>
            </select>
          </div>
          <div className='form-control'>
             <h5>Staklo</h5>
           <select className="btn kar" onChange={e => setStaklo(e.target.value==="" ? null:e.target.value )}>
              <option value="" selected  >
                Staklo
               </option>
               <option value="Jednoslojno">Jednoslojno</option>
               <option value="Dvoslojno">Dvoslojno</option>
               <option value="Troslojno">Troslojno</option>
            </select>
          </div>
          <div className='form-control'>
             <h5>Debljina Stakla</h5>
           <input
             type="number"
             value={DebljinaStakla}
             onChange={e => setDebljinaStakla(e.target.value==="" ? null:e.target.value )}
             />
          </div>
          <div className='form-control'>
             <h5>Komore</h5>
           <input
             type="number"
             value={Komore}
             onChange={e => setKomore(e.target.value==="" ? null:e.target.value )}
             />
          </div>
          <div className='form-control'>
             <h5>Paneli</h5>
           <input
             type="number"
             value={Paneli}
             onChange={e => setPaneli(e.target.value==="" ? null:e.target.value )}
             />
          </div>
          {tipProzivoda==="Prozor"&&<div className='form-control'>
             <h5>Roletne</h5>
           <select className="btn kar" onChange={e => rol(e.target.value)}>
              <option value="" selected  >
                Roletne
               </option>
               <option value={true}>Ima</option>
               <option value={false}>Nema</option>  
            </select>
          </div>}
          {tipProzivoda==="Prozor"&&<div className='form-control'>
             <h5>Mrezica za komarce</h5>
           <select className="btn kar" onChange={e => mre(e.target.value)}>
              <option value="" selected  >
                Mrezica
               </option>
               <option value={true}>Ima</option>
               <option value={false}>Nema</option>  
            </select>
          </div>}
          {tipProzivoda==="Prozor"&&<div className='form-control'>
             <h5>Tip prozora</h5>
           <select className="btn kar" onChange={e => setTipProzora(e.target.value==="" ? null:e.target.value )}>
              <option value="" selected  >
                Tip prozora
               </option>
               <option value="Okretno_nagibni">Okretno_nagibni</option>
               <option value="Pivot">Pivot</option>
               <option value="Klizni">Klizni</option>
               <option value="Fiksni">Fiksni</option>
               <option value="Harmonika">Harmonika</option>
            </select>
          </div>}
          {tipProzivoda==="Vrata"&&<div className='form-control'>
             <h5>Tip Vrata</h5>
           <select className="btn kar" onChange={e => setTipVrata(e.target.value==="" ? null:e.target.value )}>
              <option value="" selected  >
                Tip vrata
               </option>
               <option value="Jednokrilna">Jednokrilna</option>
               <option value="Dvokrilna">Dvokrilna</option>
               <option value="Trokrilna">Trokrilna</option>
               <option value="Harmonika">Harmonika</option>
               <option value="Klizna">Klizna</option>
            </select>
          </div>}
          <button className="btn lol" onClick={reset}>reset</button>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
.btn{
  margin-top:20px;
}
.lol{
  font-size:20px;
  padding: 5px 5px 5px 5px;
  text-transform: uppercase;
  background: var(--clr-primary-5);
  color: var(--clr-primary-10);
}
.kar{
width: 100%; 
background: white;
color: black ;
text-transform: none;
display: block;
width: 100%;
height: 45px;
padding: 5px 5px 5px 5px;
    
border: 1px solid #ccc;
border-radius: 3px;
box-shadow: 0 0px 0px rgba(0, 0, 0, 0.2);

&:focus{
        border-color: var(--clr-primary-5);
        outline: none;

        &+label{
          display: block;
        }
  
    }
}
/* Firefox */
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
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }
  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters;