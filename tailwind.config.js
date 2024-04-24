/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#e8e8e8',

        primary: '#00F407',
        secondary: '#001122',
        
      },
    },
  },
  plugins: [],
}

