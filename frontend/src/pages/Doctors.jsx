import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Filter, ChevronRight, Stethoscope } from 'lucide-react';
import gsap from 'gsap';

// --- Enterprise Skeleton Loader (Matches TopDoctors) ---
const DoctorSkeletonCard = () => (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm animate-pulse">
        <div className="w-full aspect-[4/5] bg-slate-100"></div>
        <div className="p-5">
            <div className="h-5 bg-slate-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-slate-100 rounded w-1/2"></div>
        </div>
    </div>
);

const Doctors = () => {
    const { speciality } = useParams();
    const navigate = useNavigate();
    const { doctors, isLoading: contextLoading } = useContext(AppContext);
    
    const [filterDoc, setFilterDoc] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    
    // Safely handle loading states
    const isLoading = contextLoading !== undefined ? contextLoading : (!doctors || doctors.length === 0);

    // Refs for GSAP
    const containerRef = useRef(null);
    const sidebarRef = useRef(null);
    const gridRef = useRef(null);

    const applyFilter = () => {
        if (speciality && doctors?.length > 0) {
            setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
        } else {
            setFilterDoc(doctors || []);
        }
    };

    useEffect(() => {
        applyFilter();
    }, [doctors, speciality]);

    // GSAP Entrance Animations
    useEffect(() => {
        if (!isLoading && filterDoc.length > 0) {
            let ctx = gsap.context(() => {
                const tl = gsap.timeline();
                
                // Animate Sidebar
                if (window.innerWidth > 640) {
                    tl.fromTo(sidebarRef.current, 
                        { opacity: 0, x: -20 }, 
                        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
                    );
                }

                // Stagger Grid Cards
                tl.fromTo(gridRef.current.children,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
                    "-=0.2"
                );
            }, containerRef);
            return () => ctx.revert();
        }
    }, [isLoading, filterDoc]);

    // Extract unique specialties
    const specialties = [...new Set((doctors || []).map(doc => doc.speciality))];

    return (
        <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 min-h-[80vh]">
            
            {/* --- Page Header --- */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                    <Stethoscope className="text-blue-600" size={32} />
                    Find a Specialist
                </h1>
                <p className="text-slate-500 mt-2 text-sm md:text-base max-w-2xl">
                    Browse our directory of highly qualified medical professionals. Filter by department to find the right care for your needs.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-8">
                
                {/* --- Mobile Filter Toggle Button --- */}
                <button
                    className={`sm:hidden w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-colors border ${
                        showFilter 
                        ? 'bg-slate-900 text-white border-slate-900' 
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                    onClick={() => setShowFilter(!showFilter)}
                >
                    <Filter size={18} />
                    {showFilter ? 'Hide Filters' : 'Show Filters'}
                </button>

                {/* --- Enterprise Sidebar (Filters) --- */}
                <div 
                    ref={sidebarRef}
                    className={`w-full sm:w-64 flex-shrink-0 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${
                        showFilter ? 'block' : 'hidden sm:block'
                    }`}
                >
                    <div className="bg-slate-50 px-5 py-4 border-b border-slate-200">
                        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Departments</h3>
                    </div>
                    
                    <div className="flex flex-col py-2">
                        {/* "All Specialties" Option */}
                        <div
                            onClick={() => navigate('/doctors')}
                            className={`flex items-center justify-between px-5 py-3 cursor-pointer transition-colors text-sm font-medium ${
                                !speciality 
                                ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600" 
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                        >
                            <span>All Specialists</span>
                            {!speciality && <ChevronRight size={16} />}
                        </div>

                        {/* Dynamic Specialties List */}
                        {specialties.map((spec, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/doctors/${spec}`)}
                                className={`flex items-center justify-between px-5 py-3 cursor-pointer transition-colors text-sm font-medium ${
                                    speciality === spec 
                                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600" 
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                            >
                                <span>{spec}</span>
                                {speciality === spec && <ChevronRight size={16} />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Doctors Grid Section --- */}
                <div className="flex-1 w-full">
                    {/* Active Filter Pill */}
                    {speciality && (
                        <div className="mb-6 flex items-center gap-2">
                            <span className="text-sm text-slate-500">Showing results for:</span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                                {speciality}
                                <button 
                                    onClick={() => navigate('/doctors')}
                                    className="ml-2 hover:text-blue-900 focus:outline-none"
                                >
                                    &times;
                                </button>
                            </span>
                        </div>
                    )}

                    <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                        {isLoading ? (
                            // Loading State
                            Array.from({ length: 8 }).map((_, index) => (
                                <DoctorSkeletonCard key={`skeleton-${index}`} />
                            ))
                        ) : filterDoc.length > 0 ? (
                            // Loaded Cards (Matched exactly to TopDoctors component)
                            filterDoc.map((item, index) => (
                                <div
                                    onClick={() => navigate(`/appointment/${item._id}`)}
                                    className='group relative bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300'
                                    key={item._id || index}
                                >
                                    {/* Status Badge */}
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

                                    {/* Image */}
                                    <div className='w-full aspect-[4/5] bg-slate-50 overflow-hidden flex items-end justify-center'>
                                        <img 
                                            className='w-full h-full object-cover object-bottom transition-transform duration-700 group-hover:scale-105' 
                                            src={item.image} 
                                            alt={item.name} 
                                        />
                                    </div>

                                    {/* Info */}
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
                        ) : (
                            // Empty State
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center bg-slate-50 border border-slate-200 rounded-2xl border-dashed">
                                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
                                    <Filter size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">No specialists found</h3>
                                <p className="text-slate-500 text-sm max-w-sm">
                                    We couldn't find any doctors matching "{speciality}". Please try selecting a different department.
                                </p>
                                <button 
                                    onClick={() => navigate('/doctors')}
                                    className="mt-6 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Doctors;