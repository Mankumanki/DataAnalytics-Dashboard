/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideDownAnim: {
          "0%": { height: "0", opacity: "0" },
          "100%": { height: "9rem", opacity: "1" },
        },
        showAnim: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUpAnim: {
          "0%": { height: "9rem", opacity: "1" },
          "100%": { height: "0", display: "none", opacity: "0" },
        },
      },
      animation: {
        slideDown: "slideDownAnim 0.5s ease-in-out",
        slideUp: "slideUpAnim 0.5s ease-in-out forwards",
        show: "showAnim 0.4s ease-in-out",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
