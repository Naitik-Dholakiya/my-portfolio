/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#101c2b",
          900: "#172637",
          800: "#203347",
        },
      },
      fontFamily: {
        sans: ['"Avenir Next"', "Avenir", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
}
