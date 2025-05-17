import React from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import {ToastContainer} from 'react-toastify'
import OTP from './pages/OTP/OTP'


const App = () => {
  return (
    <>
   <ToastContainer
  position="top-center"
  autoClose={1000}
  
/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/:id" element={<Home />} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/reset' element={<OTP/>} />
    </Routes>
    
    
    </>
  )
}

export default App
