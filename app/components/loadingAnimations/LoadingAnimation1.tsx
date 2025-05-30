'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function LoadingAnimation1() {
    const cards = 10;
    const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
    const [isVisible, setIsVisible] = useState(true); // 👈 kontrol visibilitas komponen

    useLayoutEffect(() => {
        if (!cardRefs.current) return;

        gsap.to(cardRefs.current, {
            y: -1000,
            autoAlpha: 1,
            ease: 'back.in(1.7)',
            duration: 0.5,
            stagger: {
                each: 0.08,
            },
            onComplete: () => {
                setIsVisible(false);
            },
        });
    }, []);

    if (!isVisible) return null; // 👈 jika tidak visible, jangan render apa pun

    return (
        <div className="w-full h-full flex items-center justify-center">
            {Array.from({ length: cards }).map((_, index) => (
                <div
                    key={index}
                    ref={(el) => {
                        cardRefs.current[index] = el;
                    }}
                    className="bg-white h-screen w-[10%]"
                />
            ))}
        </div>
    );
}
