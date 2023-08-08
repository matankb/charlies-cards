/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      Lato: ['"Lato"', 'Lato'],
    },
    colors: {
      blue: '#155C96',
      white: '#FFF',
    },
    extend: {},
  },
  plugins: [],
}
