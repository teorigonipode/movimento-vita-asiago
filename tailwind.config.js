/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mv: {
          blue: '#185c42',
          'blue-light': '#247a58',
          'blue-dark': '#103d2c',
          teal: '#6ea91f',
          'teal-light': '#8bc63f',
          cream: '#fbfcf8',
          warm: '#e7eedf',
          gold: '#b38b35',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
