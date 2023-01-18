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
      },
      keyframes:{
        "slide-down" : {
          "0%" : {transform: "translateY(25px)"},
          "100%" : {transform : "translateY(0)"},
        },
      },
      animation : {
        "slide-down" : "slide-down 1s forwards",
      }
    },
  },
  plugins: [],
}
