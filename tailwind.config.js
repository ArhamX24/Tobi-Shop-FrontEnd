import { keyframes } from '@emotion/react'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "#eee",
        dark: "#1e293b",
      },
      textColor: {
        "screenColor": "#3BA5E0"
      },
      backgroundColor:{
        "screenColor": "#3BA5E0",
        "hoverColor" : "#0e5073"
      },
      height: {
        "img-height" : "70vh",
        "product-page": "75vh",
        "50vh" : "50vh"
      },
      width:{
        "1/10": "10%"
      },
    },
  },
    plugins: [
    require('daisyui'),
  ],
}