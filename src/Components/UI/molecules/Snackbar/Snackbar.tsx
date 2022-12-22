import { Snackbar as MuiSnackbar, Alert } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { snackbarState } from "./snackbarState";

export enum AlertType {
  info = "info",
  success = "success",
  warning = "warning",
  error = "error",
}

export const Snackbar = () => {
  const snackbar = useRecoilValue(snackbarState);
  const setSnackbar = useSetRecoilState(snackbarState);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <MuiSnackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
