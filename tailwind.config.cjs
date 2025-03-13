/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
          'fade-in-up': {
              '0%': {
                  opacity: '0',
                  transform: 'translateY(10px)'
              },
              '100%': {
                  opacity: '1',
                  transform: 'translateY(0)'
              },
          },
          'wave': {
              '0%': { transform: 'rotate(0.0deg)' },
              '10%': { transform: 'rotate(14deg)' },
              '20%': { transform: 'rotate(-8deg)' },
              '30%': { transform: 'rotate(14deg)' },
              '40%': { transform: 'rotate(-4deg)' },
              '50%': { transform: 'rotate(10.0deg)' },
              '60%': { transform: 'rotate(0.0deg)' },
              '100%': { transform: 'rotate(0.0deg)' },
          },
          'slide-in': {
              '0%': {
                  opacity: '0',
                  transform: 'translateX(-20px)'
              },
              '100%': {
                  opacity: '1',
                  transform: 'translateX(0)'
              },
          },
      },
      animation: {
          'fade-in-up': 'fade-in-up 0.5s ease-out',
          'wave': 'wave 2.5s ease-in-out infinite',
          'slide-in': 'slide-in 0.5s ease-out forwards',
      },
    },
  },
  plugins: []
}