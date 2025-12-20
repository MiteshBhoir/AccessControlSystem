import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Navbar = ({setShowLogin}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link to="/" className="text-3xl font-bold">
        ACS
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <button onClick={()=>navigate('/profile')}>View Profile</button>
        </div>

        <button onClick={()=>setShowLogin(true)} className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
          Login
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        aria-expanded={open}
        className="sm:hidden"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm sm:hidden`}
      >
        <button
          onClick={() => setOpen(false)}
          className="px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
        >
          Login
        </button>
      </div>

    </nav>
  )
}

export default Navbar
