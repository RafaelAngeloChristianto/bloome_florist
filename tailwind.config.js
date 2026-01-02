/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'halant': ['Halant', 'serif'],
        'hammersmith': ['Hammersmith One', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
