/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    transparent: 'transparent',
    current: 'currentColor',
    extend: {
      colors: {
        primary: {}
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'black', 'cupcake']
  }
};
