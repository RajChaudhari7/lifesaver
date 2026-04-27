import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { Menu, X, ChevronDown, User, Calendar, LogOut } from 'lucide-react';
import gsap from 'gsap';

const Navbar = () => {
    const navigate = useNavigate();
    const { token, setToken, userData } = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    
    // GSAP Ref
    const navRef = useRef(null);

    useEffect(() => {
        // Staggered entrance animation for navbar items
        let ctx = gsap.context(() => {
            gsap.from(".nav-animate", {
                y: -20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out"
            });
        }, navRef);

        return () => ctx.revert();
    }, []);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
        navigate('/');
    };

    // Modern animated underline for links
    const navLinkStyle = ({ isActive }) =>
        `nav-animate relative px-1 py-2 font-medium text-[15px] transition-colors duration-300 ${
            isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'
        } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:transition-transform after:duration-300 after:origin-left ${
            isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
        }`;

    return (
        <header 
            ref={navRef} 
            className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300"
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                
                {/* Logo */}
                <div className="nav-animate">
                    <img
                        src={assets.logo}
                        onClick={() => navigate('/')}
                        className="w-32 cursor-pointer hover:opacity-80 transition-opacity"
                        alt="logo"
                    />
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-8">
                    <NavLink to="/" className={navLinkStyle}>Home</NavLink>
                    <NavLink to="/doctors" className={navLinkStyle}>Doctors</NavLink>
                    <NavLink to="/about" className={navLinkStyle}>About</NavLink>
                    <NavLink to="/contact" className={navLinkStyle}>Contact</NavLink>
                </nav>

                {/* Right Section */}
                <div className="flex items-center gap-5">
                    {token ? (
                        <div
                            className="nav-animate relative flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-50 transition-colors"
                            onClick={() => setProfileOpen(!profileOpen)}
                            onMouseLeave={() => setProfileOpen(false)} // Auto-close on mouse leave
                        >
                            <img
                                src={userData?.image}
                                className="w-10 h-10 rounded-full object-cover border-2 border-primary/20 shadow-sm"
                                alt="profile"
                            />
                            <ChevronDown size={18} className={`text-gray-500 transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`} />

                            {/* Upgraded Dropdown Menu */}
                            <div className={`absolute right-0 top-14 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 transition-all duration-300 origin-top-right ${profileOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}`}>
                                <div
                                    onClick={() => navigate('/my-profile')}
                                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 hover:text-primary rounded-xl cursor-pointer transition-colors text-sm text-gray-700 font-medium"
                                >
                                    <User size={18} />
                                    My Profile
                                </div>
                                <div
                                    onClick={() => navigate('/my-appointments')}
                                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 hover:text-primary rounded-xl cursor-pointer transition-colors text-sm text-gray-700 font-medium"
                                >
                                    <Calendar size={18} />
                                    Appointments
                                </div>
                                <div className="h-[1px] bg-gray-100 my-1 mx-2"></div>
                                <div
                                    onClick={logout}
                                    className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl cursor-pointer transition-colors text-sm font-medium"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="nav-animate hidden md:flex items-center justify-center bg-primary text-white px-8 py-2.5 rounded-full text-sm font-medium shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Get Started
                        </button>
                    )}

                    {/* Mobile Menu Toggle Button */}
                    <button
                        className="nav-animate md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                        onClick={() => setOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* --- Upgraded Mobile Drawer --- */}
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
                    open ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={() => setOpen(false)}
            ></div>

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl z-50 p-6 flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
                    open ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                    <img src={assets.logo} className="w-28" alt="logo" />
                    <button onClick={() => setOpen(false)} className="p-2 bg-gray-50 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex flex-col gap-2 text-lg font-medium">
                    {['Home', 'Doctors', 'About', 'Contact'].map((item) => (
                        <NavLink
                            key={item}
                            onClick={() => setOpen(false)}
                            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                            className={({ isActive }) =>
                                `px-4 py-3 rounded-xl transition-colors ${
                                    isActive ? 'bg-blue-50 text-primary' : 'text-gray-700 hover:bg-gray-50'
                                }`
                            }
                        >
                            {item}
                        </NavLink>
                    ))}
                </nav>

                <div className="mt-auto pt-8">
                    {token ? (
                        <button
                            onClick={() => {
                                logout();
                                setOpen(false);
                            }}
                            className="w-full flex justify-center items-center gap-2 bg-red-50 text-red-600 py-3.5 rounded-xl font-medium hover:bg-red-100 transition-colors"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                navigate('/login');
                                setOpen(false);
                            }}
                            className="w-full bg-primary text-white py-3.5 rounded-xl font-medium shadow-md shadow-primary/20 hover:shadow-lg transition-all"
                        >
                            Get Started
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;