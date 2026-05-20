/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#F5F1ED',
        'text-primary': '#2C2C2C',
        'accent': '#D4A574',
        'card-bg': '#FAFAF8',
        'border': '#E8E8E8',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
