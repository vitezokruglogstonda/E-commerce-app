import React, { useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  SET_GRIDVIEW,
  SET_LISTVIEW,
} from '../actions'

const initialState = {
  grid_view:true
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
 
  const [state, dispatch] = useReducer(reducer, initialState);


 

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }

  return (
    <FilterContext.Provider value={{...state,setGridView,setListView}}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
