import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ChatScreen from './Screens/ChatScreen/ChatScreen'

/* 
  Cada contacto tiene una mensajeria individual
*/

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ChatScreen/>}/>
        <Route path='/chat' element={<ChatScreen/>}/>
        <Route path='/chat/:chat_id' element={<ChatScreen/>}/>

      </Routes>
    </div>
  )
}

export default App
