import React,{useEffect,useRef,useState} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {LogOut} from '@styled-icons/boxicons-regular/LogOut'
import {UserAstronaut} from '@styled-icons/fa-solid/UserAstronaut'
import ChatInput from './ChatInput'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'
const Chat = ({user,Currentchat,socket}) => {
  const scrollRef=useRef()
  const [message,setmessage]=useState([]);
  const [msgRecived,setmsgRecived]=useState(null)
  useEffect(()=>{
    if(Currentchat){
   const func=async()=>{
    const msg=await axios.post(`/getmessage`,{
      from:user._id,
      to:Currentchat._id,
    })
    setmessage(msg.data)
  }
  func()
}   
},[user,Currentchat])
  
  const navigate=useNavigate();
   const handleLogout=()=>{
   localStorage.clear();
   navigate('/login')
   }
   const handleSendMessage=async (msg)=>{
    await axios.post(`/messageadd`,{
      from:user._id,
      to:Currentchat._id,
      message:msg
    })

    socket.current.emit("send",{
      from:user._id,
      to:Currentchat._id,
      message:msg
    })
   
    const chatMessage=[...message]
    chatMessage.push({fromMe:true,Message:msg})
    setmessage(chatMessage)
   }

   useEffect(()=>{
    if(socket.current){
      socket.current.on('recieve',(msg)=>{
       setmsgRecived({fromMe:false,Message:msg})
      })
    }
   },[socket])

   useEffect(()=>{
     msgRecived && setmessage((prev)=>[...prev,msgRecived])
   },[msgRecived])

   useEffect(()=>{
    scrollRef.current?.scrollIntoView({ behaviour:"smooth"});
   },[message])
  return (
    Currentchat&&(
    <Container>
      <div className="chatheader">
        <div className="username">
        <h3><UserAstronaut style={{height:'30px'}}/>  {Currentchat.Username}</h3>
        </div>
        <div className="logout">
          <pre><span style={{textTransform:'uppercase',fontSize:'20px'}}>{user.Username}</span>   <LogOut style={{height:'30px'}} onClick={handleLogout}/></pre>
        </div>
      </div>
      <div className="chatMessages">
        {
          message.map((messages)=>{
            return(
                <div className='Content' ref={scrollRef} key={uuidv4()}>
                  {
                    messages.fromMe?
                    <div className='sender'>
                      <p>{messages.Message}</p></div>
                    : <div className='reciver'>  <p>{messages.Message}</p></div>
                  }
                </div>
            )
          })
        }
      </div>
     <ChatInput  handleSendMessage={handleSendMessage}/>
    </Container>
  )
)
}

const Container=styled.div`
padding-top:5px;
display:grid;
background-color:#000011;
 .username{
  font-family:Bahnschrift SemiBold;
  text-transform:uppercase;
  color:white;
 }
 .chatheader{
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5em;
 }
 .logout{
  font-family:Bahnschrift SemiBold;
  color:white;
  cursor:pointer;
 }
.chatMessages{
  display: flex;
  flex-direction:column;
  overflow:auto;  
  height:78vh;
  background:#1f202f;
  color:white;
  font-size:20px;
}
.sender{
  padding-right:20px;
  position: relative;
  float: right;
  p{
    background:#4bb7d8;
    padding:6px;
    padding-left:20px;
    padding-right:20px;
    border-radius:7px;
  }
}
.reciver{
  padding-left:20px;
  position: relative;
  float: left;
  p{
    background:#47588f;
    padding:6px;
    padding-left:20px;
    padding-right:20px;
    border-radius:7px;
  }
}
`
export default Chat
