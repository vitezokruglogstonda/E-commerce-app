import React, { useState, useEffect } from 'react';
import { PageHero} from '../components'
import styled from 'styled-components'
import { ListViewSearch } from '../components'
import { useParams } from 'react-router-dom'
import axios from "axios";

const SearchPage = () => {
    const { search } = useParams()
    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get(`https://localhost:5001/API/Search/${search}`
        ).then(response => {
          console.log(response)
          console.log(response.data)
          setData(response.data)
        })
          .catch(error => {
            console.log(error);
            window.location.href = "https://localhost:5001/error";
          })
    }, [])

    return (
        <Wrapper>
            <PageHero title="Search" />
            <div className='section section-center'>
                <div className='product-center'>
                    <section className='content'>
                        <div className='title'>
                            <h2>Search</h2>
                            <div className='underline'></div>
                        </div>
                    </section>
                    <div className="proizvodi">
                        <div className='title naslov'>
                            <h2>Rezultati za : {search}</h2>
                            <br></br>
                            <hr></hr>
                            <br></br>
                            {(data.length<1) && <h5 style={{ textTransform: 'none' }}>
                            Nista nije nadjeno
                            </h5>}
                            
                            <ListViewSearch products={data} />
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}
export default SearchPage;
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