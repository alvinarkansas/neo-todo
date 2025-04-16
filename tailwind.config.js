/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#FDF9EE",
        dark: "#000000",
        success: "#6BBD46",
        info: "#387FE6",
        danger: "#FE744F",
      },
      fontFamily: {
        brutal: ["Darker Grotesque", "sans-serif"],
      },
    },
  },
  plugins: [],
};
