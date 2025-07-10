/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './app/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        vanilla: '#d4e09b',
        lightyellow: '#f6f4d2',
        teagreen: '#cbdfbd',
        tangerine: '#f19c79',
      },
    },
  },
    plugins: [],
}