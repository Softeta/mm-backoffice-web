import MuiCheckbox from "@mui/material/Checkbox";
import type { CheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import SquareTwoToneIcon from "@mui/icons-material/SquareTwoTone";
import CheckBoxOutlineBlankTwoToneIcon from "@mui/icons-material/CheckBoxOutlineBlankTwoTone";
import { forwardRef, ReactElement, Ref } from "react";

interface ICheckbox extends CheckboxProps {
  label: ReactElement | string;
}

const Checkbox = forwardRef(
  ({ className, label, ...props }: ICheckbox, ref: Ref<HTMLButtonElement>) => {
    const disabled = !!props?.disabled;
    return (
      <FormControlLabel
        className={`input-checkbox ${className ?? ""} `}
        label={label}
        control={
          <MuiCheckbox
            ref={ref}
            disabled={disabled}
            icon={
              disabled ? (
                <SquareTwoToneIcon />
              ) : (
                <CheckBoxOutlineBlankTwoToneIcon />
              )
            }
            {...props}
          />
        }
      />
    );
  }
);
export default Checkbox;
