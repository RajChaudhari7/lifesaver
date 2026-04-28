import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { Menu, X, ChevronDown, User, Calendar, LogOut, ShieldCheck } from 'lucide-react';

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

    // Enterprise-grade tab styling - strictly aligned to the bottom of the navbar
    const navLinkStyle = ({ isActive }) =>
        `relative flex items-center h-full px-4 text-sm font-semibold transition-colors duration-200 ${
            isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
        }`;

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm w-full">
            {/* The container is explicitly h-20 (80px) tall */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between gap-8">
                
                {/* --- Logo (flex-shrink-0 prevents it from getting squished) --- */}
                <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
                    <img
                        src={assets.logo}
                        className="w-28 md:w-32 hover:opacity-90 transition-opacity"
                        alt="Life Saver Logo"
                    />
                </div>

                {/* --- Desktop Navigation (Takes up full height so borders align perfectly) --- */}
                <nav className="hidden md:flex items-center justify-center h-full gap-2 lg:gap-6 flex-1">
                    <NavLink to="/" className={navLinkStyle}>
                        {({ isActive }) => (
                            <>
                                Home
                                {/* The active indicator now sits exactly at the bottom border */}
                                <span className={`absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-md transition-transform duration-300 origin-bottom ${isActive ? 'scale-y-100' : 'scale-y-0'}`}></span>
                            </>
                        )}
                    </NavLink>
                    <NavLink to="/doctors" className={navLinkStyle}>
                        {({ isActive }) => (
                            <>
                                Find Doctors
                                <span className={`absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-md transition-transform duration-300 origin-bottom ${isActive ? 'scale-y-100' : 'scale-y-0'}`}></span>
                            </>
                        )}
                    </NavLink>
                    <NavLink to="/about" className={navLinkStyle}>
                        {({ isActive }) => (
                            <>
                                About Us
                                <span className={`absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-md transition-transform duration-300 origin-bottom ${isActive ? 'scale-y-100' : 'scale-y-0'}`}></span>
                            </>
                        )}
                    </NavLink>
                    <NavLink to="/contact" className={navLinkStyle}>
                        {({ isActive }) => (
                            <>
                                Contact
                                <span className={`absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-md transition-transform duration-300 origin-bottom ${isActive ? 'scale-y-100' : 'scale-y-0'}`}></span>
                            </>
                        )}
                    </NavLink>
                </nav>

                {/* --- Right Section (Profile / CTA) --- */}
                <div className="flex-shrink-0 flex items-center gap-4">
                    {token ? (
                        <div
                            className="relative"
                            onMouseEnter={() => setProfileOpen(true)}
                            onMouseLeave={() => setProfileOpen(false)} 
                        >
                            <div className="flex items-center gap-3 cursor-pointer pl-3 pr-2 py-1.5 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
                                <div className="hidden lg:flex flex-col items-end">
                                    <span className="text-xs font-bold text-slate-900">{userData?.name || 'Patient'}</span>
                                    <span className="text-[10px] font-medium text-emerald-600 flex items-center gap-1">
                                        <ShieldCheck size={10} /> Verified
                                    </span>
                                </div>
                                <img
                                    src={userData?.image || assets.default_avatar}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200"
                                    alt="profile"
                                />
                                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`} />
                            </div>

                            {/* Enterprise Profile Dropdown */}
                            <div className={`absolute right-0 top-[105%] w-64 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] ring-1 ring-slate-900/5 transition-all duration-200 origin-top-right overflow-hidden ${profileOpen ? 'scale-100 opacity-100 visible pointer-events-auto' : 'scale-95 opacity-0 invisible pointer-events-none'}`}>
                                
                                <div className="px-5 py-4 bg-slate-50/50 border-b border-slate-100">
                                    <p className="text-sm font-bold text-slate-900 truncate">{userData?.name || 'Patient Portal'}</p>
                                    <p className="text-xs text-slate-500 truncate mt-0.5">{userData?.email || 'Manage your account'}</p>
                                </div>

                                <div className="p-2">
                                    <div onClick={() => { navigate('/my-profile'); setProfileOpen(false); }} className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors text-sm text-slate-700 font-medium group">
                                        <User size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" /> My Profile
                                    </div>
                                    <div onClick={() => { navigate('/my-appointments'); setProfileOpen(false); }} className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors text-sm text-slate-700 font-medium group">
                                        <Calendar size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" /> Appointments
                                    </div>
                                </div>
                                
                                <div className="border-t border-slate-100 p-2">
                                    <div onClick={logout} className="flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors text-sm font-medium">
                                        <LogOut size={16} /> Secure Logout
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="hidden md:flex items-center justify-center bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors duration-300"
                        >
                            Patient Login
                        </button>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                        onClick={() => setOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* --- Mobile Drawer --- */}
            <div
                className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${
                    open ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={() => setOpen(false)}
            ></div>

            <div
                className={`fixed top-0 right-0 bottom-0 h-screen w-[85%] max-w-sm bg-white shadow-2xl z-[70] flex flex-col transition-transform duration-300 ease-out md:hidden ${
                    open ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <img src={assets.logo} className="w-28" alt="logo" />
                    <button onClick={() => setOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {token && (
                    <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-4">
                        <img src={userData?.image || assets.default_avatar} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" alt="profile" />
                        <div>
                            <p className="text-sm font-bold text-slate-900">{userData?.name || 'Patient User'}</p>
                            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                                <ShieldCheck size={12} className="text-emerald-500" /> Verified Patient
                            </p>
                        </div>
                    </div>
                )}

                <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
                    {['Home', 'Doctors', 'About', 'Contact'].map((item) => (
                        <NavLink
                            key={item}
                            onClick={() => setOpen(false)}
                            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                            className={({ isActive }) =>
                                `px-4 py-3.5 rounded-lg text-sm font-semibold transition-colors ${
                                    isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
                                }`
                            }
                        >
                            {item === 'Doctors' ? 'Find Doctors' : item}
                        </NavLink>
                    ))}
                    
                    {token && (
                        <>
                            <div className="h-px bg-slate-100 my-2 mx-4"></div>
                            <NavLink onClick={() => setOpen(false)} to="/my-profile" className="px-4 py-3.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">My Profile</NavLink>
                            <NavLink onClick={() => setOpen(false)} to="/my-appointments" className="px-4 py-3.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">Appointments</NavLink>
                        </>
                    )}
                </nav>

                <div className="p-6 border-t border-slate-100">
                    {token ? (
                        <button
                            onClick={() => { logout(); setOpen(false); }}
                            className="w-full flex justify-center items-center gap-2 bg-white border border-slate-200 text-slate-700 py-3 rounded-lg text-sm font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                        >
                            <LogOut size={18} /> Secure Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => { navigate('/login'); setOpen(false); }}
                            className="w-full bg-slate-900 text-white py-3 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
                        >
                            Patient Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;