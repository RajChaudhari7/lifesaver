import React, { useEffect, useRef } from 'react';
import { specialityData } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const SpecialityMenu = () => {
    const navigate = useNavigate();
    
    // Refs for GSAP animations
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const itemsRef = useRef([]);

    // Helper to push items into the ref array
    const addToItemsRef = (el, index) => {
        if (el && !itemsRef.current.includes(el)) {
            itemsRef.current[index] = el;
        }
    };

    useEffect(() => {
        // Intersection Observer to trigger GSAP when scrolled into view
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    const tl = gsap.timeline();
                    
                    // Animate Header
                    tl.fromTo(
                        headerRef.current,
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
                    );

                    // Staggered pop-in animation for speciality bubbles
                    tl.fromTo(
                        itemsRef.current,
                        { opacity: 0, y: 40, scale: 0.8 },
                        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' },
                        "-=0.4"
                    );

                    observer.disconnect(); // Only animate once
                }
            },
            { threshold: 0.2 } 
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className='flex flex-col items-center gap-6 py-20 text-gray-800' id='speciality'>
            
            {/* --- Header Section --- */}
            <div ref={headerRef} className='flex flex-col items-center gap-3 w-full px-4 opacity-0'>
                <div className='inline-block px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100 mb-2'>
                    <span className='text-xs font-bold tracking-wider text-primary uppercase'>
                        Departments
                    </span>
                </div>
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center'>
                    Find By Speciality
                </h1>
                <p className='sm:w-1/2 text-center text-gray-500 text-sm md:text-base'>
                    Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
                </p>
            </div>

            {/* --- Speciality Carousel --- */}
            {/* Note: The long classes hide the scrollbar while keeping it scrollable */}
            <div className='flex sm:justify-center w-full gap-6 sm:gap-8 pt-10 pb-8 px-6 sm:px-0 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                {specialityData.map((item, index) => (
                    <Link 
                        ref={(el) => addToItemsRef(el, index)}
                        onClick={() => window.scrollTo(0, 0)} 
                        className='group flex flex-col items-center text-xs cursor-pointer flex-shrink-0 snap-center opacity-0' 
                        key={index} 
                        to={`/doctors/${item.speciality}`}
                    >
                        {/* Premium Bubble UI */}
                        <div className='w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-blue-50/50 border border-blue-100 flex items-center justify-center mb-4 shadow-sm group-hover:bg-white group-hover:shadow-xl group-hover:border-primary/30 group-hover:-translate-y-2 transition-all duration-300 relative overflow-hidden'>
                            {/* Subtle background glow effect on hover */}
                            <div className='absolute inset-0 bg-gradient-to-tr from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                            
                            <img 
                                className='w-12 sm:w-16 relative z-10 transition-transform duration-500 group-hover:scale-110' 
                                src={item.image} 
                                alt={item.speciality} 
                            />
                        </div>
                        
                        <p className='text-sm sm:text-base font-semibold text-gray-700 group-hover:text-primary transition-colors'>
                            {item.speciality}
                        </p>
                    </Link>
                ))}
            </div>

            {/* --- Modern 'More' Button --- */}
            <button 
                onClick={() => { navigate('/doctors'); window.scrollTo(0, 0); }} 
                className='group mt-6 flex items-center gap-2 bg-white border-2 border-gray-100 text-gray-700 px-10 py-3.5 rounded-full font-medium hover:border-primary hover:text-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300'
            >
                View All Specialities
                <span className='transition-transform duration-300 group-hover:translate-x-1'>→</span>
            </button>
            
        </div>
    );
}

export default SpecialityMenu;