const colors = {
  selago: "#f8f9fe",
  alto: "#dcdcdc",
  "blue-main": "#5570ff",
  "blue-main-hover": "#2842CE",
  "blue-middle": "#ccd4ff",
  "blue-middle-hover": "#adbafc",
  "blue-secondary": "#ecefff",
  "blue-secondary-hover": "#ccd4ff",
  "blue-light": "#f5f7ff",
  yellow: "#ffc043",
  "yellow-hover": "#eaa316",
  "yellow-light": "#fff5e1",
  green: "#52ca47",
  "green-hover": "#23a718",
  "green-light": "#e9f9e8",
  orange: "#ff8b37",
  "orange-hover": "#e4680e",
  "orange-light": "#fae9dd",
  red: "#ef4242",
  "red-hover": "#d11313",
  "red-light": "#fbe7e7",
  "red-light-hover": "#f4bdbd",
  "grey-dark": "#09101d",
  "grey-middle": "#686c74",
  "grey-middle-hover": "#3d434d",
  "grey-light": "#dedede",
  "grey-light-hover": "#c4c4c4",
  "grey-lightest": "#c4c4c4",
  white: "#ffffff",
  mystic: "#DFE2EE",
  black: "#000000",
  "light-hover": "rgba(0, 0, 0, 0.05)",
  scorpion: "#585858",
  "buttery-white": "#fffbe9",
  "white-rock": "#ebe7d5",
  "selective-yellow": "#FFB800",
  "wild-sand": "#F6F6F6",
  "linkedin-blue": "#0077B5",
  transparent: "rgba(0, 0, 0, 0)",
};

const fontFamily = {
  sans: ["roboto", "sans-serif"],
};

const fontSize = {
  "2xs": ["10px", "12px"],
  tags: ["12px", "14px"],
  xs: ["12px", "16px"],
  sm: ["14px", "16px"],
  base: ["16px", "20px"],
  lg: ["20px", "24px"],
  xl: ["24px", "32px"],
  "2xl": ["32px", "40px"],
};

const extend = {
  boxShadow: {
    base: "0px 0px 40px #DFE2EE",
    table: "0px 0px 0px 1px #DCDCDC",
    modal: "0px 0px 40px rgba(0, 0, 0, .1)",
  },
  minWidth: {
    input: "160px",
    dropdown: "270px",
  },
  height: {
    "10v": "10vh",
    "20v": "20vh",
    "30v": "30vh",
    "40v": "40vh",
    "50v": "50vh",
    "60v": "60vh",
    "70v": "70vh",
    "80v": "80vh",
    "90v": "90vh",
    "100v": "100vh",
  },
};

module.exports = { colors, fontFamily, fontSize, extend };
