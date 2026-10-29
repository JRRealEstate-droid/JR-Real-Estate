import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#0B0D0D',
          50: '#2A2E2E',
          100: '#202424',
          200: '#191C1C',
          300: '#141616',
          400: '#0E1010',
          500: '#0B0D0D',
          600: '#080909',
          700: '#050606',
          800: '#030303',
          900: '#000000',
        },
        gold: {
          light: '#F3DEB2',
          DEFAULT: '#D5A24A',
          hover: '#C6933D',
          dark: '#A6792A',
          muted: '#8D6926',
        },
        ivory: {
          DEFAULT: '#F7F1E6',
          surface: '#FAF6F0',
          muted: '#EFE7D8',
          border: '#E3D7C1',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 4px 20px -2px rgba(213, 162, 74, 0.25)',
        'gold-lg': '0 10px 25px -3px rgba(213, 162, 74, 0.35)',
        elevated: '0 20px 40px -15px rgba(11, 13, 13, 0.08)',
      },
      keyframes: {
        'kashi-drift': {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.03) translate(-0.8%, -0.4%)' },
          '100%': { transform: 'scale(1.01) translate(0.4%, -0.8%)' },
        },
        'ganga-flow': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-15px)' },
        },
        'diya-glow': {
          '0%, 100%': { opacity: '0.18', transform: 'scale(1)' },
          '50%': { opacity: '0.36', transform: 'scale(1.06)' },
        },
        'fade-rise': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer-gold': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'kashi-drift': 'kashi-drift 24s ease-in-out infinite alternate',
        'ganga-flow': 'ganga-flow 12s ease-in-out infinite',
        'diya-glow': 'diya-glow 5s ease-in-out infinite',
        'fade-rise': 'fade-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer-gold': 'shimmer-gold 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;

