import React from 'react'


const userContext = React.createContext({
  currentUser:null,
  isAdmin:false,
  isProdavac:false,
  isPosetilac:false
})

export { userContext };
