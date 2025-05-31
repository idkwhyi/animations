'use client';
import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function JobTextAnimation() {
    const jobRef = useRef(null);
    const [isClient, setIsClient] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect client-side dan mobile
    useEffect(() => {
        setIsClient(true);
        
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useLayoutEffect(() => {
        if (!jobRef.current || !isClient) return;
        const currentHeading = jobRef.current;
        
        // Set initial position to bottom center with full font size
        gsap.set(currentHeading, {
            y: window.innerHeight * 0.3, // Start at bottom
            scale: 1, // Start at full size
            transformOrigin: 'center center'
        });
        
        // Refresh ScrollTrigger untuk memastikan kalkulasi yang tepat
        ScrollTrigger.refresh();

        const animation = gsap.to(currentHeading, {
            y: -window.innerHeight * 0.47,
            x: -window.innerWidth * 0.5 ,
            scale: isMobile ? 0.32 : 0.1,
            transformOrigin: 'center center',
            ease: 'none',
            opacity: 0,
            rotate: -15,
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: '+=10vh', // Animation completes within first viewport
                scrub: 1,
                invalidateOnRefresh: true,
                markers: true,
                onRefresh: () => {
                    // Recalculate positions on refresh
                    gsap.set(currentHeading, {
                        y: window.innerHeight * 0.3,
                        scale: 1
                    });
                }
            }
        });

        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === document.body || trigger.trigger === currentHeading) {
                    trigger.kill();
                }
            });
        };
    }, [isClient, isMobile]);

    // Jangan render sampai client-side ready
    if (!isClient) {
        return null;
    }

    return (
        <>            
            <div
                ref={jobRef}
                className={`
                    fixed top-[10%] left-[20%] -translate-x-1/2 -translate-y-1/2
                    text-white font-bold font-sans z-50 pointer-events-none
                    flex items-center justify-center text-center
                    ${isMobile 
                        ? 'text-[8vw] leading-[0.8]' 
                        : 'text-[4vw] leading-[1]'
                    }
                `}
                style={{
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    perspective: '1000px'
                }}
            >
                Software<br/>Engineer
            </div>
        </>
    );
}