import { Components, Theme } from "@mui/material";
import { colors } from "Theme/theme";

interface IMuiButton extends Components<Theme> {}

const disabledContained = {
  background: colors["grey-light"],
  color: colors.white,
};

const buttonTheme: IMuiButton["MuiButton"] = {
  styleOverrides: {
    containedPrimary: {
      color: colors.white,
      "&:hover": {
        background: colors["blue-main-hover"],
      },
      "&:disabled": disabledContained,
    },
    textPrimary: {
      "&:hover": {
        background: "none",
        color: colors["blue-main-hover"],
      },
    },
    root: {
      boxShadow: "none",
      "&:hover": {
        boxShadow: "none",
      },
      ".MuiTouchRipple-root": {
        display: "none",
      },

      "&.MuiButton-containedWarning": {
        background: colors.yellow,
        "&:hover": {
          background: colors["yellow-hover"],
        },
        "&:disabled": disabledContained,
      },
      "&.MuiButton-textWarning": {
        "&:hover": {
          background: "none",
          color: colors["yellow-hover"],
        },
      },

      "&.MuiButton-containedError": {
        background: colors["red-light"],
        color: colors.red,
        "& svg path": {
          fill: colors.red,
        },
        "&:hover": {
          color: colors["red-hover"],
          background: colors["red-light-hover"],
        },
        "&:disabled": disabledContained,
      },
      "&.MuiButton-textError": {
        "&:hover": {
          background: "none",
          color: colors["red-hover"],
        },
      },

      "&.MuiButton-containedSuccess": {
        background: colors.green,
        "&:hover": {
          background: colors["green-hover"],
        },
        "&:disabled": disabledContained,
      },
      "&.MuiButton-textSuccess": {
        color: colors.green,
        "&:hover": {
          color: colors["green-hover"],
          background: "none",
        },
      },

      "&.MuiButton-outlinedInfo": {
        color: colors.black,
        borderColor: colors["grey-light"],
        "&:hover": {
          background: colors["blue-secondary-hover"],
        },
        "&:disabled": {
          color: colors["grey-light"],
        },
      },
      "&.MuiButton-textInfo": {
        color: colors["grey-middle"],
        "&:hover": {
          background: "none",
          color: colors["grey-middle-hover"],
        },
        "&:disabled": {
          color: colors["grey-light"],
        },
        "&.bg-hover": {
          ":hover": {
            background: colors["blue-secondary-hover"],
          },
        },
      },
    },
  },
};

export default buttonTheme;
