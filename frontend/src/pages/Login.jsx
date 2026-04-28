import React, { useContext, useEffect, useState, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Login = () => {
    const { backendUrl, token, setToken } = useContext(AppContext);
    const navigate = useNavigate();
    
    const [state, setState] = useState('Login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Added for professional loading state

    // Refs for GSAP animations
    const containerRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        // Smooth entrance animation on load
        let ctx = gsap.context(() => {
            gsap.fromTo(containerRef.current, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.8, ease: 'power2.out' }
            );
            gsap.fromTo(formRef.current.children, 
                { y: 20, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setIsSubmitting(true); // Start loading spinner

        try {
            if (state === 'Sign Up') {
                const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
                if (data.success) {
                    toast.success("Successfully registered! Please log in.");
                    setState('Login');
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                    toast.success("Welcome to Life Saver Portal!");
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsSubmitting(false); // Stop loading spinner
        }
    };

    return (
        <div ref={containerRef} className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 opacity-0">
            
            {/* Main Split-Screen Card */}
            <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-200">
                
                {/* --- Left Panel: Branding & Trust (Hidden on small mobile) --- */}
                <div className="hidden md:flex md:w-1/2 bg-slate-900 p-12 flex-col justify-between relative overflow-hidden">
                    {/* Abstract Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
                            Life Saver <span className="text-blue-400">Portal</span>
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            Your secure gateway to managing your healthcare. Book appointments, view medical records, and connect with trusted specialists instantly.
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-col gap-6">
                        {/* Trust Indicator 1 */}
                        <div className="flex items-center gap-4 text-slate-300">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-blue-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">HIPAA Compliant</p>
                                <p className="text-xs text-slate-400">End-to-end encryption for your data</p>
                            </div>
                        </div>

                        {/* Trust Indicator 2 */}
                        <div className="flex items-center gap-4 text-slate-300">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-blue-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">24/7 Access</p>
                                <p className="text-xs text-slate-400">Manage appointments anytime, anywhere</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Right Panel: Form --- */}
                <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white">
                    <form ref={formRef} onSubmit={onSubmitHandler} className="w-full max-w-sm mx-auto flex flex-col gap-5">
                        
                        {/* Header */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2 md:hidden">
                                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                <span className="text-sm font-bold text-slate-900 tracking-wide uppercase">Life Saver</span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                                {state === 'Sign Up' ? "Create an Account" : "Welcome Back"}
                            </h3>
                            <p className="text-sm text-slate-500 mt-2">
                                {state === 'Sign Up' ? "Enter your details to register as a patient." : "Please enter your credentials to access your portal."}
                            </p>
                        </div>

                        {/* Inputs */}
                        {state === "Sign Up" && (
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-slate-700">Full Name</label>
                                <input 
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                                    type="text" 
                                    placeholder="John Doe"
                                    onChange={(e) => setName(e.target.value)} 
                                    value={name} 
                                    required 
                                />
                            </div>
                        )}

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">Email Address</label>
                            <input 
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                                type="email" 
                                placeholder="you@example.com"
                                onChange={(e) => setEmail(e.target.value)} 
                                value={email} 
                                required 
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-slate-700">Password</label>
                                {state === "Login" && (
                                    <span className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer transition-colors">Forgot password?</span>
                                )}
                            </div>
                            <input 
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                                type="password" 
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password} 
                                required 
                            />
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full mt-4 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98] transition-all duration-200 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Processing...
                                </>
                            ) : (
                                state === 'Sign Up' ? "Create Account" : "Secure Login"
                            )}
                        </button>

                        {/* Toggle State */}
                        <div className="mt-4 text-center">
                            <p className="text-sm text-slate-500">
                                {state === "Sign Up" ? "Already have an account?" : "Don't have an account yet?"}
                                <span 
                                    onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')} 
                                    className="ml-1.5 text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition-colors"
                                >
                                    {state === "Sign Up" ? "Log in here" : "Create one now"}
                                </span>
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;