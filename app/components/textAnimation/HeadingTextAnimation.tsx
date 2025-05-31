'use client';
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeadingTextAnimation() {
    const headingRef = useRef(null);
    const [viewportHeight, setViewportHeight] = useState(0);

    useEffect(() => {
        setViewportHeight(window.innerHeight); // hindari SSR crash
    }, []);

    useEffect(() => {
        if (!headingRef.current || viewportHeight === 0) return;

        const targetOffsetFromTop = 140; // Jarak dari atas

        gsap.fromTo(
            headingRef.current,
            { y: 0 },
            {
                y: -viewportHeight + targetOffsetFromTop,
                scale: 0.2,
                ease: 'none',
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: 'bottom bottom',
                    end: 'top center+=40', 
                    scrub: true,
                    // markers: true,
                },
            }
        );
    }, [viewportHeight]);

    return (
        <h1
            ref={headingRef}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 text-[#dd2d4a] font-bold text-[16vw] leading-none font-anton z-50 pointer-events-none"
        >
            Animations
        </h1>
    );
}
