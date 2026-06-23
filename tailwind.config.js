/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mv: {
          blue: '#1e3a5f',
          'blue-light': '#2a5080',
          'blue-dark': '#152a45',
          teal: '#2d8a8a',
          'teal-light': '#3daaaa',
          cream: '#faf8f5',
          warm: '#f5f0e8',
          gold: '#c9a84c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
