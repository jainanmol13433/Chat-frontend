import React from 'react'
import styled from 'styled-components'
const Welcomes = ({user}) => {
  return (
    <UserWelcome>
     <div>
        {
        user.Username
        }
    </div>
    </UserWelcome>
  )
}
const UserWelcome=styled.div`
color:white;
display: flex;
align-items: center;
justify-content: center;
padding-top:30%;
font-size:30px;
`
export default Welcomes