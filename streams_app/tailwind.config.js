/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  //purge: [],
  theme: {
    extend: {
      backgroundImage:{
        'bsu-entrance': "url('/public/Alangilan-entrance-facade.jpg')"
      },
      width: {
        'custom-15': '15%',
        'custom-20': '20%',
        'custom-30': '30%',
        'custom-35': '35%',
      },
      colors: {
        'bsu-blue': '#042334',
        'bsu-borders': '#36B4E7',
        'bsu-alt-base': '#0E5E7B',
        'bsu-base': '#FFFFFF',
        'bsu-hover': '#C4C6C7',
        'bsu-dropdown': '#4E636F',
      },
    },
  },
  plugins: [],
}
