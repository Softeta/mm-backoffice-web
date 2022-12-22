import { ReactNode } from "react";
import Button, { IButton } from "../Button/Button";

export interface IIconButton extends IButton {
  icon: ReactNode;
  className?: string;
}

const IconButton = ({ icon, className, ...rest }: IIconButton) => (
  <Button className={`icon-button ${className}`} {...rest} startIcon={icon} />
);

export default IconButton;
