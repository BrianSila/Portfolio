/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        dark: 'var(--dark)',
        light: 'var(--light)',
        neutral: 'var(--neutral)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--text-dark)',
          },
        },
      },
    },
  },
  plugins: [],
};
