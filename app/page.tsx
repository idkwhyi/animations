'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Navbar from './components/Navbar';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingAnimation1 from './components/loadingAnimations/LoadingAnimation1';
import HeadingTextAnimation from './components/textAnimation/HeadingTextAnimation';
import JobTextAnimation from './components/textAnimation/JobTextAnimation';
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const homeRef = useRef(null);
    const [loadingFinished, setLoadingFinished] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    // detect hydration
    useEffect(() => {
        window.scrollTo(0, 0);
        setHasMounted(true);
    }, []);

    // Initial mount animation
    useEffect(() => {
        if (!hasMounted) return;

        gsap.to(homeRef.current, {
            scale: 1,
            ease: 'power1.out',
            duration: 0.8,
        });
    }, [hasMounted]);

    // Scroll animation
    useEffect(() => {
        if (!loadingFinished) return;

        const element = homeRef.current;
        gsap.fromTo(
            element,
            { opacity: 1, scale: 1 },
            {
                scale: 0.5,
                opacity: 0.5,
                scrollTrigger: {
                    trigger: element,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            }
        );
    }, [loadingFinished]);

    // Prevent hydration mismatch
    if (!hasMounted) return null;

    return (
        <>
            {!loadingFinished && (
                <LoadingAnimation1 onFinish={() => setLoadingFinished(true)} />
            )}

            <div className="w-screen h-full">
                {/* Navbar */}
                <Navbar />
                {/* Hero Section */}
                <div
                    ref={homeRef}
                    className="home-bg w-screen h-[100vh] flex items-center justify-center"
                ></div>
                <JobTextAnimation/>
                <HeadingTextAnimation />

                {/* Content berikutnya */}
                <div className="min-h-screen text-white p-10">
                    <h2 className="text-2xl font-bold mb-4">
                        Section Berikutnya
                    </h2>
                    <p>
                        Ini adalah konten utama setelah efek scroll GSAP
                        selesai.
                    </p>
                </div>
            </div>
        </>
    );
}
