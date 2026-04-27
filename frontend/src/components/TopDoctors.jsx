import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import gsap from 'gsap';

// --- Skeleton Loader Component ---
const DoctorSkeletonCard = () => (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm animate-pulse">
        {/* Image Placeholder */}
        <div className="w-full aspect-[4/5] bg-gray-200/60"></div>
        {/* Text Placeholder */}
        <div className="p-5">
            <div className="h-5 bg-gray-200/80 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200/60 rounded w-1/2"></div>
        </div>
    </div>
);

const TopDoctors = () => {
    const navigate = useNavigate();
    // Assuming you have an isLoading state from your context. 
    // If not, you can fallback to checking if doctors.length === 0
    const { doctors, isLoading: contextLoading } = useContext(AppContext); 
    
    // Fallback loading state if your context doesn't have one yet
    const isLoading = contextLoading !== undefined ? contextLoading : (!doctors || doctors.length === 0);

    // Refs for animation
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);

    const addToCardsRef = (el, index) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current[index] = el;
        }
    };

    useEffect(() => {
        // Only run GSAP animations if data is finished loading
        if (!isLoading && sectionRef.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        const tl = gsap.timeline();
                        
                        tl.fromTo(
                            headerRef.current,
                            { opacity: 0, y: 30 },
                            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
                        );

                        tl.fromTo(
                            cardsRef.current,
                            { opacity: 0, y: 50, scale: 0.95 },
                            { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' },
                            "-=0.3"
                        );

                        observer.disconnect(); 
                    }
                },
                { threshold: 0.1 } 
            );

            observer.observe(sectionRef.current);
            return () => observer.disconnect();
        }
    }, [isLoading, doctors]); // Re-run effect when loading finishes

    return (
        <div ref={sectionRef} className='flex flex-col items-center gap-6 my-24 text-gray-900 md:mx-10 min-h-[500px]'>
            
            {/* Header Section */}
            <div ref={headerRef} className={`flex flex-col items-center gap-3 w-full ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
                <div className='inline-block px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100 mb-2'>
                    <span className='text-xs font-bold tracking-wider text-primary uppercase'>
                        Expert Care
                    </span>
                </div>
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center'>
                    Top Doctors to Book
                </h1>
                <p className='sm:w-1/2 text-center text-gray-500 text-sm md:text-base'>
                    Simply browse through our extensive list of trusted, highly-rated medical professionals.
                </p>
            </div>

            {/* Grid Section */}
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-8 px-4 sm:px-0'>
                {isLoading ? (
                    // 1. Show 5 Skeletons while loading
                    Array.from({ length: 5 }).map((_, index) => (
                        <DoctorSkeletonCard key={`skeleton-${index}`} />
                    ))
                ) : (
                    // 2. Show actual animated cards when data is ready
                    doctors.slice(0, 10).map((item, index) => (
                        <div
                            ref={(el) => addToCardsRef(el, index)}
                            onClick={() => {
                                navigate(`/appointment/${item._id}`);
                                window.scrollTo(0, 0);
                            }}
                            className='group relative bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 opacity-0'
                            key={item._id || index}
                        >
                            <div className={`absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 backdrop-blur-md shadow-sm border ${
                                item.available 
                                ? 'bg-green-50/90 text-green-600 border-green-200' 
                                : 'bg-red-50/90 text-red-600 border-red-200'
                            }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                                {item.available ? 'Available' : 'Unavailable'}
                            </div>

                            <div className='w-full aspect-[4/5] bg-blue-50/50 overflow-hidden flex items-end justify-center'>
                                <img 
                                    className='w-full h-full object-cover object-bottom transition-transform duration-500 group-hover:scale-105' 
                                    src={item.image} 
                                    alt={item.name} 
                                />
                            </div>

                            <div className='p-5 bg-white'>
                                <p className='text-gray-900 text-lg font-bold truncate group-hover:text-primary transition-colors'>
                                    {item.name}
                                </p>
                                <p className='text-gray-500 text-sm mt-0.5 font-medium'>
                                    {item.speciality}
                                </p>
                                <div className='mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-sm text-primary font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
                                    Book Visit
                                    <span className='text-lg'>→</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Hide button while loading */}
            {!isLoading && (
                <button
                    onClick={() => {
                        navigate('/doctors');
                        window.scrollTo(0, 0);
                    }}
                    className='group mt-12 flex items-center gap-2 bg-white border-2 border-gray-100 text-gray-700 px-10 py-3.5 rounded-full font-medium hover:border-primary hover:text-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300'
                >
                    View All Doctors
                    <span className='transition-transform duration-300 group-hover:translate-x-1'>→</span>
                </button>
            )}
        </div>
    );
};

export default TopDoctors;