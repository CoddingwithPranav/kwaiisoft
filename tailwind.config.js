/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        base: 'var(--e8e8e8)',

        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        
      },
    },
  },
  plugins: [],
}

