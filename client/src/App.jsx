import React, { useState } from 'react'
import Login from './components/Login'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Profile from '../Pages/Profile'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
    <Navbar setShowLogin={setShowLogin}/>
    {showLogin && <Login setShowLogin={setShowLogin} />}
    <Routes> 
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    </>
  )
}

export default App