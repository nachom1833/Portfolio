import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // ✅ Activa modo oscuro controlado por clase
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Poppins", "sans-serif"], // ✅ Para títulos
      },
      colors: {
        primary: {
          DEFAULT: "#14b8a6", // teal-500 (color principal)
          dark: "#0d9488",   // teal-600 (hover en dark mode)
        },
        secondary: {
          DEFAULT: "#6366f1", // indigo-500
          dark: "#4f46e5",    // indigo-600
        },
        neutral: {
          light: "#f9fafb",
          dark: "#1f2937",
        },
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.1)", // ✅ Para tarjetas limpias
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // ✅ Tipografía profesional
    require("@tailwindcss/forms"), // ✅ Estilos bonitos para formularios
  ],
};

export default config;
