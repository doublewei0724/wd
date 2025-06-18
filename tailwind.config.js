/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        popgothic: ['PopGothic', 'sans-serif'],
        popgothicB: ['PopGothicB', 'sans-serif']
      },
    },
  },
  plugins: [],
}

