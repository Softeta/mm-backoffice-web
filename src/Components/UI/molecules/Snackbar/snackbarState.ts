import { AlertColor } from "@mui/material";
import { ReactNode } from "react";
import { atom } from "recoil";

export const snackbarState = atom<{
  open: boolean;
  severity: AlertColor;
  message: ReactNode | string;
}>({
  key: "snackbarState",
  default: {
    open: false,
    message: "",
    severity: "success",
  },
});

export default snackbarState;
