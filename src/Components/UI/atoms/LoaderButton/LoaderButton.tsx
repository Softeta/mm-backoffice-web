import { CircularProgress, CircularProgressProps } from "@mui/material";
import ColorType from "Components/Enums/colorType";
import { ReactNode } from "react";
import Button, { IButton } from "../Button/Button";
import ButtonVariantType from "../Button/buttonVariantType";

export interface ILoaderButton extends IButton {
  className?: string;
  loading?: boolean;
  label?: ReactNode;
  loaderProps?: CircularProgressProps;
}
const LoaderButton = ({
  className,
  loading,
  label,
  loaderProps,
  color = ColorType.Primary,
  variant = ButtonVariantType.Contained,
  ...rest
}: ILoaderButton) => {
  const loaderColor = (() => {
    if (variant === ButtonVariantType.Contained) {
      if (color === ColorType.Primary) return "#fff";
      if (color === ColorType.Secondary) return ColorType.Primary;
    }
    return color;
  })();

  return (
    <Button
      className={className}
      color={color}
      variant={variant}
      {...rest}
      label={
        <>
          {loading && (
            <div className="flex pr-2">
              <CircularProgress sx={{ color: loaderColor }} {...loaderProps} />
            </div>
          )}
          {label}
        </>
      }
    />
  );
};

export default LoaderButton;
