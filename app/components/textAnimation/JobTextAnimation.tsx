'use client';
import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Type untuk GSAP animation
type GSAPTween = gsap.core.Tween;

gsap.registerPlugin(ScrollTrigger);

export default function JobTextAnimation() {
    const jobRef = useRef<HTMLDivElement>(null);
    const scrollAnimationRef = useRef<GSAPTween | null>(null);
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
        
        // Set initial state untuk intro animation (hidden dan di bawah)
        gsap.set(currentHeading, {
            y: isMobile ? window.innerHeight * 0.6 : window.innerHeight * 0.4,
            opacity: 0,
            scale: 1,
            transformOrigin: 'center center'
        });
        
        // Timeline untuk intro animation
        const introTimeline = gsap.timeline();
        
        // Intro animation: slide up from bottom dengan fade in
        introTimeline.to(currentHeading, {
            y: window.innerHeight * 0.3, // Final position untuk start scroll animation
            opacity: 1,
            duration: isMobile ? 1.5 : 1.2,
            ease: 'power3.out',
            delay: 0.5 // Delay sebelum animasi dimulai
        });
        
        // Setelah intro selesai, setup scroll animation
        introTimeline.call(() => {
            // Refresh ScrollTrigger untuk memastikan kalkulasi yang tepat
            ScrollTrigger.refresh();

            const scrollAnimation = gsap.to(currentHeading, {
                y: -window.innerHeight * 0.47,
                x: -window.innerWidth * 0.5,
                scale: isMobile ? 0.32 : 0.1,
                transformOrigin: 'center center',
                ease: 'none',
                opacity: 0,
                rotate: -10,
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: '+=10vh', // Animation completes within first viewport
                    scrub: 1,
                    invalidateOnRefresh: true,
                    markers: false,
                    onRefresh: () => {
                        // Recalculate positions on refresh
                        gsap.set(currentHeading, {
                            y: window.innerHeight * 0.3,
                            scale: 1,
                            opacity: 1
                        });
                    }
                }
            });

            // Store scroll animation di ref untuk cleanup
            scrollAnimationRef.current = scrollAnimation;
        });

        return () => {
            // Cleanup intro timeline
            introTimeline.kill();
            
            // Cleanup scroll animation jika ada
            if (scrollAnimationRef.current) {
                scrollAnimationRef.current.kill();
                scrollAnimationRef.current = null;
            }
            
            // Cleanup ScrollTrigger instances
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
                    fixed top-[10vh] left-[20vw] -translate-x-1/2 -translate-y-1/2
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