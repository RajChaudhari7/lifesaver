import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    navigate('/');
  };

  const navLinkStyle = ({ isActive }) =>
    `relative px-3 py-2 transition-all duration-300 ${
      isActive ? 'text-primary font-semibold' : 'text-gray-600 hover:text-black'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <img
          src={assets.logo}
          onClick={() => navigate('/')}
          className="w-24 cursor-pointer"
          alt="logo"
        />

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-[15px]">
          <NavLink to="/" className={navLinkStyle}>Home</NavLink>
          <NavLink to="/doctors" className={navLinkStyle}>Doctors</NavLink>
          <NavLink to="/about" className={navLinkStyle}>About</NavLink>
          <NavLink to="/contact" className={navLinkStyle}>Contact</NavLink>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {token ? (
            <div
              className="relative flex items-center gap-2 cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <img
                src={userData?.image}
                className="w-9 h-9 rounded-full object-cover border"
                alt="profile"
              />
              <ChevronDown size={18} />

              {/* Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-14 w-52 bg-white rounded-xl shadow-lg border p-2 animate-fadeIn">
                  <p
                    onClick={() => navigate('/my-profile')}
                    className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate('/my-appointments')}
                    className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    Appointments
                  </p>
                  <hr className="my-2" />
                  <p
                    onClick={logout}
                    className="px-4 py-2 text-red-500 hover:bg-red-50 rounded cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="hidden md:block bg-primary text-white px-6 py-2.5 rounded-full shadow hover:shadow-md hover:scale-105 transition"
            >
              Get Started
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg p-6 transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <img src={assets.logo} className="w-24" alt="logo" />
            <X size={26} onClick={() => setOpen(false)} />
          </div>

          <nav className="flex flex-col gap-4 text-lg">
            <NavLink onClick={() => setOpen(false)} to="/">Home</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/doctors">Doctors</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/about">About</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/contact">Contact</NavLink>
          </nav>

          <div className="mt-8">
            {token ? (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="w-full bg-red-500 text-white py-3 rounded-full"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate('/login');
                  setOpen(false);
                }}
                className="w-full bg-primary text-white py-3 rounded-full"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;