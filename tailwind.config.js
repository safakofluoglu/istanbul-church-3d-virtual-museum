/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                midnight: '#0B132B',
                gold: {
                    DEFAULT: '#D4AF37',
                    light: '#E6C35C',
                    dark: '#B8962E',
                },
                accent: '#F5F5F5',
                muted: '#6C757D',
                // Section-specific colors
                dome: '#1A2A4F',
                gallery: '#2F3E66',
                apse: '#4A1F2D',
                gate: '#3B2F2F',
            }
        },
    },
    plugins: [],
}
