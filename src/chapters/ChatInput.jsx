import React,{useState} from 'react'
import styled from 'styled-components'
import {Send} from '@styled-icons/material-rounded/Send'
const ChatInput = ({handleSendMessage}) => {
  const [msgs,setmsgs]=useState("")
  const sendMessage=(e)=>{
    e.preventDefault()
    if(msgs.length>0){
      handleSendMessage(msgs)
      setmsgs("")
    }
  }
  return (
    <Container>
   <form onSubmit={(e)=>sendMessage(e)}>
        <input type="text" placeholder='Send Message' value={msgs} onChange={(e)=>{
          setmsgs(e.target.value)
        }}/>
        <button type='submit'><Send style={{width:'35px',height:'35px'}}/></button>
      </form>
    </Container>
  )
}
const Container=styled.div`
form{
  padding-top:9px;
  display:flex;
  flex-direction:row;
}
input{
  width:66vw;
  height:35px;
  background:rgba(159, 229, 255, 0.482);
  font-size:20px;
}
button{
  margin-top:1px;
  margin-left:2px;
  width:6vw;
  height:40px;
  background:rgba(159, 229, 255);
}
`

export default ChatInput
