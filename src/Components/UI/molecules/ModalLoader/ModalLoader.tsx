import { CircularProgress, Modal as MuiModal } from "@mui/material";
import React from "react";

interface IProps {
  open: boolean;
}
const ModalLoader = ({ open }: IProps) => (
  <MuiModal open={open}>
    <div className="w-100v h-100v flex items-center justify-center">
      <CircularProgress />
    </div>
  </MuiModal>
);

export default ModalLoader;
