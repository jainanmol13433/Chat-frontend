import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
const Friends = ({friends,user,chatChange}) => {
    const [User,setUser]=useState(undefined)
    const [Selected,setSelected]=useState(undefined)
    useEffect(()=>{
      if(user){
        setUser(user.Username)
      }
    },[user])
    const changeChat=(index,friends)=>{
        setSelected(index)
        chatChange(friends)
    }
  return (
    User&&
    <FriendsContainer>
{
    friends.map((friend,index)=>{
        return (
            <div className={`contact ${index===Selected ? 'selected':''}`} key={index} onClick={()=>changeChat(index,friend)}>
              {friend.Username}
            </div>
        )
    })
}
    </FriendsContainer>
  )
}
const FriendsContainer=styled.div`
        display: grid;
        align-items: center;
        justify-content: center;
        padding-top:20px;
        gap:10%;
    .contact{
        display: flex;
        flex-direction:row;
        align-items: center;
        justify-content: center;
        width:22vw;
        height:9vh;
        border-radius:9px;
        background:#304072;
        color:white;
        font-size:20px;
        cursor:pointer;
       }
       .selected{
        background:#6a65ed;
    }
`
export default Friends