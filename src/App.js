import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './chapters/Home'
import Login from './chapters/Login'
import Register from './chapters/Register'
import ChatRoom from './chapters/ChatRoom'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
<Route path='/' element={<Home />} />    
<Route path='/register' element={<Register/>}/>
<Route path='/login' element={<Login/>} />
<Route path='/chatroom' element={<ChatRoom/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App