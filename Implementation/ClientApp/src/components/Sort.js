import React,{ useCallback, useContext } from 'react'
import { ProizvodiContext } from '../context/reg_context';
import { useFilterContext } from '../context/filter_context'

import { BsFillGridFill, BsList } from 'react-icons/bs'
import styled from 'styled-components'
const Sort = () => {
  const {
    grid_view,
    setGridView,
    setListView
  } = useFilterContext()

  const {products,sortOrder, setsortOrder,setpageSize,pageSize} = useContext(ProizvodiContext);
  const updateSort= e =>{
    const txt = e.target.value;
    setsortOrder(txt);
  }
  const updatePageSize= e =>{
    const txt = e.target.value;
    setpageSize(txt);
  }

  return (
    <Wrapper>
      <div className='btn-container'>
        <button
          type='button'
          className={`${grid_view ? 'active' : null}`}
          onClick={setGridView}
        >
          <BsFillGridFill />
        </button>
        <button
          type='button'
          className={`${!grid_view ? 'active' : null}`}
          onClick={setListView}
        >
          <BsList />
        </button>
      </div>
      <p>{products.length} proizvoda nadjeno</p>
      
      <form>
        <label htmlFor='sort'>sortiraj po</label>
        <select
          name='sort'
          id='sort'
          className='sort-input'
          value={sortOrder}
          onChange={e => updateSort(e)}
        >
          <option value='Rastuce'>Rastuce</option>
          <option value='Opadajuce'>Opadajuce</option>
        </select>
      </form>

      <form>
        <label htmlFor='sort'>broj proizvoda</label>
        <select
          name='sort'
          id='sort'
          className='sort-input'
          value={pageSize}
          onChange={e => updatePageSize(e)}
        >
          <option value={2}>2</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`

export default Sort
