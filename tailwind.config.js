/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        zoomDown: 'zoomDown 1s ease-out',
        spinSlow: 'spin 2s linear infinite',
        fadeOnBgP: 'fadeOnBgP 0.5s 0.75s ease-in-out forwards',
        fadeOnBgC: 'fadeOnBgC 0.5s 0.75s ease-in-out forwards',

        fadeOnBgPOne: 'fadeOnBgP 0.5s 0.5s ease-in-out forwards',
        fadeOnBgCOne: 'fadeOnBgC 0.5s 0.5s ease-in-out forwards',
        fadeOnBgPTwo: 'fadeOnBgP 0.5s 0.55s ease-in-out forwards',
        fadeOnBgCTwo: 'fadeOnBgC 0.5s 0.55s ease-in-out forwards',
        fadeOnBgPThree: 'fadeOnBgP 0.5s 0.6s ease-in-out forwards',
        fadeOnBgCThree: 'fadeOnBgC 0.5s 0.6s ease-in-out forwards',
        fadeOnBgPFour: 'fadeOnBgP 0.5s 0.65s ease-in-out forwards',
        fadeOnBgCFour: 'fadeOnBgC 0.5s 0.65s ease-in-out forwards',
        fadeOnBgPFive: 'fadeOnBgP 0.5s 0.7s ease-in-out forwards',
        fadeOnBgCFive: 'fadeOnBgC 0.5s 0.7s ease-in-out forwards',
        fadeOnBgPSix: 'fadeOnBgP 0.5s 0.75s ease-in-out forwards',
        fadeOnBgCSix: 'fadeOnBgC 0.5s 0.75s ease-in-out forwards',
        fadeOnBgPSeven: 'fadeOnBgP 0.5s 0.8s ease-in-out forwards',
        fadeOnBgCSeven: 'fadeOnBgC 0.5s 0.8s ease-in-out forwards',
        fadeOnBgPEight: 'fadeOnBgP 0.5s 0.85s ease-in-out forwards',
        fadeOnBgCEight: 'fadeOnBgC 0.5s 0.85s ease-in-out forwards',
        fadeOnBgPNine: 'fadeOnBgP 0.5s 0.9s ease-in-out forwards',
        fadeOnBgCNine: 'fadeOnBgC 0.5s 0.9s ease-in-out forwards',
      },
      keyframes: {
        zoomDown: {
          '0%': { opacity: 0.0, transform: 'scale(4)' },
          '100%': { opacity: 1.0, transform: 'rotate(1.0)' },
        },
        fadeOnBgP: {
          '0%': { backgroundColor: 'rgba(190, 155, 187, 0)' },
          '100%': { backgroundColor: 'rgba(190, 255, 187, 255)' },
        },
        fadeOnBgC: {
          '0%': { backgroundColor: 'rgba(255, 190, 190, 0)' },
          '100%': { backgroundColor: 'rgba(255, 190, 190, 255)' },
        },
        fadeOnBgC: {
          '0%': { backgroundColor: 'rgba(255, 190, 190, 0)' },
          '100%': { backgroundColor: 'rgba(255, 190, 190, 255)' },
        },
      },
      dropShadow: {
        xl: '0 10px 10px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
};
