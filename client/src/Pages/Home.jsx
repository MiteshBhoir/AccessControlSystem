import React from 'react';
import { useAuth } from '../context/AuthContext';
const Home = () => {
  const {setShowLogin,setState} = useAuth()
  return (
    <div className="relative bg-linear-to-b from-blue-100 to-indigo-600 text-gray-900 md:min-h-screen h-full  flex flex-col  md:items-center justify-start md:justify-center px-4 py-20 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Access Control System</h1>
      <h3 className="text-2xl md:text-3xl font-semibold mb-4">Securely Manage Your Profile</h3>
      <p className="text-lg md:text-xl mb-6">
        Log in to view your profile. <br />
        New here? <span className="font-semibold underline cursor-pointer" onClick={()=>{setState("register");setShowLogin(true)}}>Register now</span> to get started.
      </p>
    </div>
  );
}

export default Home;
