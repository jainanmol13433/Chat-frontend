import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
const Login = () => {
  const navigate=useNavigate()
  const [keys,setkeys]=useState({
    Username:'',
    Password:''
  })
  const handleChange=(e)=>{
    setkeys({...keys,[e.target.name]: e.target.value})
  }
  const handleSubmit=async (e)=>{
    e.preventDefault()
    if(validation()){
      const {Username,Password}=keys;
      const {data}=await axios.post(`https://chatset.onrender.com/login`,{
        Username,
        Password
      })
      if(data.status===false){
        toast.error(JSON.stringify(data.msg))
      }
      if(data.status===true){
        await localStorage.setItem("user",JSON.stringify(data.person))
        navigate("/chatroom")
      }
    }
  }
  const validation=()=>{
    const {Username,Password}=keys;
    if(Username.length<5){
      toast.error("username should be atleat 5 letter long",{position: toast.POSITION.TOP_RIGHT})
      return false;
    }
    else if(Password.length<7){
      toast.error("password should be atleat 7 letter long",{position: toast.POSITION.TOP_RIGHT})
      return false;
    }
    return true;
    }
  return (
    <>
    <Container>
      <form onSubmit={handleSubmit}>
     <h2>Login</h2>
     <input type="text"
      placeholder='Username'
      name='Username'
      onChange={e=>handleChange(e)} />

      <input type="password"
      placeholder='Password'
      name='Password'
      onChange={e=>handleChange(e)} />

      <button type='submit' style={{background:'#f34525'}}>Login</button>
    <span>Don't have an account? <Link to={'/register'}>Register</Link></span>
      </form>
      <ToastContainer/>
    </Container>
    </>
  )
}

const Container= styled.div`
font-family:monospace;
background-color:#000011;
width:100vw;
height:100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center; 
gap:1rem;
font-size:20px;

form {
  width:30vw;
  height:50vh;
  display: flex;
  flex-direction: column;
  gap:1.5rem;
  padding:30px;
  background-color:#00669d;
  border-radius:15px;
}
input,button{
  border:none;
  height:35px;
  font-size:20px;
  background:#12293d;
  color:white;
  border-radius:5px;
}
`

export default Login
