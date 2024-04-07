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
      width: {
        'custom-15': '15%',
        'custom-20': '20%',
        'custom-30': '30%',
        'custom-35': '35%',
      }
    },
  },
  plugins: [],
}

