import React from 'react'
import styled from 'styled-components'

const Card = (props) => {

    
  return (
    <Wrapper >
        <div {...props}>
        {props.children}
        </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
text-align: left;
padding: 24px;
background: white;
border-radius: 8px;
`

export default Card
