/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#FFCCD5', 
          200: '#FFA3B1',
          300: '#FF7A8C', 
          400: '#FF5268',
          500: '#FF0040',
          600: '#E60039',
          700: '#B8002D', 
          800: '#8A0022', 
          900: '#5C0016',
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    flowbite.plugin(),
  ],
}

