import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import ReactStars from 'react-stars';
const ListView = ({products}) => {
  return (
    <Wrapper>
      {products.map((product) => {
        const { id, naziv, cena, opisProizvoda ,tipProizvoda,slika,ocenaDisplay} = product
        return (
          <article key={id}>
            <img src={`https://localhost:5001/Slike/Proizvod/${tipProizvoda}/${slika}`} alt={naziv} />
            <div>
            <h4>{naziv}</h4>
              <ReactStars
                value={ocenaDisplay}
                count={5}
                edit= {false}
                size ={ 30}/>
              <h5 className='price'>{cena} RSD</h5>
              <p>{opisProizvoda.substring(0, 150)}...</p>
              <Link to={`/products/${tipProizvoda}/${id}`} className='btn'>
                Detalji
              </Link>
            </div>
          </article>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;
  width: 100%;
  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`

export default ListView
