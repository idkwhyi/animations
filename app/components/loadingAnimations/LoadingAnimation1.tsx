'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingAnimationProps {
    onFinish: () => void;
}

export default function LoadingAnimation1({ onFinish }: LoadingAnimationProps) {
    const cards = 10;
    const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

    useLayoutEffect(() => {
        if (!cardRefs.current) return;

        gsap.to(cardRefs.current, {
            y: -1000,
            autoAlpha: 1,
            ease: 'power1.out',
            duration: 0.5,
            stagger: {
                each: 0.045,
            },
            onComplete: () => {
                onFinish();
            },
        });
    }, [onFinish]);

    return (
        <div className="w-full h-screen fixed inset-0 z-50 flex items-center justify-center bg-transparent pointer-events-none">
            {Array.from({ length: cards }).map((_, index) => (
                <div
                    key={index}
                    ref={(el) => {
                        cardRefs.current[index] = el;
                    }}
                    className="bg-black h-screen w-[10%]"
                />
            ))}
        </div>
    );
}
