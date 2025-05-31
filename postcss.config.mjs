const config = {
    content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
    theme: {
        extend: {
            keyframes: {
                floatUp: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
            animation: {
                floatUp: 'floatUp 1s ease-in-out infinite',
            },
            fontFamily: {
                sans: ['var(--font-anton)'],
            },
        },
    },
    plugins: ["@tailwindcss/postcss"],
};

export default config;
