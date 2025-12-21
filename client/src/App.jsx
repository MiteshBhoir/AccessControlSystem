import React, { useState } from 'react'
import Login from './components/Login'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom' 
import Profile from './Pages/Profile'
import Home from './Pages/Home'
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext'
const App = () => {
  const {showLogin,setShowLogin}= useAuth();
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <Navbar setShowLogin={setShowLogin}/>
    {showLogin && <Login setShowLogin={setShowLogin} />}
    <Routes> 
      <Route path='/' element={<Home/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    </>
  )
}

export default App