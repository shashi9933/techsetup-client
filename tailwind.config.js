/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#e35701',
                    hover: '#f7660b',
                },
                background: {
                    DEFAULT: '#000000',
                    alt: '#181818',
                },
                text: {
                    DEFAULT: 'rgba(255, 255, 255, 0.74)',
                    heading: '#ffffff',
                },
                border: 'rgba(255, 255, 255, 0.2)',
                accent: '#94a3b8',
            },
            fontFamily: {
                base: ['Open Sans', 'sans-serif'],
                heading: ['Roboto', 'sans-serif'],
            },
            container: {
                center: true,
                padding: '3em',
                screens: {
                    DEFAULT: '1200px',
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
    ],
} 