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
        },
        secondary: {
          "100": "#CCF5F9",
          "200": "#99EBF2",
          "300": "#66E0EC",
          "400": "#33D6E6",
          "500": "#00CCE0",
          "600": "#00B8CB",
          "700": "#0093A3",
          "800": "#006D7B",
          "900": "#004753"
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

