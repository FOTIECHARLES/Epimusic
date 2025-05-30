/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp'),require('flowbite/plugin')],
};
