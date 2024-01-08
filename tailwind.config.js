/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'main-purple': '#9D2CF6',
        'secondary-grey': '#ccc',
      }
    },
  },
  plugins: [],
};

