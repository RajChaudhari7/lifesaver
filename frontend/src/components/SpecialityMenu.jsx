import React, { useEffect, useRef } from 'react';
import { specialityData } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const SpecialityMenu = () => {
    const navigate = useNavigate();
    
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const itemsRef = useRef([]);

    const addToItemsRef = (el, index) => {
        if (el && !itemsRef.current.includes(el)) {
            itemsRef.current[index] = el;
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    const tl = gsap.timeline();
                    
                    tl.fromTo(
                        headerRef.current,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
                    );

                    // Smooth fade-up for tiles instead of aggressive scaling
                    tl.fromTo(
                        itemsRef.current,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
                        "-=0.4"
                    );

                    observer.disconnect(); 
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
        <div ref={sectionRef} className='flex flex-col items-center gap-8 py-20 bg-white' id='speciality'>
            
            {/* --- Professional Header Section --- */}
            <div ref={headerRef} className='flex flex-col items-center gap-4 w-full px-4 opacity-0'>
                <div className='inline-block px-3 py-1 bg-blue-50 border border-blue-100 rounded-md'>
                    <span className='text-xs font-semibold tracking-widest text-blue-600 uppercase'>
                        Departments
                    </span>
                </div>
                <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center text-slate-900'>
                    Find By Speciality
                </h2>
                <p className='sm:w-1/2 text-center text-slate-500 text-sm md:text-base font-light leading-relaxed'>
                    Select a medical department to find highly qualified specialists tailored to your specific healthcare needs.
                </p>
            </div>

            {/* --- Enterprise Dashboard Tiles --- */}
            <div className='flex sm:justify-center w-full gap-4 sm:gap-6 pt-10 pb-8 px-6 sm:px-0 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                {specialityData.map((item, index) => (
                    <Link 
                        ref={(el) => addToItemsRef(el, index)}
                        onClick={() => window.scrollTo(0, 0)} 
                        className='group flex flex-col items-center text-xs cursor-pointer flex-shrink-0 snap-center opacity-0 w-28 sm:w-36' 
                        key={index} 
                        to={`/doctors/${item.speciality}`}
                    >
                        {/* Premium Dashboard Tile UI */}
                        <div className='w-full aspect-square rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center p-4 mb-4 shadow-sm group-hover:bg-white group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:border-blue-200 group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden'>
                            
                            {/* Subtle Top-Border Glow on Hover */}
                            <div className='absolute top-0 left-0 w-full h-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                            
                            <img 
                                className='w-10 sm:w-12 mb-3 relative z-10 transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100' 
                                src={item.image} 
                                alt={item.speciality} 
                            />
                            
                            <p className='text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors text-center'>
                                {item.speciality}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* --- Enterprise Button --- */}
            <button 
                onClick={() => { navigate('/doctors'); window.scrollTo(0, 0); }} 
                className='group mt-4 flex items-center gap-3 bg-white border border-slate-300 text-slate-700 px-8 py-3 rounded-lg text-sm font-semibold hover:border-blue-600 hover:text-blue-600 hover:shadow-md transition-all duration-300'
            >
                View All Departments
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
            
        </div>
    );
}

export default SpecialityMenu;