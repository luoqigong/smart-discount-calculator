/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'amazon-orange': '#FF9900',
        'success-green': '#00C851',
        'warning-yellow': '#FFB600',
        'danger-red': '#FF4444',
        'neutral-gray': '#6C757D',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 