import { authenticationService } from '../services';
import { PageHero } from '../components'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { authHeader } from '../helpers';
import styled from 'styled-components'
import { Link,Redirect } from 'react-router-dom'
const ChangeAccountInfoPage = () => {
    const currentUser = authenticationService.currentUserValue;
    //korisnik
    const [Ime, setIme] = useState(currentUser.ime);
    const handleIme = e => {
        const txt = e.target.value;
        setIme(txt);
    };
    //prodavac

    const [Mesto, setMesto] = useState("");
    const handleMesto = e => {
        const txt = e.target.value;
        setMesto(txt);
    };
    const [Adresa, setAdresa] = useState("");
    const handleAdresa = e => {
        const txt = e.target.value;
        setAdresa(txt);
    };
    const [X, setX] = useState("");
    const handleX = e => {
        const txt = e.target.value;
        setX(txt);
    };
    const [Y, setY] = useState("");
    const handleY = e => {
        const txt = e.target.value;
        setY(txt);
    };
    const [Telefon, setTelefon] = useState("");
    const handleTelefon = e => {
        const txt = e.target.value;
        setTelefon(txt);
    };

    const [file, setFile] = useState();
    const saveFile = (e) => {
        var fajl = e.target.files[0];
        var fajlIme = e.target.files[0].name;
        var exstenzija = fajlIme.substr(fajlIme.length - 3);

        var blob = fajl.slice(0, fajl.size, 'image');
        const newFile = new File([blob], 'name.' + exstenzija, { type: `image/${exstenzija}` });
        setFile(newFile);
        console.log(file);
    };


    const [showSuccess, setShowSuccess] = useState(false);
    const [poruka, setPoruka] = useState("");


    useEffect(() => {
        if (currentUser.tipKorisnika === "Prodavac") {
            const fetchData = async () => {
                axios.get(`https://localhost:5001/Prodavac/PreuzmiProdavca/`,
                    {
                        headers: authHeader()
                    }
                ).then(response => {
                    console.log(response)
                    console.log(response.data.message)

                    setMesto(response.data.mesto);
                    setAdresa(response.data.adresa);
                    setX(response.data.lokacija.x);
                    setY(response.data.lokacija.y);
                    setTelefon(response.data.telefon);

                })
                    .catch(error => {
                        console.log(error.response.data.message);
                    });
            }
            fetchData();
        }
    }, [])
    
    function izmeni(e) {
        e.preventDefault();

        currentUser['ime'] = Ime;

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        const postData = {
            Ime,
            Mesto,
            Adresa,
            X,
            Y,
            Telefon
        };

        console.log(postData);
        console.log(file);
        const Data = new FormData();


        Data.append("objekat", JSON.stringify(postData));
        Data.append("Slika", file);

        for (var value of Data.values()) {
            console.log(value);
        }

        try {
            const res = axios.post('https://localhost:5001/Nalog/ChangeAccountInfo',
                Data, {
                headers: authHeader()
            }).then(resp => {
                console.log(resp.data.message);
                setPoruka("Usepesno ste izemnili podatke");
                setShowSuccess(true);
            })
                .catch(error => {
                    setPoruka(error.response.data.message);
                    setShowSuccess(true);
                    console.log(error.response.data.message);
                });
            console.log(res);
        } catch (ex) {
            console.log(ex);
        }
    }
    return (<>
        <PageHero title='Izmeni podatke' />
        <Wrapper className='page section section-center'>
            <article>
                <Link to={`/user/${currentUser.tipKorisnika}`} className='btn'>
                    vrati se u nalog
                </Link>
                <div className='title'>
                    <h2>Izmenite podatke</h2>
                    <div className='underline'></div>
                    <br></br>
                </div>
                <form enctype='multipart/form-data' onSubmit={izmeni}>
                    <section className="signUpForm" >
                        <div className="signUpForm__row">
                            <input
                                type="text"
                                value={Ime}
                                onChange={e => handleIme(e)}
                            />
                            <label>Ime</label>
                        </div>
                        {currentUser.tipKorisnika === "Prodavac" &&
                            <div>

                                <div className="signUpForm__row">
                                    <input
                                        type="number"
                                        value={Telefon}
                                        onChange={e => handleTelefon(e)}
                                    />
                                    <label>Telefon</label>
                                </div>
                                <div className="signUpForm__row">
                                    <input
                                        type="text"
                                        value={Mesto}
                                        onChange={e => handleMesto(e)}
                                    />
                                    <label>Mesto</label>
                                </div>
                                <div className="signUpForm__row">
                                    <input
                                        type="text"
                                        value={Adresa}
                                        onChange={e => handleAdresa(e)}
                                    />
                                    <label>Adresa</label>
                                </div>
                                <div className="signUpForm__row">
                                    <input
                                        step="any"
                                        type="number"
                                        value={X}
                                        onChange={e => handleX(e)}
                                    />
                                    <label>X Koordinata lokacije</label>
                                </div>
                                <div className="signUpForm__row">
                                    <input
                                        step="any"
                                        type="number"
                                        value={Y}
                                        onChange={e => handleY(e)}
                                    />
                                    <label>Y Koordinata lokacije</label>
                                </div>
                                <div className="signUpForm__row">
                                    <input
                                        type="file"
                                        onChange={saveFile}
                                    />
                                    <label>Slika</label>
                                </div>
                            </div>}
                        <div className="signUpForm__bottom">
                            <button className="btn" type="submit" >
                                Izmeni </button>
                        </div>
                    </section>
                </form>
                {showSuccess && <div className="successForm"><p>{poruka}</p>
                <Link to={`/user/${currentUser.tipKorisnika}`}><button className="btn" >ok</button></Link>
                </div>}
            </article>
        </Wrapper>
    </>
    );
}

export default ChangeAccountInfoPage;

const Wrapper = styled.section`
display: grid;


.signUpForm{
  font-size: 14px;
  margin-top: 40px;
}

.signUpForm__row{
  position: relative;
  width: 100%;
  margin-bottom: 40px;
  color: #ccc;

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
}
`