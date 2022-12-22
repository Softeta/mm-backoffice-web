import { InputLabel, Select as MuiSelect } from "@mui/material";
import type { SelectProps } from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { forwardRef } from "react";

export interface ISelect extends SelectProps {
  label?: string;
}

const Select = forwardRef(
  (
    {
      children,
      className,
      label,
      id,
      fullWidth = true,
      disabled,
      onChange,
      ...props
    }: ISelect,
    ref
  ) => {
    const inputId =
      label && !id
        ? label.toLowerCase().replaceAll(/\s/g, "_").replaceAll(/\W/g, "")
        : id;
    return (
      <div className={`input-select ${className ?? ""}`}>
        {label && (
          <InputLabel id={`${inputId}-label`} disabled={disabled}>
            {label}
          </InputLabel>
        )}
        <MuiSelect
          className={fullWidth ? "w-full" : ""}
          id={inputId}
          disabled={disabled}
          labelId={label && `${inputId}-label`}
          label={label}
          onChange={onChange}
          ref={ref}
          IconComponent={(innerProps) => (
            <KeyboardArrowDownIcon {...innerProps} />
          )}
          {...props}
        >
          {children}
        </MuiSelect>
      </div>
    );
  }
);
export default Select;
