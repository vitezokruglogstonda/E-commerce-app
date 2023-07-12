import React from 'react'
import styled from 'styled-components'
import { FeaturedProducts, Hero, Services } from '../components'
const HomePage = () => {
  return (
    <main>
      <Wrapper>
      <Hero />
      <FeaturedProducts />
      <Services />
      <div className="klasa">
      </div>
      </Wrapper>
    </main>
  )
}

export default HomePage

const Wrapper = styled.main`
.klasa{
  height: 100px;
}
 `