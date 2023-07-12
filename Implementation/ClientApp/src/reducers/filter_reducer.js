import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
} from '../actions'

const filter_reducer = (state, action) => {
  
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
