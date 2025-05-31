import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            setIsScrolled(scrollTop > 20); // Mulai animasi setelah scroll 50px
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav
            className={`fixed top-2 right-3 rounded-md bg-white text-black text-lg z-50 font-medium shadow-lg transition-all ease-in-out duration-500 ${
                isScrolled
                    ? 'px-4 py-2 md:px-8 md:py-4'
                    : 'px-6 py-2 md:px-12 md:py-4'
            }`}
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    x="3"
                    y="6"
                    width="18"
                    height="2"
                    rx="1"
                    fill="currentColor"
                />
                <rect
                    x="3"
                    y="16"
                    width="18"
                    height="2"
                    rx="1"
                    fill="currentColor"
                />
            </svg>
        </nav>
    );
};

export default Navbar;
