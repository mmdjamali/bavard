/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,svelte,ts,js}"],
  theme: {
    extend: {
      transitionTimingFunction: {
        "back-in-out": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        // ispired by https://github.com/emilkowalski, EASE constant of vaul
        emil: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      fontSize: {
        xs: "0.8125em",
        sm: "0.9375rem",
      },
      opacity: {
        3: "0.03",
      },
    },
  },
  /** @satisfies {import('daisyui').Config} */
  daisyui: {
    themes: ["light", "dark"],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    require("daisyui"),
  ],
};
