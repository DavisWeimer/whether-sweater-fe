/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
        'dm-sans-bold': ['DM Sans Bold', 'sans-serif'],
        'dm-sans-bold-italic': ['DM Sans Bold Italic', 'sans-serif'],
        
      }
    },
  },
  plugins: [],
}