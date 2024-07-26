/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#15A3B7",
        second:"#5A5A5A"
      },
      fontFamily:{
        inter: ["Inter", "sans-serif"]
      },
    },
  },
  plugins: [],
}

