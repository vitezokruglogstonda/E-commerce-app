import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from "react";
import axios from "axios";
import { authHeader } from '../helpers';
import ReactStars from 'react-stars';

const ListViewProdavac = ({ products, korisnik }) => {

  const [showSuccess, setShowSuccess] = useState(false);
  const [showSuccessObrisan, setShowSuccessObrisan] = useState(false);
  const [poruka, setPoruka] = useState("");

  const [idToDelete, setId] = useState();
  function obrisi(id) {
    console.log(authHeader())
    const data = id;
    const msg = axios.delete(`https://localhost:5001/Prodavac/IzbrisiProizvod/${id}`, {
      headers: authHeader()
    }, null).then(resp => {
      console.log(resp);
      console.log(resp.data.message);
      setPoruka(resp.data.message);
      setShowSuccessObrisan(true);
    })
      .catch(error => {
        setPoruka(error.response.data.message);
        setShowSuccessObrisan(true);
        console.log(error.response);
        console.log(error.response.data.message);
      });
    console.log(msg.response);
    setId();

  }
  function askToDelete(id) {
    setShowSuccess(true);
    setId(id);
  }
  return (
    <Wrapper>
      {products.map((product) => {
        const { id, naziv, cena, opisProizvoda, tipProizvoda, slika, ocenaDisplay,odobren } = product
        return (
          <article key={id}>
            <img src={`https://localhost:5001/Slike/Proizvod/${tipProizvoda}/${slika}`} alt={naziv} />
            <div>
              <h4>{naziv}</h4>
              <ReactStars
                value={ocenaDisplay}
                count={5}
                edit= {false}
                size ={ 30}/>
              <h5 className='price'>{cena} RSD</h5>
              <p>{opisProizvoda.substring(0, 150)}...</p>
              {odobren===true && <Link to={`/products/${tipProizvoda}/${id}`} className='btn'>
                Detalji
              </Link>}
              {korisnik==="Prodavac" && <Link to={`/user/prodavac/izmeni/${tipProizvoda}/${id}`} className='btn'>
                Izmeni proizvod
              </Link>}
              {korisnik==="Prodavac" && <button className='btn' onClick={() => askToDelete(`${id}`)}>obrisi proizvod</button>}
            </div>
          </article>
        )
      })}
      {showSuccess && <div className="successForm"><p>Da li zelite da obrisete ovaj proizvod?</p>
        <button className="btn" onClick={() => { setShowSuccess(false); obrisi(idToDelete) }}>da</button>
        <button className="btn" onClick={() => { setShowSuccess(false); }}>ne</button>
      </div>}
      {showSuccessObrisan && <div className="successForm"><p>{poruka}</p>
        <Link to={`/user/prodavac`}><button className="btn" onClick={() => { setShowSuccessObrisan(false); window.location.reload(); }}>ok</button></Link>
      </div>}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;
  width: 100%;
  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
  .successForm{
    background-color: #fff;
    border-radius: 4px;
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 1px 1px 3px 1px rgba(0,0,0,.3);
    font-size: 20px;
    text-align: center;
    line-height: 40px;
  }
`

export default ListViewProdavac
