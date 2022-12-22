import { forwardRef, Ref } from "react";
import { Autocomplete, StandardTextFieldProps } from "@mui/material";
import TextField from "Components/UI/atoms/TextField";

interface IProps extends Omit<StandardTextFieldProps, "onChange"> {
  options?: number[];
  value?: number;
  onChange?: (value?: number) => void;
  onEnter?: () => void;
}

const defaultOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const NumberSelect = forwardRef(
  (
    {
      className,
      label,
      options = defaultOptions,
      value,
      onChange,
      onEnter,
      ...rest
    }: IProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const handleChange = (_: any, val: null | string | number) => {
      if (!onChange) return;
      if (val === null) onChange(undefined);
      if (typeof val === "number") onChange(val);
    };

    const handleInputChange = (_: any, val: string) => {
      if (!onChange) return;
      if (!Number.isInteger(Number(value))) return;
      onChange(Number(val));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") onEnter?.();
    };

    return (
      <Autocomplete
        disablePortal
        className={`number-select ${className ?? ""}`}
        freeSolo
        value={value}
        options={options}
        getOptionLabel={(option) => (option ? option.toString() : "")}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        renderInput={(params) => (
          <TextField
            {...params}
            ref={ref}
            label={label}
            InputProps={{
              ...params.InputProps,
              type: "number",
            }}
            {...rest}
          />
        )}
      />
    );
  }
);

export default NumberSelect;
