/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e1272a", // vermelho IEQ
        quadrangular: {
          red: "#e1272a",
          yellow: "#ffcc29",
          blue: "#0054a6",
          purple: "#7b2d8f",
        },
      },
    },
  },
  plugins: [],
};

