/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E91E63",
        secondary: "#FFC1CC",
        accent: "#8B4513",
        surface: "#FFF5F7",
        background: "#FFFBFC",
      },
      fontFamily: {
        'display': ['Fredoka One', 'cursive'],
        'body': ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}