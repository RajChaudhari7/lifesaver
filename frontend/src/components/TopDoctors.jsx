import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import gsap from 'gsap';

// --- Polished Enterprise Skeleton Loader ---
const DoctorSkeletonCard = () => (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm animate-pulse">
        <div className="w-full aspect-[4/5] bg-slate-100"></div>
        <div className="p-5">
            <div className="h-5 bg-slate-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-slate-100 rounded w-1/2"></div>
        </div>
    </div>
);

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors, isLoading: contextLoading } = useContext(AppContext); 
    
    const isLoading = contextLoading !== undefined ? contextLoading : (!doctors || doctors.length === 0);

    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);

    const addToCardsRef = (el, index) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current[index] = el;
        }
    };

    useEffect(() => {
        if (!isLoading && sectionRef.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        const tl = gsap.timeline();
                        
                        // Clean fade-up for header
                        tl.fromTo(
                            headerRef.current,
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
                        );

                        // Professional subtle stagger for cards (No excessive scaling)
                        tl.fromTo(
                            cardsRef.current,
                            { opacity: 0, y: 30 },
                            { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
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
    }, [isLoading, doctors]); 

    return (
        <div ref={sectionRef} className='flex flex-col items-center gap-8 my-24 text-slate-900 md:mx-10 min-h-[500px]'>
            
            {/* --- Professional Header Section --- */}
            <div ref={headerRef} className={`flex flex-col items-center gap-4 w-full px-4 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
                <div className='inline-block px-3 py-1 bg-blue-50 border border-blue-100 rounded-md'>
                    <span className='text-xs font-semibold tracking-widest text-blue-600 uppercase'>
                        Expert Care
                    </span>
                </div>
                <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center text-slate-900'>
                    Top Doctors to Book
                </h2>
                <p className='sm:w-1/2 text-center text-slate-500 text-base font-light leading-relaxed'>
                    Browse our extensive list of trusted, board-certified medical professionals and schedule your appointment securely.
                </p>
            </div>

            {/* --- Grid Section --- */}
            <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6 pt-8 px-4 sm:px-0'>
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <DoctorSkeletonCard key={`skeleton-${index}`} />
                    ))
                ) : (
                    doctors.slice(0, 10).map((item, index) => (
                        <div
                            ref={(el) => addToCardsRef(el, index)}
                            onClick={() => {
                                navigate(`/appointment/${item._id}`);
                                window.scrollTo(0, 0);
                            }}
                            className='group relative bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 opacity-0'
                            key={item._id || index}
                        >
                            {/* Enterprise Status Indicator */}
                            <div className={`absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 shadow-sm border bg-white/90 backdrop-blur-md ${
                                item.available 
                                ? 'text-emerald-700 border-emerald-100' 
                                : 'text-slate-500 border-slate-200'
                            }`}>
                                <span className={`relative flex h-2 w-2`}>
                                    {item.available && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                                    <span className={`relative inline-flex rounded-full h-2 w-2 ${item.available ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                                </span>
                                {item.available ? 'Available' : 'Unavailable'}
                            </div>

                            <div className='w-full aspect-[4/5] bg-slate-50 overflow-hidden flex items-end justify-center'>
                                <img 
                                    className='w-full h-full object-cover object-bottom transition-transform duration-700 group-hover:scale-105' 
                                    src={item.image} 
                                    alt={item.name} 
                                />
                            </div>

                            <div className='p-4 sm:p-5 bg-white border-t border-slate-100'>
                                <p className='text-slate-900 text-base sm:text-lg font-bold truncate group-hover:text-blue-600 transition-colors'>
                                    {item.name}
                                </p>
                                <p className='text-slate-500 text-xs sm:text-sm mt-0.5 font-medium truncate'>
                                    {item.speciality}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* --- Enterprise Button --- */}
            {!isLoading && (
                <button
                    onClick={() => {
                        navigate('/doctors');
                        window.scrollTo(0, 0);
                    }}
                    className='group mt-8 flex items-center gap-3 bg-white border border-slate-300 text-slate-700 px-8 py-3 rounded-lg text-sm font-semibold hover:border-blue-600 hover:text-blue-600 hover:shadow-md transition-all duration-300'
                >
                    View All Doctors
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
            )}
        </div>
    );
};

export default TopDoctors;