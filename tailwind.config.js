/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./public/**/*.js"],
  theme: {
    extend: {
      colors: {
        secondary: "#111926",
        grey: "#f7f8f9",
        grey2: "#c9c9c9",
        "grey-hover": "#8B8B8B",
      },
      backgroundImage: {
        "landing-image-1":
          "url('../imgs/marvin-meyer-SYTO3xs06fU-unsplash.jpg')",
        "landing-image-2":
          "url('../imgs/luke-chesser-JKUTrJ4vK00-unsplash.jpg')",
        "landing-image-3":
          "url('../imgs/carlos-muza-hpjSkU2UYSU-unsplash.jpg')",
      },
      height: {
        "landing-height": "calc(100vh - 80px)",
      },
      fontFamily: {
        montserrat: '"Montserrat", sans-serif',
      },
    },
  },
  plugins: [],
};
