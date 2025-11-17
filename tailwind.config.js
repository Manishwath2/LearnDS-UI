/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'neo-dark': '#0B0F19',
        'neo-blue': '#3b82f6',
        'neo-red': '#ef4444',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neo': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1), 0 0 20px 0px rgba(59, 130, 246, 0.1)',
        'neo-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.1), 0 0 30px 0px rgba(59, 130, 246, 0.2)',
      },
    },
  },
  plugins: [],
}

