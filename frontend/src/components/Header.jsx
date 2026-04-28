import React, { useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import gsap from 'gsap';

const Header = () => {
    // Refs for GSAP targeting
    const containerRef = useRef(null);
    const textGroupRef = useRef(null);
    const imageRef = useRef(null);
    const badgeGroupRef = useRef(null);
    const glowRef = useRef(null);
    const counterRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
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
                { clipPath: 'inset(100% 0 0 0)', scale: 1.05 }, // Starts fully clipped at the bottom
                { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.2, ease: 'power3.inOut' },
                "-=0.6" 
            );

            // 3. Fade in trust badges
            tl.fromTo(
                badgeGroupRef.current.children,
                { y: 15, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
                "-=0.8"
            );

            // 4. Animate the Counter (0 to 100+)
            const counterObj = { val: 0 };
            tl.to(counterObj, {
                val: 100,
                duration: 1.5,
                ease: 'power2.out',
                onUpdate: () => {
                    if (counterRef.current) {
                        counterRef.current.innerText = Math.floor(counterObj.val) + "+";
                    }
                }
            }, "-=0.5");

            // 5. Continuous slow breathing effect for the background glow
            gsap.to(glowRef.current, {
                scale: 1.1,
                opacity: 0.3,
                duration: 4,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut'
            });

        }, containerRef);

        return () => ctx.revert(); 
    }, []);

    // 6. Subtle Parallax effect on mouse move
    const handleMouseMove = (e) => {
        if (!containerRef.current || !imageRef.current || !glowRef.current) return;
        
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Calculate mouse position relative to center of screen (values from -1 to 1)
        const xPos = (clientX / innerWidth - 0.5) * 2;
        const yPos = (clientY / innerHeight - 0.5) * 2;

        // Move image slightly towards the mouse
        gsap.to(imageRef.current, {
            x: xPos * 15, // Max 15px movement
            y: yPos * 10,
            duration: 1,
            ease: 'power3.out'
        });

        // Move glow slightly away from the mouse for depth
        gsap.to(glowRef.current, {
            x: -xPos * 30,
            y: -yPos * 20,
            duration: 1.5,
            ease: 'power3.out'
        });
    };

    return (
        <div 
            ref={containerRef} 
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                // Reset parallax elements when mouse leaves
                gsap.to([imageRef.current, glowRef.current], { x: 0, y: 0, duration: 1, ease: 'power3.out' });
            }}
            className='relative flex flex-col md:flex-row flex-wrap bg-slate-900 rounded-2xl px-6 md:px-10 lg:px-20 overflow-hidden shadow-sm transition-all'
        >
            
            {/* Subtle Background Pattern */}
            <div className='absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent pointer-events-none'></div>

            {/* --- Left Side (Text & CTA) --- */}
            <div className='relative z-10 md:w-1/2 flex flex-col items-start justify-center gap-8 py-16 m-auto md:py-[8vw]'>
                
                <div ref={textGroupRef} className='flex flex-col gap-5 w-full'>
                    
                    <div className='inline-block px-3 py-1 bg-blue-500/10 border border-blue-400/20 rounded-md w-max'>
                        <span className='text-xs font-semibold tracking-widest text-blue-300 uppercase'>
                            Excellence in Healthcare
                        </span>
                    </div>

                    <h1 className='text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight tracking-tight'>
                        Advanced Patient <br />
                        <span className='text-blue-400'>
                            Care & Management
                        </span>
                    </h1>

                    <p className='text-slate-300 text-base md:text-lg font-light leading-relaxed max-w-lg'>
                        Streamline your healthcare experience. Connect with board-certified specialists and manage your appointments through our secure portal.
                    </p>

                    <a href="#speciality" className='group mt-4 flex items-center gap-3 bg-blue-600 py-3.5 px-8 rounded-lg text-white text-sm font-semibold hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 w-max'>
                        Book an Appointment 
                        <img className='w-4 transition-transform duration-300 group-hover:translate-x-1 brightness-0 invert' src={assets.arrow_icon} alt="Arrow" />
                    </a>
                </div>

                {/* --- Trust Indicators --- */}
                <div ref={badgeGroupRef} className='flex flex-wrap items-center gap-6 mt-4 border-t border-slate-700/50 pt-6 w-full'>
                    
                    <div className='flex items-center gap-3 group cursor-default'>
                        <div className='flex -space-x-3 transition-transform duration-300 group-hover:scale-105'>
                            <img className='w-10 h-10 rounded-full border-2 border-slate-900 object-cover bg-slate-800' src={assets.group_profiles} alt="Doctors" />
                        </div>
                        <div className='flex flex-col'>
                            {/* Number animated via GSAP */}
                            <span ref={counterRef} className='text-white text-sm font-bold tracking-wide'>0+</span>
                            <span className='text-slate-400 text-xs transition-colors duration-300 group-hover:text-blue-300'>Specialists</span>
                        </div>
                    </div>

                    <div className='w-px h-8 bg-slate-700/50 hidden sm:block'></div>

                    <div className='flex flex-col group cursor-default'>
                        <span className='text-white text-sm font-semibold tracking-wide'>Secure System</span>
                        <span className='text-slate-400 text-xs transition-colors duration-300 group-hover:text-blue-300'>HIPAA Compliant</span>
                    </div>

                    <div className='w-px h-8 bg-slate-700/50 hidden sm:block'></div>

                    <div className='flex flex-col group cursor-default'>
                        <span className='text-white text-sm font-semibold tracking-wide'>24/7 Support</span>
                        <span className='text-slate-400 text-xs transition-colors duration-300 group-hover:text-blue-300'>Instant Booking</span>
                    </div>

                </div>
            </div>

            {/* --- Right Side (Image & Glow) --- */}
            <div className='relative z-10 md:w-1/2 flex justify-center items-end mt-8 md:mt-0'>
                {/* Breathing Ambient Glow */}
                <div 
                    ref={glowRef}
                    className='absolute bottom-10 w-[80%] h-[80%] bg-blue-500/20 blur-3xl rounded-full pointer-events-none'
                ></div>
                
                <img 
                    ref={imageRef}
                    className='w-full max-w-lg md:absolute bottom-0 h-auto rounded-b-2xl object-cover pointer-events-none z-10' 
                    src={assets.header_img} 
                    alt="Healthcare Professional" 
                />
            </div>

        </div>
    );
}

export default Header;