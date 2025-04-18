/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        '1/2': '50%',
        '1/3': '33.3333%',
        '2/3': '66.6667%',
        'full': '100%',
      },
      backgroundColor: {
        'primary-color': '#005f86',
        'secondary-color': '#e6eff3'
      },
      colors: {
        'primary-color': '#005f86',
        'secondary-color': '#e6eff3'
      },
      backgroundImage: {
        'header-gradient': 'linear-gradient(90deg, hsla(197, 100%, 26%, 1) 0%, hsla(198, 100%, 41%, 1) 100%)',
      }
    },
  },
  plugins: [],
}

