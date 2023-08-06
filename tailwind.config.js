// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Lato: ['Lato_400Regular'],
        sans: ['Lato_400Regular', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        blue: '#155C96',
      },
    },
  },
  plugins: [],
}
