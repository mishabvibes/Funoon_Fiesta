/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D63C3E',
        secondery: '#DB3F43',
      },
      fontFamily: {
        sans: ['Nexa', 'sans-serif'],
      },
    },
  },
  plugins: [],
}