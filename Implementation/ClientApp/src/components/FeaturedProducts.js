import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Product from './Product'
import axios from "axios";

const FeaturedProducts = () => {
  const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get(`https://localhost:5001/API/PopuniFeed/3`
        ).then(response => {
          console.log(response)
          console.log(response.data)
          setData(response.data)
        })
          .catch(error => {
            console.log(error);
            
          })
    }, [])
  
  return (
    <Wrapper className='section'>
      <div className='title'>
        <h2>Najbolji proizvodi</h2>
        <div className='underline'></div>
      </div>
      <div className='section-center featured'>
        {data.slice(0, 3).map((product) => {
          return <Product key={product.id} {...product} />
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`

export default FeaturedProducts
