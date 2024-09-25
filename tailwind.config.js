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
        'outer': '2rem',
        'inner': '4rem',
      },
      padding:{
        'space': '2rem'
      }, 
    },
  },
  plugins: [require('tailwindcss-primeui')]
}

