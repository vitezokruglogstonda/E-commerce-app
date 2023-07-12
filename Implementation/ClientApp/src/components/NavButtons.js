import React from 'react'
import { FaUsers, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useProductsContext } from '../context/products_context'
import {userContext} from '../context/user_context'

const NavButtons = () => {
  const { closeSidebar } = useProductsContext();

  return (
    <userContext.Consumer>
      
      { ({currentUser,logoutUser})=>{
        return (
      <Wrapper className='nav-btn-wrapper'>
      {!currentUser && 
      <Link to='/user/login' onClick={closeSidebar}>
        <button type='button' className='login-btn'>
          Login <FaUserPlus />
        </button>
      </Link>} 
      {!currentUser && <Link to='/user/registration' onClick={closeSidebar}>
      <button type='button' className='login-btn'>
        SignUp  <FaUsers />
      </button>
    </Link>
      } 
      {currentUser && 
      <Link onClick={closeSidebar} >
        <button type='button' className='login-btn' onClick={logoutUser}>
          Logout <FaUserMinus />
        </button>
      </Link>
      } 
      </Wrapper>
        );
      }}
      </userContext.Consumer>
    )
}
 
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .login-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    margin-right:20px;
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`
export default NavButtons;
