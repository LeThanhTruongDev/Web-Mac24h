/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Đảm bảo quét đúng file
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Font mặc định
        lobster: ['Lobster', 'cursive'], // Font Lobster
      },
    },
  },
  plugins: [],
};
