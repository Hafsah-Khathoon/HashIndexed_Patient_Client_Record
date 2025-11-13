/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          primary: '#007b83',
          dark: '#005a61',
          light: '#009ca5',
        }
      }
    },
  },
  plugins: [],
}

