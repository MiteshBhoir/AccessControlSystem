import Login from './components/Login'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom' 
import Profile from './Pages/Profile'
import Home from './Pages/Home'
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AuthContext'
const App = () => {
  const {showLogin}= useAppContext();
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <Navbar />
    {showLogin && <Login/>}
    <Routes> 
      <Route path='/' element={<Home/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    </>
  )
}

export default App