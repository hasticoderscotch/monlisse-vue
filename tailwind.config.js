const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F7F6FD',
          100: '#EEEEFB',
          200: '#D5D4F5',
          300: '#BCB9EF',
          400: '#8A85E4',
          500: '#5851D8',
          600: '#4F49C2',
          700: '#353182',
          800: '#282461',
          900: '#1A1841',
        },
        black: '#040405',
        red: colors.red,
        teal: colors.teal,
        gray: colors.blueGray,
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
  variants: {
    scrollbar: ['rounded'],
  },
}
