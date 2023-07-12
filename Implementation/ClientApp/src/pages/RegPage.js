
import React, { useState } from "react";
import styled from 'styled-components'
import { RegContext } from '../context/reg_context';
import { AccountType,RegForm } from '../components'
import { PageHero } from '../components'

const RegPage = () => {
    const [chonseType, setChonseType] = useState("");
    
    return (
        <>
        <PageHero title='Napravi nalog' />
        <RegContext.Provider value={{ chonseType, setChonseType }}>
            <Wrapper className='page section section-center'>
            
                <article>
                    <div className='title'>
                        <h2>Napravi nalog</h2>
                        <div className='underline'></div>
                        <br/>
                        <h4>izaberite koji tip naloga zelite da napravite</h4>
                        <br/>
                    </div>    
                </article>
                
                <AccountType />
                <h4>izabrali ste {chonseType}</h4>
                <RegForm/>
            </Wrapper>
        </RegContext.Provider>
        </>
    );
}

export default RegPage;

const Wrapper = styled.section`
    min-height: 40vh;
    display: block;
    place-items: center;
`