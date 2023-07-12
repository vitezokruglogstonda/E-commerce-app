import React, { useState, useEffect } from 'react';
import { PageHero, ProductImages } from '../components'
import { authHeader } from '../helpers';
import axios from "axios";
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ListViewProdavac } from '../components'
import {  authenticationService } from '../services';

const ProdavacPage = () => {

    const [prodavac, setProdavac] = useState([]);
    const [lokacija, setLokacija] = useState([]);
    const [komentari, setKomentari] = useState([]);
    const [proizvodi, setProizvodi] = useState([]);
    const [neodobreni, setNeodobreni] = useState([]);
    const currentUser = authenticationService.currentUserValue;

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`https://localhost:5001/Prodavac/PreuzmiProdavca/`,
                {
                    headers: authHeader()
                    
                }
            ).then(response => {
                console.log(response)
                console.log(response.data)
                setProdavac(response.data)
                setLokacija(response.data.lokacija)
                setProizvodi(response.data.proizvodi.filter(odobreni=>odobreni.odobren===true));
                setKomentari(response.data.komentari)
            })
                .catch(error => {
                    console.error('There was an error!', error);
                })
        }
        fetchData();
    }, [])

    
    useEffect(() => {
        const fetchData = async () => {
            axios.get(`https://localhost:5001/Prodavac/PreuzmiNeodobreneProizvode/`,
                {
                    headers: authHeader()
                }
            ).then(response => {
                console.log(response)
                console.log(response.data)
                setNeodobreni(response.data)
            })
                .catch(error => {
                    console.error('There was an error!', error);
                })
        }
        fetchData();
    }, [])


    const {
        id,
        naziv,
        tipKorisnika,
        mail,
        slika,
        telefon,
        mesto,
        adresa
    } = prodavac;

    const {
        x,
        y,
    } = lokacija;

    
    return (
        <Wrapper>
            <PageHero title={`${naziv}`} />
            <div className='section section-center'>
                <div className='product-center'>
                    <ProductImages image={`https://localhost:5001/Slike/Prodavac/${slika}`} />
                    <section className='content'>
                        <div className='title'>
                            <h2>{naziv}</h2>
                            <div className='underline'></div>
                        </div>
                        
                        <p className='info'>
                            <span>ID : </span>
                            {id}
                        </p>
                        <p className='info'>
                            <span>Naziv : </span>
                            {naziv}
                        </p>
                        <p className='info'>
                            <span>Tip Korisnika : </span>
                            {tipKorisnika}
                        </p>
                        <p className='info'>
                            <span>Email : </span>
                            {mail}
                        </p>
                        <p className='info'>
                            <span>Telefon : </span>
                            {telefon}
                        </p>
                        <p className='info'>
                            <span>Mesto : </span>
                            {mesto}
                        </p>
                        <p className='info'>
                            <span>Adresa : </span>
                            {adresa}
                        </p>
                        <p className='info'>
                            <span>Lokacija x: </span>
                            {x}
                        </p>

                        <p className='info'>
                            <span>Lokacija y: </span>
                            {y}
                        </p>
                        <Link to='/user/changeAccountInfo' className='btn'>
                            Izmeni podatke
                        </Link>
                        <Link to='/user/changePassword' className='btn'>
                            Promeni Sifru
                        </Link>

                        <Link to='/user/delete' className='btn'>Obrisite ovaj nalog</Link>
                        <hr />
                        <br />

                        <Link to='/user/prodavac/dodaj' className='btn'>
                            Dodaj proizvod
                        </Link>

                        

                    </section>
                </div>
                <div className="proizvodi">
                        <div className='title naslov'>
                            <h2>Odobreni proizvodi</h2>
                            <div className='underline naslov'></div>
                        </div>
                        {(proizvodi.length >= 1) &&
                        <ListViewProdavac products={proizvodi} korisnik={"Prodavac"}/>
                        }
                        {(proizvodi.length < 1) && <p className='size'>Nemate ni jedan odobren proizvod</p>}
                        
                        <div className='title naslov'>
                            <h2>Neodobreni proizvodi</h2>
                            <div className='underline naslov'></div>
                        </div>
                        {(neodobreni.length >= 1) &&
                        <ListViewProdavac products={neodobreni} korisnik={"Prodavac"} />
                        }
                        {(neodobreni.length < 1) && <p className='size'>Nemate ni jedan neodobren proizvod</p>}
                </div>
                
            </div>
        </Wrapper>
    );
}


export default ProdavacPage;

const Wrapper = styled.main`
.size{
    font-size:20px
    
}
.proizvodi{
    margin-top: 4rem;
}
  .product-center {
    display: grid;
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
    margin-top: 2rem;
    margin-bottom:3rem;
  }
  .info {
    
    
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
      font-size: 1.25rem;
    }
  }
`