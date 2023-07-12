import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { authHeader } from '../helpers';
import ReactStars from 'react-stars';
import { authenticationService } from '../services';
import {
  ProductImages,
  PageHero,
} from '../components'
import Comments from "../components/Comments"
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'

const SingleProductPage = props => {
  const { tipProizvoda, id } = useParams()

  const [Komentari, setKomentari] = useState([]);
  const [data, setData] = useState([]);
  const [prodavacData, setProdavac] = useState([]);

  useEffect(() => {
      axios.get(`https://localhost:5001/API/PreuzmiProizvod/${tipProizvoda}/${id}`
      ).then(response => {
        console.log(response)
        console.log(response.data)
        setData(response.data)
        setKomentari(response.data.komentari)
        prodavac(response.data.prodavacID)
      })
        .catch(error => {
          console.log(error);
          window.location.href = "https://localhost:5001/error";
        })
  }, [])

  const {
    prodavacID,
    brojKomentara,
    ocenaDisplay,
    naziv,
    cena,
    opisProizvoda,
    materijal,
    sistemOtvaranja,
    primena,
    koeficijent,
    staklo,
    debljinaStakla,
    komore,
    paneli,
    tipProzora,
    tipVrata,
    dimenzije,
    mrezica,
    roletna,
    slika,
  } = data;

  const prodavac = (data) => {
    console.log(data)
    axios.get(`https://localhost:5001/Old/PreuzmiProdavca/${data}`
    ).then(response => {
      console.log(response)
      console.log(response.data)
      setProdavac(response.data)
      
    })
      .catch(error => {
        console.log(error);
      })
  }
  const currentUser = authenticationService.currentUserValue;
  const check = () => {
    if(currentUser === null || currentUser.tipKorisnika === "Prodavac" || currentUser.tipKorisnika === "Admin")
    {
      return false;
    }
    else {
      return true;
    }
  }

  const rating = {
    value: ocenaDisplay,
    count: 5,
    edit: currentUser === null ? false : currentUser.tipKorisnika === "Prodavac" ? false : currentUser.tipKorisnika === "Admin" ? false : true,
    size: 30,
    half: false,
    onChange: (newRating) => {
      axios.put(`https://localhost:5001/Posetilac/Oceni/${id}/${newRating}`, null,
        {
          headers: authHeader()
        }
      ).then(response => {
        console.log(response)
        console.log(response.data)
      })
        .catch(error => {
          console.log(error)
          console.error('There was an error!', error);
        })
    }
  }
  const [prati, setPrati] = useState(true);
  const zaprati = () => {
    axios.put(`https://localhost:5001/Posetilac/Subscribe/${id}`, null,
      {
        headers: authHeader()
      }
    ).then(response => {
      console.log(response)
      console.log(response.data)
      setPrati(false);
    })
      .catch(error => {
        console.log(error)
        console.error('There was an error!', error);
      })
  }
  const odprati = () => {
    axios.put(`https://localhost:5001/Posetilac/Unsubscribe/${id}`, null,
      {
        headers: authHeader()
      }
    ).then(response => {
      console.log(response)
      console.log(response.data)
      setPrati(true);
    })
      .catch(error => {
        console.log(error)
        console.error('There was an error!', error);


      })
  }


  return (
    <Wrapper>
      <PageHero title={naziv} product tipProizvoda={tipProizvoda}/>
      <div className='section section-center page'>
        <Link to={`/products/${tipProizvoda}`} className='btn'>
          vrati se u sve proizvode
        </Link>
        <div className=' product-center'>
          <ProductImages image={`https://localhost:5001/Slike/Proizvod/${tipProizvoda}/${slika}`} />
          <section className='content'>
            <h2>{naziv}</h2>
            <ReactStars {...rating} />
            <h5 className='price'> {cena} RSD</h5>
            <p className='desc'> {opisProizvoda}</p>
            <p className='info'>
              <span>  Tip prozivoda : </span>
              {tipProizvoda}
            </p>
            <p className='info'>
              <span>Dimenzije :</span>
              {dimenzije} cm
            </p>
            <p className='info'>
              <span>Materijal : </span>
              {materijal}
            </p>
            {tipProizvoda === "Prozor" && <p className='info'>
              <span>Sistem otvaranja : </span>
              {sistemOtvaranja}
            </p>}
            {tipProizvoda === "Vrata" && <p className='info'>
              <span> Primena : </span>
              {primena}
            </p>}
            <p className='info'>
              <span> Koeficijent prolaza toplote : </span>
              {koeficijent}
            </p>
            {tipProizvoda === "Prozor" && <p className='info'>
              <span>Vrsta stakla : </span>
              {staklo}
            </p>}
            <p className='info'>
              <span> Debljina stakla : </span>
              {debljinaStakla} mm
            </p>
            <p className='info'>
              <span>Broja komora : </span>
              {komore}
            </p>
            {tipProizvoda === "Prozor" && <p className='info'>
              <span>Tip prozora : </span>
              {tipProzora}
            </p>}
            {tipProizvoda === "Vrata" && <p className='info'>
              <span>Tip vrata : </span>
              {tipVrata}
            </p>}
            {tipProizvoda === "Prozor" && <p className='info'>
              <span>Broj panela : </span>
              {paneli}
            </p>}
            {tipProizvoda === "Prozor" && <p className='info'>
              <span>Mreza za komarce : </span>
              {mrezica ? "Ima" : "Nema"}
            </p>}
            {tipProizvoda === "Prozor" && <p className='info'>
              <span>Roletne : </span>
              {roletna ? "Ima" : "Nema"}
            </p>}
            <p className='info'>
              <span> Ime prodavca : </span>
              {<Link to={`/prodavac/${prodavacData.id}`} >{prodavacData.naziv}</Link>}
            </p>
            <hr />
            <br></br>

            {currentUser !== null && currentUser.tipKorisnika === "Posetilac" && prati && <button className="btn" onClick={zaprati}>Subcribe</button>}
            {currentUser !== null && currentUser.tipKorisnika === "Posetilac" && !prati && <button className="btn" onClick={odprati}>Unsubcribe</button>}
          </section>
          
        </div>
        {/*<Comments idProiz={id}/>*/}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 160px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 2rem;
    }
  }
`

export default SingleProductPage
