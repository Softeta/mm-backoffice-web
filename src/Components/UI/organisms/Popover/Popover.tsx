import MuiPopover, { PopoverProps } from "@mui/material/Popover";
import PopupHeader from "Components/UI/molecules/PopupHeader";

interface IPopover extends PopoverProps {
  showHeader?: boolean;
  headerLabel?: string;
  onClose: () => void;
}

const Popover = ({
  children,
  showHeader,
  headerLabel,
  anchorOrigin,
  onClose,
  className,
  ...props
}: IPopover) => (
  <MuiPopover
    className={`popover ${className ?? ""}`}
    anchorOrigin={
      anchorOrigin ?? {
        vertical: "bottom",
        horizontal: "left",
      }
    }
    onClose={onClose}
    {...props}
  >
    <>
      {showHeader && (
        <PopupHeader label={headerLabel ?? ""} onClose={onClose} />
      )}
      {children}
    </>
  </MuiPopover>
);

export default Popover;
