'use client';
import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeadingTextAnimation() {
    const headingRef = useRef(null);
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
        if (!headingRef.current || !isClient) return;
        const currentHeading = headingRef.current;
        
        // Set initial position to bottom center with full font size
        gsap.set(currentHeading, {
            y: window.innerHeight * 0.3, // Start at bottom
            scale: 1, // Start at full size
            
            transformOrigin: 'center center'
        });
        
        // Refresh ScrollTrigger untuk memastikan kalkulasi yang tepat
        ScrollTrigger.refresh();

        const animation = gsap.to(currentHeading, {
            x: isMobile ? -window.innerWidth * 0.3 : 0, 
            y: isMobile ? -window.innerHeight * 0.47 : -window.innerHeight * 0.47, // End at top center
            scale: isMobile ? 0.32 : 0.1,
            transformOrigin: 'center center',
            ease: 'none',
            // marker: true, // Removed invalid property
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: '+=100vh +=60vh', // Animation completes within first viewport
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
                ref={headingRef}
                className={`
                    fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    text-[#FF0B55] font-bold font-sans z-50 pointer-events-none
                    flex items-center justify-center
                    ${isMobile 
                        ? 'text-[20vw] leading-[0.8]' 
                        : 'text-[16vw] leading-[1]'
                    }
                `}
                style={{
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    perspective: '1000px'
                }}
            >
                MATTHEW
            </div>
        </>
    );
}