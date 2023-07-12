import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import { useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom'
import { PhoneInTalkSharp } from '@material-ui/icons';

const ResetPage = () => {
  let { ID } = useParams();
  
  
  const [Password, setPassword] = useState("");
    const [Pin, setPin] = useState();

    const handlePassword = e => {
        const txt = e.target.value;
        setPassword(txt);
    };
    const handlePin = e => {
        const txt = e.target.value;
        setPin(txt);
    };

    function resetPass(e)
    {
        e.preventDefault();
        const PasswordRecoverZahtev = {
          ID:parseInt(ID),
          Pin:Pin,
          Password:Password
        }
        console.log(PasswordRecoverZahtev);
        try {
            const res = axios.post('https://localhost:5001/Nalog/ForgotPassword',
            PasswordRecoverZahtev).then(resp => {
                    console.log(resp.data.message);
                    window.location.href = "https://localhost:5001/";
                });
            console.log(res);
        } catch (ex) {
            console.log(ex);
        }
    }


    return (
        <main>
            <PageHero title='Restartuj sifru' />
            <Wrapper className='page section section-center'>

                <article>
                    <div className='title'>
                        <h2>Restartuj sifru</h2>
                        <div className='underline'></div>
                        <br></br>
                        <p>Unesite novu sifru i pin</p>
                    </div>
                    <form onSubmit={resetPass}>
                    <div className="form-group" >
                        <input className='form-control' type="password" value={Password} onChange={e => handlePassword(e)} />
                        <label>Nova sifra</label>
                    </div>
                    <div className="form-group" >
                        <input className='form-control' type="text" value={Pin} onChange={e => handlePin(e)} />
                        <label>Pin</label>
                        </div>
                        <button className="btn" disabled={Password === "" && Pin === "" } type="submit">
                            Posalji </button>
                    </form>
                </article>
            </Wrapper>
        </main>
    )
}

const Wrapper = styled.section`
display: grid;  
font-size: 23px;

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


.title {
text-align: left;
}
.underline {
margin-left: 0;
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
export default ResetPage
