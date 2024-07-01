/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,svg}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        main: '#0705EC',
        secondary: '#8C8D89',
        greenColor: '#28C584',
        redColor: '#EE3D60',
        thirtiary: '#blue',
      },
      width: {
        '655px': '655px',
        '120px': '120px',
      },
      height: {
        '52px': '52px',
        '40px': '40px',
      },
    },
  },
  plugins: [],
}
