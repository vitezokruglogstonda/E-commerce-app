import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { authenticationService } from '../services';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import React, { useState, useEffect } from 'react'
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { PageHero } from '../components'
const LoginPage = props => {

    useEffect(() => {
        if (authenticationService.currentUserValue) {
            props.history.push('/');
        }
    })

    const [ShowSuccess, setSuccess] = useState(false);

    const initialValues={
        Mail: '',
        Password: ''
    }

    return (
    <>
        <PageHero title='Prijavi se' />
        <Wrapper className='page section section-center'>
            <div className='title'>
                <h2>Prijavi se</h2>
                <div className='underline'></div>
            </div>
            <Formik
                
                initialValues={initialValues}
                onSubmit={({ Mail, Password }, { setStatus, setSubmitting }) => {
                    setStatus();
                    authenticationService.login(Mail, Password)
                        .then(
                            user => {
                                props.history.push('/user/');
                            },
                            error => {
                                setSuccess(true);
                                setSubmitting(true);
                                setStatus(error);
                                console.log(error);
                            }
                        );
                }}
            >{
                    ({ errors, status, touched, isSubmitting ,resetForm}) => (
                        <Form>
                            <section  >
                                <div className="form-group">
                                    <span className="signUpForm__row__icon">
                                        <FaEnvelope />
                                    </span>
                                    <label htmlFor="Mail">Mail</label>
                                    <Field name="Mail" type="text" className={'form-control' + (errors.Mail && touched.Mail ? ' is-invalid' : '')} />
                                    <ErrorMessage name="Mail" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <span className="signUpForm__row__icon">
                                        <FaLock />
                                    </span>
                                    <label htmlFor="Password">Password</label>
                                    <Field name="Password" type="password" className={'form-control' + (errors.Password && touched.Password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="Password" component="div" className="invalid-feedback" />
                                    <Link to='/user/forget'
                                        className="signUpForm__row__tip">Forget?
                                        </Link>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn" disabled={isSubmitting}>Login</button>
                                </div>
                                {ShowSuccess &&
                                    <div className="successForm" ><h2>{status}</h2>
                                        <button className="btn" onClick={() => {setSuccess(false);resetForm()}}>ok</button></div>
                                }
                            </section>
                        </Form>
                    )}
            </Formik>
            <Link to='/user/registration' className='btn'>
                Napravi nalog
                </Link>
        </Wrapper>
    </>
    );
}

export { LoginPage };

const Wrapper = styled.section`

display: grid;
gap: 2rem;
place-items: center;
font-size: 14px;

.form-group {
    position: relative;
    width: 100%;
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

    span{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    .signUpForm__row__icon{
        left: 10px;
    }

    .signUpForm__row__tip{
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        color: var(--clr-primary-5);
        background-color: transparent;
        border:none;
        border-left: 1px solid #ccc;
        padding: 5px 5px 5px 15px;
    }
    
  }

  .form-control {
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
    button{
        cursor: allowed;
    }
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