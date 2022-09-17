/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'customShadow': '0 0 10px rgba(0, 0, 0, 0.5)',
      },
      minWidth: {
        'customMinWdith': '800px',
      },
      // hover:{
      //   'color'
      //   'trans':'scale(1.2)',
      // }

    },
  },
  plugins: [],
}
