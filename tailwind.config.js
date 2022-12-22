const theme = require('./src/Theme/theme');

const { colors, fontFamily, fontSize, extend } = theme;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    colors,
    fontFamily,
    fontSize,
    extend
  },
  plugins: [],
};