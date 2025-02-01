/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6E6FF',
          100: '#CCCCFF',
          200: '#9999FF',
          300: '#6666FF',
          400: '#3333FF',
          500: '#000080', // Navy blue base
          600: '#000066',
          700: '#00004D',
          800: '#000033',
          900: '#00001A',
        },
        secondary: {
          50: '#FFFDF0',
          100: '#FFFBE0',
          200: '#FFF7C2',
          300: '#FFF3A3',
          400: '#FFEF85',
          500: '#FFD700', // Gold base
          600: '#CCAC00',
          700: '#998100',
          800: '#665600',
          900: '#332B00',
        },
        cream: '#FFFDD0',
        background: {
          DEFAULT: '#FFFDD0', // Cream for backgrounds
          dark: '#000080', // Navy blue for dark backgrounds
        }
      },
      backgroundColor: {
        'gradient-primary': 'linear-gradient(45deg, #000080, #FFD700)',
      },
      rotate: {
        'y-180': '180deg',
      },
      padding: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.touch-scroll-momentum': {
          '-webkit-overflow-scrolling': 'touch',
        },
      })
    }
  ],
}
