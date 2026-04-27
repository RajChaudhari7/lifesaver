import React, { useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import gsap from 'gsap';

const Header = () => {
    // Refs for GSAP targeting
    const containerRef = useRef(null);
    const textGroupRef = useRef(null);
    const imageRef = useRef(null);
    const floatingElementsRef = useRef([]);

    // Helper to add elements to the floating ref array
    const addToFloatingRefs = (el) => {
        if (el && !floatingElementsRef.current.includes(el)) {
            floatingElementsRef.current.push(el);
        }
    };

    useEffect(() => {
        // Use GSAP Context for React (cleans up animations automatically on unmount)
        let ctx = gsap.context(() => {
            // 1. Initial Entrance Animations
            const tl = gsap.timeline();

            // Animate text elements in staggering
            tl.fromTo(
                textGroupRef.current.children,
                { y: 40, opacity: 0, rotationX: 15 },
                { y: 0, opacity: 1, rotationX: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
            );

            // Animate main image
            tl.fromTo(
                imageRef.current,
                { x: 50, opacity: 0, scale: 0.95 },
                { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
                "-=0.6" // Start slightly before text finishes
            );

            // 2. Continuous 3D Floating Animations for shapes AND text badges
            floatingElementsRef.current.forEach((el, index) => {
                gsap.to(el, {
                    y: `+=${Math.random() * 20 + 15}`, // Random vertical float
                    x: `+=${Math.random() * 10 - 5}`,   // Slight horizontal sway
                    rotationY: Math.random() * 15,      // Gentle 3D twist
                    rotationZ: Math.random() * 6 - 3,   // Slight tilt
                    duration: Math.random() * 2 + 3.5,  // Random speed between 3.5-5.5s
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut',
                    delay: index * 0.2
                });
            });
        }, containerRef);

        return () => ctx.revert(); // Cleanup
    }, []);

    return (
        <div ref={containerRef} className='relative flex flex-col md:flex-row flex-wrap bg-gradient-to-br from-primary to-blue-700 rounded-2xl px-6 md:px-10 lg:px-20 overflow-hidden shadow-2xl'>
            
            {/* --- Decorative Floating Shapes --- */}
            <div ref={addToFloatingRefs} className='absolute top-[10%] left-[5%] w-12 h-12 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20 z-0'></div>
            <div ref={addToFloatingRefs} className='absolute bottom-[20%] left-[45%] w-24 h-24 bg-blue-400/20 backdrop-blur-md rounded-full shadow-lg border border-white/10 z-0'></div>
            
            {/* --- NEW: Floating Descriptive Text Badges --- */}
            {/* Badge 1: Top Right */}
            <div ref={addToFloatingRefs} className='hidden md:flex absolute top-[15%] right-[8%] z-20 items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20'>
                <span className='text-xl'>⭐</span>
                <span className='text-sm text-white font-medium tracking-wide'>Top Rated Doctors</span>
            </div>

            {/* Badge 2: Middle Right (overlapping image slightly) */}
            <div ref={addToFloatingRefs} className='hidden md:flex absolute top-[45%] right-[2%] z-20 items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20'>
                <span className='text-xl'>⚡</span>
                <span className='text-sm text-white font-medium tracking-wide'>Instant Booking</span>
            </div>

            {/* Badge 3: Bottom Left / Center */}
            <div ref={addToFloatingRefs} className='hidden md:flex absolute bottom-[15%] left-[40%] z-20 items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20'>
                <span className='text-xl'>🛡️</span>
                <span className='text-sm text-white font-medium tracking-wide'>100% Secure</span>
            </div>

            {/* --- Left Side (Text & CTA) --- */}
            <div className='relative z-10 md:w-1/2 flex flex-col items-start justify-center gap-6 py-12 m-auto md:py-[10vw] md:mb-[-30px]'>
                
                {/* Wrapper for staggered GSAP text animation */}
                <div ref={textGroupRef} className='flex flex-col gap-6 w-full perspective-1000'>
                    <div className='inline-block px-4 py-1.5 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm w-max'>
                        <span className='text-xs font-semibold tracking-wider text-white uppercase shadow-sm'>
                            🏥 Premium Healthcare
                        </span>
                    </div>

                    <h1 className='text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight md:leading-tight lg:leading-tight drop-shadow-md'>
                        Book Appointment <br />
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-white'>
                            With Trusted Doctors
                        </span>
                    </h1>

                    <div className='flex flex-col sm:flex-row items-center gap-4 text-white/90 text-base font-light bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm w-fit'>
                        <img className='w-28 drop-shadow-md' src={assets.group_profiles} alt="Doctor Profiles" />
                        <p className='text-sm leading-relaxed'>
                            Simply browse through our extensive list of trusted doctors, <br className='hidden md:block' />
                            schedule your appointment hassle-free.
                        </p>
                    </div>

                    <a href="#speciality" className='group flex items-center gap-3 bg-white py-3.5 px-8 rounded-full text-gray-800 text-sm font-semibold m-auto md:m-0 hover:bg-gray-50 hover:shadow-xl transition-all duration-300 w-max mt-2'>
                        Book Appointment 
                        <img className='w-3 transition-transform duration-300 group-hover:translate-x-1' src={assets.arrow_icon} alt="Arrow" />
                    </a>
                </div>
            </div>

            {/* --- Right Side (Image) --- */}
            <div className='relative z-10 md:w-1/2 flex justify-center items-end mt-8 md:mt-0'>
                <img 
                    ref={imageRef}
                    className='w-full max-w-lg md:absolute bottom-0 h-auto rounded-lg drop-shadow-2xl object-cover pointer-events-none' 
                    src={assets.header_img} 
                    alt="Healthcare Professional" 
                />
            </div>

        </div>
    );
}

export default Header;