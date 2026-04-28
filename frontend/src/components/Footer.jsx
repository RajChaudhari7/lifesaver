import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 mt-32 w-full">
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
                
                {/* --- Main Footer Content --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    
                    {/* Brand & About Section */}
                    <div className="lg:col-span-1 flex flex-col items-start">
                        <img className="mb-6 w-32 brightness-0 invert" src={assets.logo} alt="Life Saver Logo" />
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Committed to making healthcare accessible and stress-free. Book appointments, manage records, and connect with trusted specialists—all within a secure, HIPAA-compliant portal.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-400 hover:text-white transition-all duration-300">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h3 className="text-white text-sm font-bold tracking-wider mb-6 uppercase">Company</h3>
                        <ul className="flex flex-col gap-3">
                            {['Home', 'All Doctors', 'About Us', 'Contact Us'].map((item, index) => (
                                <li key={index}>
                                    <Link 
                                        to={`/${item.toLowerCase().replace(/\s+/g, '') === 'home' ? '' : item.toLowerCase().replace(/\s+/g, '')}`} 
                                        className="text-slate-400 text-sm hover:text-blue-400 hover:translate-x-1 transition-all duration-300 inline-block"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal & Support Section (Added for professional feel) */}
                    <div>
                        <h3 className="text-white text-sm font-bold tracking-wider mb-6 uppercase">Legal & Support</h3>
                        <ul className="flex flex-col gap-3">
                            {['Terms & Conditions', 'Privacy Policy', 'Patient Rights', 'FAQs'].map((item, index) => (
                                <li key={index}>
                                    <Link 
                                        to="#" 
                                        className="text-slate-400 text-sm hover:text-blue-400 hover:translate-x-1 transition-all duration-300 inline-block"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-white text-sm font-bold tracking-wider mb-6 uppercase">Get In Touch</h3>
                        <ul className="flex flex-col gap-4 text-slate-400 text-sm">
                            <li className="flex items-center gap-3 group">
                                <span className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </span>
                                <span>+91 8600 412 566</span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <span className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </span>
                                <span>lifesaver@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* --- Bottom Footer Bar --- */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-800 text-sm">
                    <p className="text-slate-500 mb-4 md:mb-0">
                        &copy; {currentYear} LifeSaver Medical Systems. All Rights Reserved.
                    </p>
                    
                    {/* System Status Indicator */}
                    <div className="flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer transition-colors">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        <span>All Systems Operational</span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;