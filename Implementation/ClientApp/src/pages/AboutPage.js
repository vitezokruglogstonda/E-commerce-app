import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/slika.jpg'

const AboutPage = () => {
  return (
    <main>
      <PageHero title='O Nama' />
      <Wrapper className='page section section-center'>
        <img src={aboutImg} alt='nice desk' />
        <article>
          <div className='title'>
            <h2>O nama</h2>
            <div className='underline'></div>
          </div>
          <p>
          WinScout je inovativni Web portal čija je namena prezentovanje, kreiranje i održavanje sadržaja vezanih za prodaju građevinske stolarije. Karakteristični sadržaji kojima se ovi proizvodi prezentuju su osnovne odlike proizvoda iz ovog domena (prozora i vrata) u koje spadaju cene, materijali od kojih su proizvedeni okviri, tipovi proizvoda, dimenzije, i informacije o prodavcima, koji se oglašavaju i nude svoje proizvode preko portala, poput lokacije, kontakata, linkova ka njihovim zvaničnim sajtovima i mogućnost isporuke. Ako zelite da kupujete pametno i odgovorno, na pravom ste mestu. Osigurajte svoj dom i ujedno sacuvajte okolinu.
          </p>
        </article>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
