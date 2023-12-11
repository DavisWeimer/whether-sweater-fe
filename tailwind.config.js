/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'turq-gradient-to-b': 'linear-gradient(180deg, rgba(0, 198, 186, 0.20) 0%, rgba(32, 32, 32, 0.20) 100%)',
      },
      colors: {
        offWhite: '#E4E2DD',
        lightGray: '#8F8F8F',
        darkGray: '#323232',
        turquiose: '#00C6BA'
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
        'dm-sans-bold': ['DM Sans Bold', 'sans-serif'],
        'dm-sans-bold-italic': ['DM Sans Bold Italic', 'sans-serif'],
        
      }
    },
  },
  plugins: [],
}