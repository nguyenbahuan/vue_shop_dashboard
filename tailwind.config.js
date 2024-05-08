/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        // Simple 8 row grid
        "auto-rows": "auto 1fr",
        "auto-rows-2": "1fr auto auto",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
