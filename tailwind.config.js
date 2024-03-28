/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "white": "rgb(255 255 255)",
      "black":"rgb(0 0 0)",
      "dark": "rgba(34, 33, 40, 1)",
      "gray5": "#bdbdbd",
      "gray4": "#8d8d8d",
      "gray6": "#8a8a8ab6",
      "blue2": "#5472d3",
      "blue3": "#0055a6",
      "blue4": "#25429e",
      "gray3": "#4d4d4d",
      "main-gray": "#707070",
      "main-blue": "#0055a6",
      "gray2": "#f5f5f5",
      "gray1": "#efefef",
      "gray7":"#323232",
      "red-500": "rgb(239 68 68)",
      "red-600" : "rgb(220 38 38)"
    },
    borderRadius:{
      "custom": "19px 81px 93px 17px / 60px 0px 0px 50px;"
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui"), require('tailwindcss-animated')],
};
