/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af", // azul institucional
        secondary: "#facc15", // amarelo destaque
        background: "#f9fafb",
        text: "#1f2937"
      }
    }
  },
  plugins: []
};
