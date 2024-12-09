/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#2B6CB0',
          dark: '#215387',
          bg: '#ffffff'
        },
        neutral: {
          darkest: '#19202B',
          darkGray: '#2E3748',
          mediumGray: '#495568',
          lightGray: '#718096',
          offWhite: '#F7FAFC',
          lightGrayBlue: '#EDF2F7'
        }
      }
    },
  },
  plugins: [],
};