import { RegContext } from '../context/reg_context';
import React, { useState, useContext} from "react";
import { FaEnvelope, FaIgloo } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const RegForm = () => {
    const { chonseType } = useContext(RegContext);
    const [TipKorisnika, setTipKorisnika] = useState("");
    const [Mail, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Password2, setPassword2] = useState("");
    const [Ime, setIme] = useState("");
    const [Mesto, setMesto] = useState("");
    const [Adresa, setAdresa] = useState("");
    const [X, setX] = useState("");
    const [Y, setY] = useState("");
    const [Telefon, setTelefon] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [poruka, setPoruka] = useState("");
    const [file, setFile] = useState();



    const handleEmail = e => {
        const txt = e.target.value;
        setEmail(txt);
    };
    const handleTeleofon = e => {
        const txt = e.target.value;
        setTelefon(txt);
    };
    const handlePassword = e => {
        const txt = e.target.value;
        setPassword(txt);
    };
    const handlePassword2 = e => {
        const txt = e.target.value;
        setPassword2(txt);
    };
    const handleIme = e => {
        const txt = e.target.value;
        setIme(txt);
    };
    const handleMesto = e => {
        const txt = e.target.value;
        setMesto(txt);
    };
    const handleAdresa = e => {
        const txt = e.target.value;
        setAdresa(txt);
    };
    const handleX = e => {
        const txt = e.target.value;
        setX(txt);
    };
    const handleY = e => {
        const txt = e.target.value;
        setY(txt);
    };
    const handleLogin = () => {
        if (chonseType === "Prodavac") {
            if (Mail.trim() === "" ||
                Password.trim() === "" ||
                Password2.trim() === "" ||
                Ime.trim() === "" )
                {
                alert("Molim vas popunite obavezna polja");
                return ;
            }
        }
        else {
            if (Mail.trim() === "" ||
                Password.trim() === "" ||
                Password2.trim() === "" ||
                Ime.trim() === "") {
                alert("Molim vas popunite obavezna polja");
                return false;
            }
        }

        if(Password!==Password2)
        {
            alert("Molim vas unesite ispravno password");
            reset();
            return false;
        }

        const emailRegExp =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const emailValidation = emailRegExp.test(Mail);

        if (!emailValidation) {
            alert("Wrong Email");
            return false;
        }

        
        
        const conflict = Password.length<6 ? false : true;
        


        if (conflict) {
            alert("Password mora da sadrzi vise od 6 karaktera");
            reset();
            return false;
        } else {
            setShowSuccess(true);
        }

        return true;

    };

   
    function onMakeUser(e) {
        e.preventDefault();
        if(!handleLogin())
        {
            return;
        }
        setTipKorisnika(chonseType);
        const postData = {
            tipKorisnika:chonseType,
            Mail,
            Password,
            Ime
        };
        console.log(postData);
        const Data = new FormData();
        Data.append("objekat", JSON.stringify(postData));

        try {
            const res = axios.post('https://localhost:5001/Nalog/SignUp',
                Data).then(resp => {
                    console.log(resp.data.message);
                    setPoruka(resp.data.message);
                    reset();
                });
            console.log(res);
        } catch (ex) {
            console.log(ex);
            console.log(ex.data.message);
            setPoruka(ex.data.message);
            reset();
        }

    }
    function reset() {
        const txt = ""; 
        
        setPassword(txt);
        setPassword2(txt);
        setIme(txt);
        setMesto(txt);
        setAdresa(txt);
        setX(txt);
        setY(txt);
        setTelefon(txt);

    }


    const saveFile = (e) => {
        var fajl = e.target.files[0];
        var fajlIme = e.target.files[0].name;
        var exstenzija = fajlIme.substr(fajlIme.length - 3);

        var blob = fajl.slice(0, fajl.size, 'image');
        const newFile = new File([blob], 'name.'+exstenzija, { type: `image/${exstenzija}` });
        setFile(newFile);
        console.log(file);
    };


    function onMakeProdavac(e) {
        

        e.preventDefault();

        if(!handleLogin())
        {
            return;
        }
        setTipKorisnika(chonseType);
        console.log(chonseType);

        const postData = {
            tipKorisnika:chonseType,
            Mail,
            Password,
            Ime,
            Mesto,
            Adresa,
            X,
            Y,
            Telefon
        };
        

        console.log(file);
        const Data = new FormData();
      

        Data.append("objekat", JSON.stringify(postData));
        Data.append("Slika", file);

        for (var value of Data.values()) {
            console.log(value);
        }

        reset();

        try {
            const res = axios.post('https://localhost:5001/Nalog/SignUp',
                Data).then(resp => {
                    console.log(resp.data.message);
                    setPoruka(resp.data.message);
                });
            console.log(res);
        } catch (ex) {
            console.log(ex);
        }


    }

    return (
        <Wrapper>
            {chonseType === "Prodavac" && <form enctype='multipart/form-data' onSubmit={onMakeProdavac}>
                <section className="signUpForm" >
                    <div className="signUpForm__row">
                        <span className="signUpForm__row__icon">
                            <FaEnvelope />
                        </span>
                        <input placeholder="Obavezno polje" type="text" value={Mail} onChange={e => handleEmail(e)} />
                        <label>Email</label>
                    </div>
                    <div className="signUpForm__row">
                        <span className="signUpForm__row__icon">
                            <FaLock />
                        </span>
                        <input
                        placeholder="Obavezno polje"
                            type="password"
                            value={Password}
                            onChange={e => handlePassword(e)}
                        />
                        <label>Password</label>
                    </div>
                    <div className="signUpForm__row">
                        <span className="signUpForm__row__icon">
                            <FaLock />
                        </span>
                        <input
                        placeholder="Obavezno polje"
                            type="password"
                            value={Password2}
                            onChange={e => handlePassword2(e)}
                        />
                        <label>Ponovite password</label>
                    </div>
                    <div className="signUpForm__row">
                        <input
                        placeholder="Obavezno polje"
                            type="text"
                            value={Ime}
                            onChange={e => handleIme(e)}
                        />
                        <label>Ime</label>
                    </div>
                    <div className="signUpForm__row">
                        <input
                            type="number"
                            value={Telefon}
                            onChange={e => handleTeleofon(e)}
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
                    <div className="signUpForm__bottom">
                        <button className="btn" disabled={chonseType === ""} type="submit" >
                            Signup </button>
                    </div>
                </section>
            </form>}

            {chonseType === "Posetilac" && <form onSubmit={onMakeUser}>
                <section className="signUpForm" >
                    <div className="signUpForm__row">
                        <span className="signUpForm__row__icon">
                            <FaEnvelope />
                        </span>
                        <input placeholder="Obavezno polje" type="text" value={Mail} onChange={e => handleEmail(e)} />
                        <label>Email</label>
                    </div>

                    <div className="signUpForm__row">
                        <span className="signUpForm__row__icon">
                            <FaLock />
                        </span>
                        <input
                        placeholder="Obavezno polje"
                            type="password"
                            value={Password}
                            onChange={e => handlePassword(e)} />
                        <label>Password</label>
                    </div>
                    <div className="signUpForm__row">
                        <span className="signUpForm__row__icon">
                            <FaLock />
                        </span>
                        <input
                        placeholder="Obavezno polje"
                            type="password"
                            value={Password2}
                            onChange={e => handlePassword2(e)}
                        />
                        <label>Ponovite password</label>
                    </div>
                    <div className="signUpForm__row">
                        <input
                        placeholder="Obavezno polje"
                            type="text"
                            value={Ime}
                            onChange={e => handleIme(e)}
                        />
                        <label>Ime</label>
                    </div>
                    <div className="signUpForm__bottom">
                        <button className="btn" disabled={chonseType === ""} type="submit" >
                            Singup  </button>
                    </div>
                </section>
            </form>}
            { showSuccess && <div className="successForm"><p>{poruka}</p>
                <Link to='/user/login'><button className="btn" onClick={() => setShowSuccess(false)}>ok</button></Link>
            </div>}
        </Wrapper >

    );
}

const Wrapper = styled.section`

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
export default RegForm;

