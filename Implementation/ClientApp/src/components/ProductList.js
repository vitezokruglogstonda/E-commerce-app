import React,{useContext } from 'react'
import { useFilterContext } from '../context/filter_context'
import { ProizvodiContext } from '../context/reg_context';
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const {grid_view} = useFilterContext();
  const {products} = useContext(ProizvodiContext);

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Nema proizvoda...
      </h5>
    )
  }
  if (grid_view === false) {
    return <ListView products={products} />
  }
  return <GridView products ={products }>Lista proizvoda</GridView>
}

export default ProductList
