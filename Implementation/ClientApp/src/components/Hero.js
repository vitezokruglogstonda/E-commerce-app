import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import covek2 from '../assets/covek_prozor2.jpg'
import covek from '../assets/covek_prozor.jpg'

const Hero = () => {
  return (
    <Wrapper className='section-center'>
      <article className='content'>
        <h1>
          WinScout <br />
          sve na jednom mestu
        </h1>
        <p>
          WinScout je jedna od najvećih online prodavnica koja Vam nudi katalog bezbrojnih prodavaca stolarije na jednom mestu. 
        </p>
        <Link to='/products/prozor' className='btn hero-btn'>
          prozori
        </Link>
        <Link to='/products/vrata' className='btn hero-btn'>
          vrata
        </Link>
      </article>
      <article className='img-container'>
        <img src={covek2} alt='window person' className='main-img' />
        <img src={covek} alt='person working' className='accent-img' />
      </article>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .btn{
    margin:30px;
  }
  min-height: 60vh;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 350px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }
    .img-container::before {
      content: '';
      position: absolute;
      width: 10%;
      height: 80%;
      background: var(--clr-primary-9);
      bottom: 0%;
      left: -8%;
      border-radius: var(--radius);
    }
  }
`

export default Hero
