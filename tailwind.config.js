
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      cardBackground: "#F5F5EF",
      textLight: "#999999",
      cardBackgroundDark: "#F4F2DE",
      buttonPrimary: "#B69F6F",
      // Add more colors as needed, or use Tailwind's default colors
    },
    extend: {
      fontFamily: {
        onest: ['Onest', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        inter: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
