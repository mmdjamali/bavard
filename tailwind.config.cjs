/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        violet : {
          "dark" : "#0B0033",
        },
      },
      screens:{
        "xs" : "400px"
      }
    },
  },
  plugins: [],
}
