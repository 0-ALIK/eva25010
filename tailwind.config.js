/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main': 'url(/bg.jpg)',
      },
      margin:{
        'outer': '6rem',
        'inner': '4rem',
      },
      padding:{
        'space': '3rem'
      }, 
    },
  },
  plugins: [require('tailwindcss-primeui')]
}

