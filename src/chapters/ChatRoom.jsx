import React,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Friends from './Friends'
import Chat from './Chat'
import Welcomes from './Welcomes'
import {io} from 'socket.io-client'
const ChatRoom = () => {
  const socket=useRef()
  const navigate=useNavigate()
  const [friends,setfriends]=useState([])
  const [user,setuser]=useState(undefined)
  const [Currentchat,setCurrentchat]=useState(undefined)
  const [load,setload]=useState(false)
  useEffect(()=>{
    async function func(){
    if(!localStorage.getItem("user")){
      navigate('/login')
    }
    else{
      setuser(await JSON.parse(localStorage.getItem("user")))
      setload(true)
    }
  }
   func()
},[])
  
  useEffect(()=>{
    if(user){
      const proxy=process.env.PROXY;
      socket.current=io(`${proxy}`,{
        transports:['polling','websocket'],
      })
      socket.current.on("connect",()=>{
        socket.current.emit('useradd',user._id)
      })
    }
  },[user])

  useEffect(()=>{
    async function func(){
    if(user){
      const proxy=process.env.PROXY;
      const data=await axios.get(`${proxy}/allusers/${user._id}`)
      setfriends(data.data)
    }
  }
  func()
},[user])

const handlechat=(chat)=>{
  setCurrentchat(chat);
}
  return (
    <Container>
      <div className='FriendContainer'>
      <Friends friends={friends} user={user} chatChange={handlechat}/>
      </div>
      
      <div className='ChatContainer'>
          {load && Currentchat === undefined ?(
             <Welcomes user={user}/>
          ):(
            <Chat user={user} Currentchat={Currentchat} socket={socket}/>
          )
          }
      </div>
    </Container>
  )
}

const Container= styled.div`
padding-top:15px;
padding-bottom:15px;
font-family:monospace;
background-color:#000011;
width:100vw;
height:96vh;
display: flex;
justify-content: center; 
font-family:monospace;
.FriendContainer{
  float:auto;
  width:25vw;
  background-color:#22283a;
  margin-left:15px;
  margin-right:15px;
  overflow:auto;
  border-radius:5px;
}
.ChatContainer{
  width:75vw;
  float:auto;
  margin-right:15px;
}
`
export default ChatRoom
