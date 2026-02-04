import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Brand Colors
                'zavi-black': '#000000',
                'zavi-charcoal': '#0a0a0c',
                'zavi-surface': '#111114',
                'zavi-border': '#1a1a1f',
                'zavi-gray': '#2a2a30',
                // Accent
                'zavi-red': '#CC0000',
                'zavi-red-light': '#E60000',
                'zavi-red-dark': '#990000',
                // Text
                'zavi-white': '#FFFFFF',
                'zavi-light': '#E0E0E0',
                'zavi-muted': '#888888',
                'zavi-dim': '#555555',
            },
            fontFamily: {
                serif: ['Playfair Display', 'Georgia', 'serif'],
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'rotate': 'rotate 20s linear infinite',
                'glow': 'glow 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                rotate: {
                    '0%': { transform: 'rotateY(0deg)' },
                    '100%': { transform: 'rotateY(360deg)' },
                },
                glow: {
                    '0%, 100%': { filter: 'drop-shadow(0 0 40px rgba(204, 0, 0, 0.4))' },
                    '50%': { filter: 'drop-shadow(0 0 80px rgba(204, 0, 0, 0.6))' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
