/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      colors: {
        amber: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        teal: {
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
        },
        stone: {
          50: "#FAFAF9",
          100: "#F5F5F4",
          200: "#E7E5E4",
          400: "#A8A29E",
          600: "#57534E",
          800: "#292524",
          900: "#1C1917",
        },
      },
      animation: {
        "wa-pulse": "wa-pulse 3s ease-out infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out both",
      },
      keyframes: {
        "wa-pulse": {
          "0%": { boxShadow: "0 0 0 0 rgba(16,185,129,0.5)" },
          "70%": { boxShadow: "0 0 0 14px rgba(16,185,129,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(16,185,129,0)" },
        },
        fadeInUp: {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
