/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f9fc',
          100: '#e4f1f6',
          200: '#c5e1ed',
          300: '#9ccbe0',
          400: '#68afd0',
          500: '#4295c1',
          600: '#337ba6',
          700: '#2c6587',
          800: '#2a5670',
          900: '#274a5e',
        },
        secondary: {
          50: '#fffcf2',
          100: '#fff8e1',
          200: '#f9edc7',
          300: '#f2d694',
          400: '#e9b44c',
          500: '#e69f25',
          600: '#d17b1a',
          700: '#ad5918',
          800: '#8c461a',
          900: '#733b19',
        },
        cream: '#FFFCF2',
        butter: '#F2D694',
        gold: '#E9B44C',
      }
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [],
}