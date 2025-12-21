import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
const Navbar = ({ setShowLogin }) => {
  const { open, setOpen, menuRef, navigate, token, handleLogout } = useAuth(); 
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-300 shadow-sm relative z-50">
      <div className="flex justify-between items-center px-4 md:px-16 py-4">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold px-10">
          ACS
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-4 md:gap-8">
          <button
            onClick={() => navigate('/profile')}
            className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full hover:bg-gray-100 transition"
          >
            View Profile
          </button>

          {token ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full transition"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden focus:outline-none z-110"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/10 bg-opacity-20 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Mobile Menu Sliding Panel */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out py-15
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col gap-2 px-4 py-8">
          <button
            onClick={() => {
              navigate('/profile');
              setOpen(false);
            }}
            className="w-full text-center font-bold px-4 py-3  hover:bg-gray-100 transition  rounded bg-blue-100 "
          >
            View Profile
          </button>

          {token ? (
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setShowLogin(true);
                setOpen(false);
              }}
              className="w-full px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
