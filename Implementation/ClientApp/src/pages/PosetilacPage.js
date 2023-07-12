
import React, { useState, useEffect } from 'react';
import { PageHero, ProductImages } from '../components'
import { authHeader } from '../helpers';
import axios from "axios";
import { authenticationService } from '../services';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ListViewProdavac } from '../components'

const PosetilacPage = () => {
    const [mail, setMail] = useState();
    const [naziv, setNaziv] = useState();
    const [id, setID] = useState();
    const [favorites, setFavorites] = useState([])
    const currentUser = authenticationService.currentUserValue;
    useEffect(() => {
        const fetchData = async () => {
            axios.get(`https://localhost:5001/Posetilac/PreuzmiPosetioca`,
                {
                    headers: authHeader()

                }
            ).then(response => {
                console.log(response)
                console.log(response.data)
                setMail(response.data.mail)
                setID(response.data.id)
                setNaziv(response.data.naziv)
                setFavorites(response.data.favourites)
            })
                .catch(error => {
                    console.log(error)
                    console.error('There was an error!', error);
                })
        }
        fetchData();
    }, [])



    return (
        <Wrapper>
            <PageHero title={naziv} />
            <div className='section section-center'>
                <div className='product-center'>
                    <section className='content'>
                        <div className='title'>
                            <h2>{naziv}</h2>
                            <div className='underline'></div>
                        </div>
                        <br></br>
                        <br></br>
                        <p className='info'>
                            <span>ID : </span>
                            {id}
                        </p>
                        <p className='info'>
                            <span>Naziv : </span>
                            {naziv}
                        </p>
                        <p className='info'>
                            <span>Email : </span>
                            {mail}
                        </p>
                        <br></br>

                        <Link to='/user/changePassword' className='btn'>
                            Promeni Sifru
                        </Link>

                        <Link to='/user/delete' className='btn'>Obrisite ovaj nalog</Link>
                        <br></br>
                        <hr />
                        <br></br>
                    </section>
                </div>
                
                <div className="proizvodi">
                    <div className='title naslov'>
                        <h2>My favorites</h2>
                        <div className='underline naslov'></div>
                    </div>
                    {(favorites.length >= 1) &&
                        <ListViewProdavac products={favorites} korisnik={currentUser.tipKorisnika} />
                    }
                    {(favorites.length < 1) && <p className='size'>Nemate ni jedan omiljen proizvod</p>}
                </div>
                
            </div>
        </Wrapper>
    );

}

export default PosetilacPage;

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
    text-transform: capitalize;
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