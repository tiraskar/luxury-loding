
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      textLight: "#999999",
      textDark: "#222222",
      cardBackgroundLight: "#F5F5EF",
      cardBackgroundDark: "#F4F2DE",
      buttonPrimary: "#B69F6F",
      black: "#000000",
      white: "#FFFFFF",
      textGray: "#E7E7E5"
      // Add more colors as needed, or use Tailwind's default colors
    },
    extend: {
      fontFamily: {
        onest: ['Onest', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        inter: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
    screens: {
      'xxs': '350px',
      'xs': '450px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [],
};
