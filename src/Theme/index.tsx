import { createTheme } from "@mui/material/styles";
import buttonTheme from "Components/UI/atoms/Button/theme";
import { colors } from "Theme/theme";

const Theme = createTheme({
  components: {
    MuiButton: buttonTheme,
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: colors["blue-main"],
    },
    secondary: {
      main: colors["blue-secondary"],
    },
    warning: {
      main: colors.yellow,
    },
    error: {
      main: colors.red,
    },
  },
});

export default Theme;
