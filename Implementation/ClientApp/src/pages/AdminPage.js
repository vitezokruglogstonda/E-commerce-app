import React, { useState, useEffect } from 'react';
import { PageHero,AdminNeodobreni,AdminOdobreni,AdminNeodobreniKomentari ,AdminProdavciPosetioci} from '../components'
import styled from 'styled-components'


const AdminPage = () => {

    
    return (
        <Wrapper>
            <PageHero title="Admin" />
            <div className='section section-center'>
                <div className='product-center'>
                    <section className='content'>
                        <div className='title'>
                            <h2>Admin</h2>
                            <div className='underline'></div>
                        </div>
                    </section>
                    <div className="proizvodi">
                        <div className='title naslov'>
                            <h2>Nalozi</h2>
                            <div className='underline naslov'></div>
                            <AdminProdavciPosetioci/>
                            <br></br>
                            <h2>Odobreni proizvodi</h2>
                            <div className='underline naslov'></div>
                            <AdminOdobreni/>
                            <br></br>
                            <h2>Neodobreni proizvodi</h2>
                            <div className='underline naslov'></div>
                            <AdminNeodobreni/>
                            <br></br>
                            <h2>Neodobreni komentari</h2>
                            <div className='underline naslov'></div>
                            <AdminNeodobreniKomentari/>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}
export default AdminPage;
const Wrapper = styled.main`
 .size{
font-size:20px  
}
.proizvodi{
 margin-top: 4rem;
}
.product-center {

 gap: 4rem;
  }
.price {
color: var(--clr-primary-5);
}
.btn{
margin:5px
}
.desc {
line-height: 2;
max-width: 45em;
}
.info {
text - transform: capitalize;
 width: 300px;
display: grid;
grid-template-columns: 125px 1fr;
span {
 font - weight: 700;
}
}

.naslov {
    margin-left: 0;
    text-align: left;
    margin-top: 2rem;
    margin-bottom:3rem;
}


@media (min-width: 992px) {
.product-center {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    }
    .price {
    font-size: 1.25rem;
    }
  }
 `