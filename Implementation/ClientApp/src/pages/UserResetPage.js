import axios from "axios";
import styled from 'styled-components'
import React, { useState } from 'react';
import { PageHero } from '../components'
import { authHeader } from '../helpers';
import { authenticationService } from '../services';
import { Link } from 'react-router-dom'


const UserResetPage = props => {
    const [Stari, setStari] = useState("");
    const [Novi, setNovi] = useState("");
    const [Novi2, setNovi2] = useState("");
    const currentUser = authenticationService.currentUserValue;
    const [showSuccess, setShowSuccess] = useState(false);
    const [poruka, setPoruka] = useState("");


    const handleStari = e => {
        const txt = e.target.value;
        setStari(txt);
    };
    const handleNovi = e => {
        const txt = e.target.value;
        setNovi(txt);
    };

    const handleNovi2 = e => {
        const txt = e.target.value;
        setNovi2(txt);
    };

    function resetPassword(e) {
        e.preventDefault();

        if (Stari === '' || Novi === '' || Novi2 == '') {
            setPoruka("Unesite sva polja.");
            setShowSuccess(true);
            return;
        }
        if (Novi !== Novi2) {
            setPoruka("Potvrdite ispravno novu sifru.");
            setShowSuccess(true);
            return;
        }
        const postData = {
            Stari,
            Novi
        }

        console.log(postData);


        const res = axios.post('https://localhost:5001/Nalog/PasswordReset',
            postData, {
            headers: authHeader()
        }
        ).then(resp => {
            console.log(resp.data.message);
            setPoruka(resp.data.message);
            setShowSuccess(true);
        })
            .catch(error => {
                console.log(error.response.data.message);
                setPoruka(error.response.data.message);
                setShowSuccess(true);
            });

        console.log(res);


    }
    const handle = () => {
        if (poruka === "Pogresna sifra.") {
            setStari("");
            setNovi("");
            setNovi2("");
            setShowSuccess(false);
        }
        else if (poruka === "Potvrdite ispravno novu sifru.") {
            setNovi("");
            setNovi2("");
            setShowSuccess(false);
            return;
        }
        else if (poruka === "Unesite sva polja.") {
            setShowSuccess(false);
            return;
        }
        else {
            props.history.push(`/user/${currentUser.tipKorisnika}`)
        }
    }

    return (
        <>
            <PageHero title='Promeni sifru' />
            <Wrapper className='page section section-center'>
                <article>
                <Link to={`/user/${currentUser.tipKorisnika}`} className='btn'>
                    vrati se u nalog
                </Link>
                    <div className='title'>
                        <h2>Promeni šifru</h2>
                        <div className='underline'></div>
                        <br></br>
                    </div>
                    <form onSubmit={resetPassword}>
                        <section>
                            <div className="form-group" >
                                <label>Stara sifra</label>
                                <input className='form-control' type="password" value={Stari} onChange={e => handleStari(e)} />
                            </div>

                            <div className="form-group" >
                                <label>Nova sifra</label>
                                <input className='form-control' type="password" value={Novi} onChange={e => handleNovi(e)} />
                            </div>

                            <div className="form-group" >
                                <label>Ponovite novu sifru</label>
                                <input className='form-control' type="password" value={Novi2} onChange={e => handleNovi2(e)} />
                            </div>

                            <div className="signUpForm__bottom" >
                                <button className="btn" type="submit">
                                    Promeni sifru </button>
                            </div>
                        </section>
                    </form>
                </article>
                {showSuccess && <div className="successForm"><h2>{poruka}</h2>
                    <button className="btn" onClick={() => { handle(); }}>ok</button>
                </div>}
            </Wrapper>
        </>
    )
}

const Wrapper = styled.section` 
display: grid;  


.form-group {
position: relative;
max-width: 45em;
margin-top: 40px;
margin-bottom: 25px;
color: #ccc;

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
}
.form-control {
display: block;
width: 100%;
height: 45px;
padding: 5px 5px 5px 40px;
border: 1px solid #ccc;
border-radius: 3px;
}



.successForm{
    background-color: #fff;
    border-radius: 5px;
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 1px 1px 3px 1px rgba(0,0,0,.3);
    font-size: 20px;
    text-align: center;
    line-height: 40px;
    h2{
        margin: 50px;
    }
    .btn{
        margin-bottom:20px;
        font-size: 30px;
    }
  }
`

export default UserResetPage;