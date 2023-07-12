import React, { useCallback, useContext } from "react";
import { RegContext } from '../context/reg_context';
import { AiFillCheckCircle } from "react-icons/ai";
import Prodavac from "../assets/store.png";
import Posetilac from "../assets/user.png";
import styled from 'styled-components'

const accountType = [
    {
        TipKorisnika: "Prodavac",
        img: Prodavac
    },
    {
        TipKorisnika: "Posetilac",
        img: Posetilac
    }
];

const AccountType = () => {

    const { chonseType, setChonseType } = useContext(RegContext);

    const chooseType = useCallback(
        TipKorisnika => {
            setChonseType(TipKorisnika);
        },
        [setChonseType]
    );

    const renderType = useCallback(() => {
        return accountType.map(type => {
            return (
                
                    <Type
                    
                        key={type.TipKorisnika}
                        info={type}
                        isActive={chonseType === type.TipKorisnika}
                        chooseType={chooseType}
                    />
               
            );
        });
    }, [chonseType, chooseType]);

    return (
    <Wrapper>
    <div className="accountTypee">{renderType()}</div>
    
    </Wrapper>
    );
};

const Type = ({ info, chooseType, isActive }) => {
    const activeStyle = isActive ? "accountType__cell-active" : "";

    return (
            <div
                className={`accountType__cell ${activeStyle}`}
                onClick={() => chooseType(info.TipKorisnika)}
            >
                <figure>
                    <img src={info.img} alt="Prodavac" />
                    <h4>{info.TipKorisnika}</h4>
                </figure>
                {isActive && (
                    <div className="checkIcon">
                        <AiFillCheckCircle  />
                    </div>
                )}
            </div>
    );
};


const Wrapper = styled.section`
.accountTypee{
    display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-bottom: 40px;
  }
  
  .accountType__cell{
    flex:none;
    width: 45%;
    text-align: center;
    border: 1px solid #ccc;
    cursor: pointer;
    border-radius: 4px;
    padding: 10px 15px;
    margin-bottom: 25px;
    position: relative;
    &:hover{
      border-color: var(--clr-primary-5); 
    }
  
    &.accountType__cell-active{
      border-color: var(--clr-primary-5); 
      
    }
  
      .checkIcon{
        position: absolute;
        bottom: -15px;
        right: -15px;
        width: 50px;
        height: 50px;
        line-height: 50px;
        border-radius: 50%;
        background-color: var(--clr-primary-5); 
        color: #fff;
  
        @media (max-width: 600px) {
          width: 40px;
          height: 40px;
          line-height: 40px;
        }
      }
  
    img{
      width: 50%;
    }
  
    figure{
      margin: 0;
    }
  
    figcaption{
      margin-top: 10px;
    }
  }
`
export default AccountType;