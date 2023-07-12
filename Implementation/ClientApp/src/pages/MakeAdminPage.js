import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import { useState } from "react";
import axios from "axios";

const MakeAdminPage = props => {

    const [kod, setKod] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [poruka, setPoruka] = useState("");

    const handleKod = e => {
        const txt = e.target.value;
        setKod(txt);
    };

    function makeAdmin(e) {
        e.preventDefault();
        const data = new String(kod);

        console.log(data);

        const res = axios.post('https://localhost:5001/Nalog/KreirajAdministratora',
            data).then(resp => {
                console.log(resp.data.message);
            }).catch(error => {
                console.log(error.response.data.message);
                setPoruka(error.response.data.message);
                setShowSuccess(true);
            });
        console.log(res);

    }
    const handle = () => {
        setKod("");
        setShowSuccess(false);
        if(poruka==='Jedan administrator vec postoji.' || poruka==='Otvoren je Admin nalog.')
        {
            props.history.push(`/user/login`);
        }
    }

    return (
        <>
            <PageHero title='Napravi Admina' />

            <Wrapper className='page section section-center'>
                <article>
                    <div className='title'>
                        <h2>Napravi Admina</h2>
                        <div className='underline'></div>
                        <br></br>
                    </div>
                    <form onSubmit={makeAdmin}>
                        <section>
                            <h4>Unesite aktivacioni kod</h4>
                            <div className="form-group" >
                                <label>Kod</label>
                                <input className='form-control' type="text" value={kod} onChange={e => handleKod(e)} />
                            </div>
                            <div className="form-group">

                                <button className="btn" disabled={kod === ""} type="submit">
                                    Napravi admina</button>
                            </div>
                        </section >
                    </form>
                </article>
                {showSuccess && <div className="successForm"><h2>{poruka}</h2>
                    <button className="btn" onClick={() => {handle();}}>ok</button>
                </div>}
            </Wrapper>
        </>
    )
}

const Wrapper = styled.section`
    display: grid;  
    font-size: 14px;

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
export default MakeAdminPage
