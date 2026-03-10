/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#3470c3',
                    light: '#5a8fd4',
                    dark: '#2356a0',
                },
                surface: {
                    light: '#FFFFFF',
                    dark: '#1A1D27',
                },
                background: {
                    light: '#F5F7FA',
                    dark: '#0F1117',
                },
                brand: '#3470c3',
            },
        },
    },
    plugins: [],
};
