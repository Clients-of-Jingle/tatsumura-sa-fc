/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./public/assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: "#102844",
        navy: "#0D2745",
        gold: "#B99A55",
        cream: "#F8F6F0",
        mist: "#EAF0F4"
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', "system-ui", "sans-serif"],
        serif: ['"Noto Serif JP"', "serif"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(16, 40, 68, .10)"
      }
    }
  },
  plugins: []
};
