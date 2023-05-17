/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      animation: {
        explode: 'explode 0.5s forwards',
        'slide-down': 'slide-down 0.1s linear forwards',
        'slide-right': 'slide-right 0.1s linear forwards',
        push: 'push 0.1s forwards',
        vibrate: 'vibrate 0.3s ease infinite',
      },
      keyframes: {
        explode: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(3)' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: 1 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'slide-right': {
          '0%': { transform: 'translateX(-100%)', opacity: 1 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        push: {
          '100%': { transform: 'scale(0.9)', 'box-shadow': 'none'},
        },
        vibrate: {
          '0%': { transform: 'translate(-0.2rem, -0.2rem)' },
          '25%': { transform: 'translate(0.2rem, 0.2rem)' },
          '50%': { transform: 'translate(-0.2rem, 0.2rem)' },
          '75%': { transform: 'translate(0.2rem, -0.2rem)' },
          '100%': { transform: 'translate(-0.2rem, -0.2rem)' },
        },
      },
    },
  },
  plugins: [],
}
