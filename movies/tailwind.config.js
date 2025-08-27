/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['var(--font-sans)'],
        },
        screens: {
          sm: 'var(--breakpoint-sm)',
          md: 'var(--breakpoint-md)',
          lg: 'var(--breakpoint-lg)',
          xl: 'var(--breakpoint-xl)',
        },
        colors: {
          'movie-primary': 'hsl(var(--color-movie-primary))',
          'movie-secondary': 'hsl(var(--color-movie-secondary))',
          'movie-dark': 'hsl(var(--color-movie-dark))',
          'movie-darker': 'hsl(var(--color-movie-darker))',
          'movie-light': 'hsl(var(--color-movie-light))',
          'gray-300': 'hsl(var(--color-gray-300))',
          'gray-800': 'hsl(var(--color-gray-800))',
        },
      },
    },
    plugins: [],
  };