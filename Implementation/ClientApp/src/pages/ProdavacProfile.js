import React, { useState, useEffect } from 'react';
import { PageHero, ProductImages } from '../components'
import { authHeader } from '../helpers';
import axios from "axios";
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { ListView } from '../components'
import { authenticationService } from '../services';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
const ProdavacProfile = () => {
    const { idP } = useParams()
    const [prodavac, setProdavac] = useState([]);
    const [lokacija, setLokacija] = useState([]);
    const [proizvodi, setProizvodi] = useState([]);
    const currentUser = authenticationService.currentUserValue;

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`https://localhost:5001/api/PreuzmiPodavca/${idP}`,
            ).then(response => {
                console.log(response)
                console.log(response.data)
                setProdavac(response.data)

                setLokacija(response.data.lokacija)
                setProizvodi(response.data.proizvodi);
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
        prodavacId,
        x,
        y,
    } = lokacija;


    const position = [51.505, -0.09]


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
                        <br />
                        <br />
                        <p className='info'>
                            <span>Naziv : </span>
                            {naziv}
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

                        <hr />
                        <br />
                    </section>
                </div>
                <div className="proizvodi">
                    <div className='title naslov'>
                        <h2>proizvodi</h2>
                        <div className='underline naslov'></div>
                    </div>
                    {(proizvodi.length >= 1) &&
                        <ListView products={proizvodi} />
                    }
                    {(proizvodi.length < 1) && <p className='size'>Nemate ni jedan odobren proizvod</p>}
                </div>


                <div id="mapid">
                    <MapContainer center={position} zoom={13} >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                Prodavac
                            </Popup>
                        </Marker>
                    </MapContainer >
                </div>

            </div>
        </Wrapper>
    );
}
/*
"browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
*/

export default ProdavacProfile;

const Wrapper = styled.main`
.leaflet-container{
    width:500px;
    height:500px;
}
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
      font-size: 1.25rem;
    }
  }
`