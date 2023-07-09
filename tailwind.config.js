/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        bigger: '1600px',
      },
      colors: {
        primary: {
          50: '#F7F5FF',
          100: '#989BBE',
          200: '#7F82AF',
          300: '#666A9F',
          400: '#555887',
          500: '#45486E',
          600: '#2F314C',
          700: '#1A1B29',
          800: '#040407',
          900: '#000000',
          950: '#000000',
        },
        bgColor: '#FAFAFA',
      },
    },
  },
  plugins: [],
};
