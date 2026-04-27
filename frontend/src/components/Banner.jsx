import React, { useContext, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import gsap from 'gsap';

const Banner = () => {
    const navigate = useNavigate();
    
    // INTEGRATION FIX: Use the token from AppContext instead of manually checking localStorage
    const { token } = useContext(AppContext); 

    // Refs for GSAP
    const sectionRef = useRef(null);
    const textGroupRef = useRef(null);
    const imageRef = useRef(null);
    const floatingElementsRef = useRef([]);

    const addToFloatingRefs = (el) => {
        if (el && !floatingElementsRef.current.includes(el)) {
            floatingElementsRef.current.push(el);
        }
    };

    const handleButtonClick = () => {
        if (token) {
            navigate('/doctors'); // Navigate to the doctors page if logged in
        } else {
            navigate('/login'); // Navigate to the login page if not logged in
        }
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        // Intersection Observer for scroll-triggered GSAP animations
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    const tl = gsap.timeline();

                    // Animate Text Group
                    tl.fromTo(
                        textGroupRef.current.children,
                        { y: 40, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
                    );

                    // Animate Image sliding up smoothly
                    tl.fromTo(
                        imageRef.current,
                        { y: 100, opacity: 0 },
                        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
                        "-=0.6"
                    );

                    // Start continuous floating animations for decorative backgrounds
                    floatingElementsRef.current.forEach((el, index) => {
                        gsap.to(el, {
                            y: `+=${Math.random() * 15 + 10}`,
                            x: `+=${Math.random() * 10 - 5}`,
                            rotation: Math.random() * 20 - 10,
                            duration: Math.random() * 2 + 3,
                            yoyo: true,
                            repeat: -1,
                            ease: 'sine.inOut',
                            delay: index * 0.2
                        });
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
        <div ref={sectionRef} className='relative flex flex-col md:flex-row bg-gradient-to-br from-primary to-blue-700 rounded-[2rem] px-6 sm:px-10 md:px-14 lg:px-20 my-24 md:mx-10 overflow-hidden shadow-2xl'>
            
            {/* --- Decorative Floating Elements --- */}
            <div ref={addToFloatingRefs} className='absolute top-[10%] left-[5%] w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20 z-0'></div>
            <div ref={addToFloatingRefs} className='absolute bottom-[10%] left-[40%] w-24 h-24 bg-blue-400/20 backdrop-blur-md rounded-full border border-white/10 z-0 hidden md:block'></div>
            <div ref={addToFloatingRefs} className='absolute top-[20%] right-[10%] w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg transform rotate-45 border border-white/20 z-0'></div>

            {/* --- Left Side (Text & CTA) --- */}
            <div className='relative z-10 flex-1 py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col justify-center items-start'>
                <div ref={textGroupRef} className='flex flex-col gap-5 w-full'>
                    
                    {/* Floating Status Pill */}
                    <div className='inline-block px-4 py-1.5 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm w-max'>
                        <span className='text-xs sm:text-sm font-semibold tracking-wider text-white uppercase shadow-sm flex items-center gap-2'>
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            100+ Specialists
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight md:leading-tight'>
                        Book Appointment <br />
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-white font-medium'>
                            With Trusted Doctors
                        </span>
                    </h2>

                    {/* Subheadline description */}
                    <p className='text-blue-100 text-sm sm:text-base max-w-md mt-2 leading-relaxed font-light'>
                        Take control of your health today. Schedule a visit with our top-rated medical professionals in just a few clicks.
                    </p>

                    {/* Interactive Button */}
                    <button
                        onClick={handleButtonClick}
                        className='group flex items-center gap-3 bg-white text-gray-800 font-bold px-8 py-3.5 rounded-full mt-4 shadow-lg hover:shadow-xl hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300 w-max'
                    >
                        {token ? 'Book Appointment' : 'Create Account'}
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* --- Right Side (Image) --- */}
            <div className='relative z-10 hidden md:flex md:w-1/2 lg:w-[450px] justify-end items-end mt-10 md:mt-0 pt-10'>
                {/* The image sits on the bottom edge so it looks like it's coming out of the container */}
                <img 
                    ref={imageRef} 
                    className='w-full max-w-md h-auto object-contain drop-shadow-2xl translate-y-2' 
                    src={assets.appointment_img} 
                    alt="Book Appointment" 
                />
            </div>
        </div>
    );
};

export default Banner;