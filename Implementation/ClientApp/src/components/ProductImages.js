import React, { useState } from 'react'
import styled from 'styled-components'

const ProductImages = (props) => {
  return (
    <Wrapper>
    <img src={props.image} alt='slika' className='main' />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .main {
  }
  img {
    height: 600px;
    width: 100%;  
    display: block;
    object-fit: contain
    border-radius: var(--radius);
  }
  
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    
  }
  
`


export default ProductImages

/*@media (max-width: 576px) {
  .main {
    height: 300px;
  }
  .gallery {
    img {
      height: 50px;
    }
  }
}
}*/