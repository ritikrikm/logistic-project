/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#262E68',
        'primary-light': '#3E4A99',
        'primary-dark': '#1C2351',
        secondary: '#F06724',
        'secondary-light': '#F5894D',
        'secondary-dark': '#C14D14',
      },
    },
  },
  plugins: [],
};
