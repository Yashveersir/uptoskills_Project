import { designTokens } from "./src/designTokens.js";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: designTokens.colors.primary,
        secondary: designTokens.colors.secondary,
        accent: designTokens.colors.secondary,
        status: designTokens.colors.status,
        background: designTokens.colors.background,
        neutral: designTokens.colors.neutral,
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ['Plus Jakarta Sans', "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: designTokens.shadows.card,
        cardHover: designTokens.shadows.cardHover,
        soft: designTokens.shadows.card,
        elevated: designTokens.shadows.cardHover,
        overlay: designTokens.shadows.overlay,
      },
      borderRadius: {
        sm: designTokens.radius.sm,
        md: designTokens.radius.md,
        lg: designTokens.radius.lg,
        xl: designTokens.radius.xl,
      },
    },
  },
  plugins: [],
};
