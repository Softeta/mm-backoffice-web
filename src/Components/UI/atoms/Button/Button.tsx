import MuiButton from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import ColorType from "Components/Enums/colorType";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import { ReactNode } from "react";

export interface IButton extends ButtonProps {
  label?: ReactNode;
}

const Button = (props: IButton) => {
  const {
    variant = ButtonVariantType.Contained,
    color = ColorType.Primary,
    className = "",
    label,
    ...rest
  } = props;

  return (
    <MuiButton className={className} variant={variant} color={color} {...rest}>
      {label}
    </MuiButton>
  );
};

export default Button;
