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
        primary: {
          DEFAULT: '#FF6B35', // UptoSkills Orange
          50: '#fff5f0',
          100: '#ffe8db',
          200: '#ffd0b8',
          300: '#ffaf8a',
          400: '#ff8452',
          500: '#ff6b35', // Base primary
          600: '#eb4a0f',
          700: '#c23405',
          800: '#9a2a0a',
          900: '#7e260c',
          950: '#441004',
        },
        secondary: {
          DEFAULT: '#00B5A5', // UptoSkills Teal
          50: '#f0fdfb',
          100: '#ccfbf4',
          200: '#9af5e8',
          300: '#5decd7',
          400: '#2cd9c4',
          500: '#00b5a5', // Base secondary
          600: '#009a8e',
          700: '#007b73',
          800: '#00625d',
          900: '#00514e',
          950: '#002f2e',
        },
        status: {
          success: '#10B981', // green
          warning: '#F59E0B', // amber
          error: '#EF4444',   // red
          info: '#3B82F6',    // blue
        },
        background: {
          light: '#F9F8F6',
          header: '#F3F1ED',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ['Plus Jakarta Sans', "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 10px rgba(0,0,0,0.05)",
        cardHover: "0 8px 25px rgba(0,0,0,0.08)"
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};
