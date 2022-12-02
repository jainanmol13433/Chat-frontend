import React from 'react'
import img from './img/chatImage.jpg'
import styled from 'styled-components'
const Home = () => {
  return (
    <Container>
   <div className='atcenter'>
      <a href="/login"><button>Login</button></a>
      <a href="/register"><button>Register</button></a>
      <a href="/chatroom"><button>ChatRoom</button></a> 
    </div>
    </Container>
  )
}
const Container=styled.div`
object-fit: fill;
background-position: center;
background:url(${img});
width:100vw;
height:100vh;
background-size: cover;
display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;

.atcenter{
  width:350px;
  height:350px;
  background:rgba(154, 233, 225, 0.67);
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  border:none;
  border-radius:5px;
}
a{
  padding:10px;
}
button{
  border:none;
  background:rgba(94, 147, 204, 0.927);
  width:250px;
  height:35px;
}
`
export default Home