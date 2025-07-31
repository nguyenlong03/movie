/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // Custom colors for theme consistency
        primary: {
          light: '#ffffff',
          dark: '#111827'
        },
        secondary: {
          light: '#f9fafb',
          dark: '#1f2937'
        }
      },
      transitionProperty: {
        'theme': 'background-color, border-color, color, fill, stroke',
      }
    },
  },
  plugins: [],
};
