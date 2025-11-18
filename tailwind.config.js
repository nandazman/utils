/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#FFFBF5',
          100: '#FFF9E6',
          200: '#FFE6D5',
          300: '#FFD4A3',
          400: '#FFB36A',
          500: '#FF9B6A',
          600: '#FF7A4D',
        },
        cream: {
          100: '#FFFBF5',
          200: '#FFF9E6',
        },
        brown: {
          300: '#C4A882',
          400: '#A88060',
          500: '#8B6F47',
          600: '#5C4A38',
        }
      },
      fontFamily: {
        fredoka: ['Fredoka', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
