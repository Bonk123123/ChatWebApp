import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                light: 'white',
                lightHover: '#eeeeee',

                dark: 'black',
                darkHover: '#222222',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            borderWidth: {
                standard: '3px',
            },
            keyframes: {
                loading: {
                    from: { width: '0' },
                    to: { width: '100%' },
                },
                borderAnim: {
                    '0%': { borderWidth: '0' },
                    '1%': { borderWidth: '0 1px' },
                    '40%': { borderWidth: '0 3px' },
                    '60%': { borderWidth: '0 3px' },
                    '99%': { borderWidth: '0 1px' },
                    '100%': { borderWidth: '0' },
                },
            },
            animation: {
                loading: 'loading 3s steps(6, jump-none) infinite',
                borderAnim: 'borderAnim 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            },
        },
    },
    plugins: [],
};
export default config;
