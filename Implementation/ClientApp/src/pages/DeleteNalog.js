import React, { useState } from "react";
import { authHeader} from '../helpers';
import axios from "axios";
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { authenticationService } from '../services';
import { PageHero } from '../components'

const DeleteNalog = () => {
  const currentUser = authenticationService.currentUserValue;
  const [showSuccesss, setShowSuccesss] = useState(false);

  
  const obrisi=()=> {
    const url = currentUser.tipKorisnika==="Prodavac" ? `https://localhost:5001/Prodavac/IzbrisiProdavca` : `https://localhost:5001/Posetilac/IzbrisiPosetioca/${currentUser.id}`
    const msg = axios.delete(url, {
      headers: authHeader()
    }, null).then(resp => {
      console.log(resp);
      console.log(resp.data.message);
      
      setShowSuccesss(true);
    })
      .catch(error => {
        
        console.log(error.response);
        console.log(error.response.data.message);
        
      });
    console.log(msg.response);

  }
  return (
    <>
      <PageHero title='Obrisi nalog' />
      <Wrapper className='page section section-center'>
        <artilcle>
          <Link to={`/user/${currentUser.tipKorisnika}`} className='btn'>
            vrati se u nalog
          </Link>
          <div className='title'>
            <br></br>
            <h2>Da li zelite da obrisete svoj nalog?</h2>
            <div className='underline'></div>
            <br></br>
          </div>
        <div className="signUpForm__row">
        <button onClick={() => obrisi()} className='btn red'> Zelim da obrisem svoj nalog </button>
        <Link to={`/user/${currentUser.tipKorisnika}`} className='btn'>Ne zelim da obrisem svoj nalog</Link>
        </div>
        </artilcle>
        {showSuccesss && <div className="successForm"><p>Uspesno ste obrisali nalog</p>
          <button className="btn" onClick={() => { setShowSuccesss(false);authenticationService.logout(); }}>ok</button>
        </div>}
      </Wrapper>
    </>
  );
}

export default DeleteNalog;
const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;
  width: 100%;
  .signUpForm__row{
    display: flex;
    flex-wrap:wrap;
    justify-content: center;

    width: 100%;
    margin-bottom: 40px;
    color: #ccc;}
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
    margin:30px;
    padding: 0.25rem 0.5rem;
  }
  .red{
    background:#B11B1B;
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