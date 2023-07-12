import { PageHero } from '../components'
import styled from 'styled-components'
import React, { useState } from "react";
import { authHeader } from '../helpers';
import axios from "axios";
import { authenticationService } from '../services';
import { Link } from 'react-router-dom'
const ProdavacDodajPage = () => {
    const getKar = (txt) => {
        const fetchData = async () => {
            axios.get(`https://localhost:5001/Prodavac/PreuzmiKarakteristike/${txt}`,
                {
                    headers: authHeader()
                }
            ).then(response => {
                console.log(response)
                console.log(response.data)
                setKarMaterijal(response.data.materijal)
                setKarSistemOtvaranja(response.data.sistemOtvaranja)
                setKarStaklo(response.data.staklo)
                setKarTipProzora(response.data.tipProzora)
                setKarTipVrata(response.data.tipVrata)
                setKarPrimena(response.data.primena)
            })
                .catch(error => {
                    console.error('There was an error!', error);
                })
        }
        fetchData();
    }
    const currentUser = authenticationService.currentUserValue;
    const [KarMaterijal, setKarMaterijal] = useState([]);
    const [KarSistemOtvaranja, setKarSistemOtvaranja] = useState([]);
    const [KarStaklo, setKarStaklo] = useState([]);
    const [KarTipProzora, setKarTipProzora] = useState([]);
    const [KarTipVrata, setKarTipVrata] = useState([]);
    const [KarPrimena, setKarPrimena] = useState([]);

    const [TipProizvoda, setProizvod] = useState("");
    const handleProizvod = e => {
        const txt = e.target.value;
        setProizvod(txt);
        getKar(txt);

    };

    const [Naziv, setNaziv] = useState("");
    const handleNaziv = e => {
        const txt = e.target.value;
        setNaziv(txt);
    };

    const [Cena, setCena] = useState("");
    const handleCena = e => {
        const txt = e.target.value;
        setCena(txt);
    };

    const [OpisProizvoda, setOpisProizvoda] = useState("");
    const handleOpisProizvoda = e => {
        const txt = e.target.value;
        setOpisProizvoda(txt);
    };

    const [Materijal, setMaterijal] = useState("");

    const handleMaterijal = e => {
        const txt = e.target.value;
        setMaterijal(txt);
    };

    const [SistemOtvaranja, setSistemOtvaranja] = useState("");
    const handleSistemOtvaranja = e => {
        const txt = e.target.value;
        setSistemOtvaranja(txt);
    };

    const [Primena, setPrimena] = useState("");
    const handlePrimena = e => {
        const txt = e.target.value;
        setPrimena(txt);
    };

    const [Koeficijent, setKoeficijent] = useState("");
    const handleKoeficijent = e => {
        const txt = e.target.value;
        setKoeficijent(txt);
    };

    const [Staklo, setStaklo] = useState("");
    const handleStaklo = e => {
        const txt = e.target.value;
        setStaklo(txt);
    };

    const [DebljinaStakla, setDebljinaStakla] = useState("");
    const handleDebljinaStakla = e => {
        const txt = e.target.value;
        setDebljinaStakla(txt);
    };

    const [Komore, setKomore] = useState("");
    const handleKomore = e => {
        const txt = e.target.value;
        setKomore(txt);
    };

    const [Paneli, setPaneli] = useState("");
    const handlePaneli = e => {
        const txt = e.target.value;
        setPaneli(txt);
    };


    const [TipProzora, setTipProzora] = useState("");
    const handleTipProzora = e => {
        const txt = e.target.value;
        setTipProzora(txt);
    };

    const [TipVrata, setTipVrata] = useState("");
    const handleTipVrata = e => {
        const txt = e.target.value;
        setTipVrata(txt);
    };

    const [Dimenzije, setDimenzije] = useState("");
    const handleDimenzije = e => {
        const txt = e.target.value;
        setDimenzije(txt);
    };
    const [Mrezica, setMrezica] = useState(false);
    const handleMrezica = e => {
        const txt = e.target.value;
        setMrezica(txt);
    };
    const [Roletna, setRoletna] = useState(false);
    const handleRoletna = e => {
        const txt = e.target.value;
        setRoletna(txt);
    };


    const [poruka, setPoruka] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const [file, setFile] = useState("");

    const saveFile = (e) => {
        var fajl = e.target.files[0];
        var fajlIme = e.target.files[0].name;
        var exstenzija = fajlIme.substr(fajlIme.length - 3);
        var blob = fajl.slice(0, fajl.size, 'image');
        const newFile = new File([blob], 'name.' + exstenzija, { type: `image/${exstenzija}` });
        setFile(newFile);
        console.log(file);
    };


    const handleDodaj = () => {
        if (TipProizvoda === "Prozor") {
            if (Naziv.trim() === "" ||
                Cena.trim() === "" ||
                OpisProizvoda.trim() === "" ||
                Materijal.trim() === "" ||
                SistemOtvaranja.trim() === "" ||
                Koeficijent.trim() === "" ||
                Staklo.trim() === "" ||
                DebljinaStakla.trim() === "" ||
                Komore.trim() === "" ||
                Dimenzije.trim() === "" ||
                TipProzora.trim() === "") {
                alert("Molim vas popunite sva polja");
                return null;
            }
        }
        else {
            if (Naziv.trim() === "" ||
                Cena.trim() === "" ||
                OpisProizvoda.trim() === "" ||
                Materijal.trim() === "" ||
                Primena.trim() === "" ||
                Koeficijent.trim() === "" ||
                Komore.trim() === "" ||
                Dimenzije.trim() === "" ||
                TipVrata.trim() === "") {
                alert("Molim vas popunite sva polja");
                return null;
            }
        }

    }
    function onMake(e) {
        e.preventDefault();
        if (handleDodaj() === null) {
            return;
        }
        switch (TipProizvoda) {
            case "Prozor":
                onMakeProzor();
                break;
            case "Vrata":
                onMakeVrata();
                break;
            default:
                break;
        }
    }
    function onMakeProzor() {

        const postData = {
            TipProizvoda,
            Naziv,
            Cena,
            OpisProizvoda,
            Materijal,
            SistemOtvaranja,
            Koeficijent,
            Staklo,
            DebljinaStakla,
            Komore,
            TipProzora,
            Dimenzije,
            Paneli,
            Mrezica,
            Roletna
        };
        console.log(postData);
        console.log(file);
        const Data = new FormData();

        Data.append("objekat", JSON.stringify(postData));
        Data.append("Slika", file);

        for (var value of Data.values()) {
            console.log(value);
        }


        const test = axios.post('https://localhost:5001/Prodavac/DodajProizvod',
            Data,
            {
                headers: authHeader()
            }
        ).then(resp => {
            console.log(resp.data.message);
            setPoruka(resp.data.message);
            setShowSuccess(true);
        }).catch(error => {
            console.error('There was an error!', error);
            console.log(error.data.message);
            setPoruka(error.data.message);
            setShowSuccess(true);
        })

    }
    function onMakeVrata() {

        const postData = {
            TipProizvoda,
            Naziv,
            Cena,
            OpisProizvoda,
            Materijal,
            Primena,
            Koeficijent,
            DebljinaStakla,
            Komore,
            TipVrata,
            Dimenzije
        };

        console.log(file);
        const Data = new FormData();

        Data.append("objekat", JSON.stringify(postData));
        Data.append("Slika", file);

        for (var value of Data.values()) {
            console.log(value);
        }

        try {
            axios.post('https://localhost:5001/Prodavac/DodajProizvod',
                Data,
                {
                    headers: authHeader()
                }
            ).then(resp => {
                console.log(resp.data.message);
                setPoruka(resp.data.message);
                setShowSuccess(true);
            });
        } catch (ex) {
            console.log(ex);
        }
    }
    return (
        <>
            <PageHero title='Dodaj Proizvod' />
            <Wrapper className='page section section-center'>
                <Link to='/user/prodavac' className='btn'>
                    vrati se u nalog
                </Link>
                <div className='title'>
                    <br />
                    <h2>Dodaj proizvod</h2>
                    <div className='underline'></div>
                    <br />
                    <h4>Izaberite proizvod koji zelite da dodate</h4>
                    <br />
                </div>
                <div className="signUpForm__row">
                    <select className="btn " name='Proizvodi' onChange={e => handleProizvod(e)}>
                        <option value="none" selected disabled hidden>
                            Izaberite porizvod
                        </option>
                        <option value="Prozor">Prozor</option>
                        <option value="Vrata">Vrata</option>
                    </select>
                    <br></br>
                    <br></br>
                    <h2>{TipProizvoda}</h2>
                </div>
                {TipProizvoda && <form enctype='multipart/form-data' onSubmit={onMake}>
                    <section className="signUpForm" >
                        <div className="signUpForm__row">
                            <input type="text" value={Naziv} placeholder="Unesite naziv prozora" onChange={e => handleNaziv(e)} />
                            <label>Naziv</label>
                        </div>
                        <div className="signUpForm__row">
                            <input type="number" value={Cena} placeholder="Unesite cenu prozora" onChange={e => handleCena(e)} />
                            <label>Cena</label>
                        </div>
                        <div className="signUpForm__row">
                            <input type="text" value={OpisProizvoda} placeholder="Unesite opis prozora" onChange={e => handleOpisProizvoda(e)} />
                            <label>Opis Proizvoda</label>
                        </div>
                        <div className="signUpForm__row">
                            <input pattern="[0-9]{1,10}[x]{1}[0-9]{1,10}" type="text" className="dim" value={Dimenzije} placeholder="Unesite dimenzije prozora u cm (primer: 130x60) " onChange={e => handleDimenzije(e)} />
                            <label>Dimnenzije</label>
                        </div>
                        <div className="signUpForm__row">
                            <select className="btn kar" onChange={e => handleMaterijal(e)}>
                                <option value="none" selected disabled hidden>
                                    Izaberite materijal
                                </option>
                                {KarMaterijal.map(dropdown => {
                                    return <option value={dropdown}>
                                        {dropdown}</option>;
                                })
                                }
                            </select>
                            <label>Izaberite materijal</label>
                        </div>
                        {TipProizvoda === "Prozor" && <div className="signUpForm__row">
                            <select className="btn kar" onChange={e => handleSistemOtvaranja(e)}>
                                <option value="none" selected disabled hidden>
                                    Izaberite sistem otvaranja
                                </option>
                                {KarSistemOtvaranja.map(dropdown => {
                                    return <option value={dropdown}>
                                        {dropdown}</option>;
                                })
                                }
                            </select>
                            <label>Sistem Otvaranja</label>
                        </div>}
                        {TipProizvoda === "Vrata" && <div className="signUpForm__row">
                        <select className="btn kar" onChange={e => handlePrimena(e)}>
                                <option value="none" selected disabled hidden>
                                    Izaberite primenu
                                </option>
                                {KarPrimena.map(dropdown => {
                                    return <option value={dropdown}>
                                        {dropdown}</option>;
                                })
                                }
                            </select>
                            <label>Primena</label>
                        </div>}
                        <div className="signUpForm__row">
                            <input type="number" value={Koeficijent} placeholder="Unesite koeficijent prolaza toplote" onChange={e => handleKoeficijent(e)} />
                            <label>Koeficijent prolaza toplote</label>
                        </div>
                        {TipProizvoda === "Prozor" && <div className="signUpForm__row">
                            <select className="btn kar" onChange={e => handleStaklo(e)}>
                                <option value="none" selected disabled hidden>
                                    Unesite vrstu stakla
                                </option>
                                {KarStaklo.map(dropdown => {
                                    return <option value={dropdown}>
                                        {dropdown}</option>;
                                })
                                }
                            </select>
                            <label>Staklo</label>
                        </div>}
                        <div className="signUpForm__row">
                            <input type="number" value={DebljinaStakla} placeholder="Unesite debljinu stakla u mm" onChange={e => handleDebljinaStakla(e)} />
                            <label>Debljina Stakla</label>
                        </div>
                        <div className="signUpForm__row">
                            <input type="number" value={Komore} placeholder="Unesite broj komora" onChange={e => handleKomore(e)} />
                            <label>Broj Komora</label>
                        </div>
                        {TipProizvoda === "Prozor" && <div className="signUpForm__row">
                            <input type="number" value={Paneli} placeholder="Unesite broj panela" onChange={e => handlePaneli(e)} />
                            <label>Broj panela</label>
                        </div>}
                        {TipProizvoda === "Prozor" && <div className="signUpForm__row">
                            <select className="btn kar" onChange={e => handleMrezica(e)}>
                                <option value="none" selected disabled hidden>
                                    Izaberite da li prozor ima mrežu za komarce
                                </option>
                                <option value={true}>Ima</option>
                                <option value={false}>Nema</option>
                            </select>
                            <label>Mreža za komarce</label>
                        </div>}
                        {TipProizvoda === "Prozor" && <div className="signUpForm__row">
                            <select className="btn kar" onChange={e => handleRoletna(e)}>
                                <option value="none" selected disabled hidden>
                                    Izaberite da li prozor ima roletne
                                </option>
                                <option value={true}>Ima</option>
                                <option value={false}>Nema</option>
                            </select>
                            <label>Roletne</label>
                        </div>}
                        {TipProizvoda === "Prozor" && <div className="signUpForm__row">
                            <select className="btn kar" onChange={e => handleTipProzora(e)}>
                                <option value="none" selected disabled hidden>
                                    Unesite tip prozora
                                </option>
                                {KarTipProzora.map(dropdown => {
                                    return <option value={dropdown}>
                                        {dropdown}</option>;
                                })
                                }
                            </select>
                            <label>Tip Prozora</label>
                        </div>}
                        {TipProizvoda === "Vrata" && <div className="signUpForm__row">
                            <select className="btn kar" onChange={e => handleTipVrata(e)}>
                                <option value="none" selected disabled hidden>
                                    Unesite tip vrata
                                </option>
                                {KarTipVrata.map(dropdown => {
                                    return <option value={dropdown}>
                                        {dropdown}</option>;
                                })
                                }
                            </select>
                            <label>Tip Vrata</label>
                        </div>}

                        <div className="signUpForm__row">
                            <input
                                type="file"
                                onChange={saveFile}
                            />
                            <label>Slika</label>
                        </div>
                        <div className="signUpForm__bottom">
                            <button className="btn" type="submit" >
                                Dodaj </button>
                        </div>
                    </section>
                </form>}
                {showSuccess && <div className="successForm"><p>{poruka}</p>
                <Link to="/user/prodavac"><button className="btn" >ok</button></Link>
                </div>}
            </Wrapper >
        </>
    )
}

export default ProdavacDodajPage

const Wrapper = styled.section`
display: block;
place-items: center;
.dim{
 input{
     width: 50px;
 }
}
.kar{
width: 100%; 
background: white;
color: black ;
text-transform: none;
display: block;
width: 100%;
height: 45px;
padding: 5px 5px 5px 40px;
    
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
.signUpForm{
  font-size: 14px;
  margin-top: 40px;
}

.signUpForm__row{
  position: relative;
  width: 100%;
  margin-bottom: 25px;
  
 

  /* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

  label{
    position: absolute;
    left: 35px;
    top: -15px;
    background-color: var(--clr-primary-5)  ;
    color: #fff;
    padding: 3px 8px;
    border-radius: 3px;
    font-size: 12px;
    
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

  span{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .signUpForm__row__icon{
    left: 10px;
  }

  
}

.signUpForm__bottom{
  display: flex;

  

  >p{
    flex: 1;
    padding-right: 10px;
  }

  .btn{
    flex: none;
    width: 100px;
    height: 40px;
    
    color: #fff;
    border-radius: 4px;

    &:disabled{
      opacity: .5;
      cursor: not-allowed; 
    }
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
    .p{
        margin:30px
    }
    .btn{
        margin:30px
  }
  
`