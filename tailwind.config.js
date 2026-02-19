/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E1272A",
          gold: "#D4AF37",
          goldDark: "#B88916",
          night: "#0B0F1A",
          ink: "#111827",
          paper: "#F8FAFC",
          line: "#E5E7EB",
          muted: "#6B7280",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(17, 24, 39, 0.10)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
