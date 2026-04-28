import React, { useContext, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import gsap from 'gsap';

const Banner = () => {
    const navigate = useNavigate();
    const { token } = useContext(AppContext); 

    // Refs for GSAP targeting
    const sectionRef = useRef(null);
    const textGroupRef = useRef(null);
    const imageRef = useRef(null);
    const glowRef = useRef(null);

    const handleButtonClick = () => {
        if (token) {
            navigate('/doctors'); 
        } else {
            navigate('/login'); 
        }
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        // Intersection Observer to trigger high-end animations on scroll
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    const tl = gsap.timeline();

                    // 1. Clean stagger entrance for text
                    tl.fromTo(
                        textGroupRef.current.children,
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
                    );

                    // 2. High-end Mask Reveal for the Image
                    tl.fromTo(
                        imageRef.current,
                        { clipPath: 'inset(100% 0 0 0)', scale: 1.05 },
                        { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.2, ease: 'power3.inOut' },
                        "-=0.6"
                    );

                    // 3. Start continuous slow breathing effect for the background glow
                    gsap.to(glowRef.current, {
                        scale: 1.2,
                        opacity: 0.4,
                        duration: 4,
                        yoyo: true,
                        repeat: -1,
                        ease: 'sine.inOut'
                    });

                    observer.disconnect(); // Only animate once
                }
            },
            { threshold: 0.3 } // Trigger when 30% of the banner is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className='relative flex flex-col md:flex-row bg-slate-900 rounded-2xl px-6 sm:px-10 md:px-14 lg:px-20 my-24 md:mx-10 overflow-hidden shadow-sm border border-slate-800/50'>
            
            {/* --- Subtle Background Pattern --- */}
            <div className='absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent pointer-events-none'></div>

            {/* --- Left Side (Text & CTA) --- */}
            <div className='relative z-10 flex-1 py-16 sm:py-20 md:py-24 flex flex-col justify-center items-start'>
                <div ref={textGroupRef} className='flex flex-col gap-6 w-full'>
                    
                    {/* Professional Tagline */}
                    <div className='inline-block px-3 py-1 bg-blue-500/10 border border-blue-400/20 rounded-md w-max'>
                        <span className='text-xs sm:text-sm font-semibold tracking-widest text-blue-300 uppercase flex items-center gap-2'>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Ready to Begin?
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight'>
                        Book Appointment <br />
                        <span className='text-blue-400'>
                            With Trusted Doctors
                        </span>
                    </h2>

                    {/* Subheadline description */}
                    <p className='text-slate-300 text-sm sm:text-base max-w-md leading-relaxed font-light'>
                        Take control of your health today. Schedule a visit with our top-rated medical professionals securely through our patient portal.
                    </p>

                    {/* Interactive Button */}
                    <button
                        onClick={handleButtonClick}
                        className='group mt-2 flex items-center gap-3 bg-white py-3.5 px-8 rounded-lg text-slate-900 text-sm font-bold hover:bg-slate-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 w-max'
                    >
                        {token ? 'Book Appointment' : 'Create Account'}
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* --- Right Side (Image & Glow) --- */}
            <div className='relative z-10 hidden md:flex md:w-1/2 lg:w-[450px] justify-end items-end mt-10 md:mt-0 pt-10'>
                {/* Breathing Ambient Glow behind image */}
                <div 
                    ref={glowRef}
                    className='absolute bottom-10 right-10 w-[60%] h-[60%] bg-blue-600/20 blur-3xl rounded-full pointer-events-none'
                ></div>

                {/* Main Image */}
                <img 
                    ref={imageRef} 
                    className='w-full max-w-md h-auto object-contain drop-shadow-2xl translate-y-2 z-10' 
                    src={assets.appointment_img} 
                    alt="Book Appointment" 
                />
            </div>
        </div>
    );
};

export default Banner;