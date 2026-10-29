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
    },
  },
  plugins: [],
};

export default config;
