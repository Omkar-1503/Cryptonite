/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#CAEBF2',
        secondary: '#A9A9A9',
        accent: '#FF3B3F',
        background: '#EFEFEF',
        textPrimary: '#1C1C1C',
        textSecondary: '#333333',
      },
    },
  },
  plugins: [],
}

