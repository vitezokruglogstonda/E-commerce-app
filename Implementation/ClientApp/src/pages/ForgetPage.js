import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import { useState } from "react";
import axios from "axios";

const ForgetPage = props => {
    const [Mail, setEmail] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [poruka, setPoruka] = useState("");

    const handleEmail = e => {
        const txt = e.target.value;
        setEmail(txt);
    };

    function posaljiMejl(e) {
        e.preventDefault();
        const data = new String(Mail);
        console.log(data);
        try {
            const res = axios.post('https://localhost:5001/Nalog/ForgotPasswordRequest',
                data).then(resp => {
                    console.log(resp.data.message);
                    setPoruka(resp.data.message);
                    setShowSuccess(true);
                })
                .catch(error => {
                    console.log(error.response.data.message);
                    setPoruka(error.response.data.message);
                    setShowSuccess(true);
                });;
            console.log(res);
        } catch (ex) {
            console.log(ex);
        }
    }

    const handle = () => {
        setEmail("");
        setShowSuccess(false);
        props.history.push(`/user/login`)
    }

    return (
        <main>
            <PageHero title='Zaboravili ste šifru' />
            <Wrapper className='page section section-center'>
                <article>
                    <div className='title'>
                        <h2>Zaboravili ste šifru</h2>
                        <div className='underline'></div>
                        <br></br>
                        <p>Unesite vašu email adresu</p>
                    </div>
                    <form onSubmit={posaljiMejl}>
                        <section>
                            <div className="form-group" >
                                <input className='form-control' type="text" value={Mail} onChange={e => handleEmail(e)} />
                                <label>Email</label>
                            </div>
                            <div className="form-group" >
                                <button className="btn" disabled={Mail === ""} type="submit">
                                    Posalji </button>
                            </div>
                        </section>
                    </form>
                </article>
                {showSuccess && <div className="successForm"><h2>{poruka}</h2>
                    <button className="btn" onClick={() => {handle();}}>ok</button>
                </div>}
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
export default ForgetPage
