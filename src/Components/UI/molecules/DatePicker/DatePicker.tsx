import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import type { DesktopDatePickerProps } from "@mui/lab/DesktopDatePicker";
import TextField from "Components/UI/atoms/TextField";
import { forwardRef, Ref } from "react";

interface IProps {
  required?: boolean;
  helperText?: string;
  error?: boolean;
}

const DatePicker = forwardRef(
  (
    {
      className,
      PaperProps,
      value = null,
      required,
      helperText,
      error,
      ...props
    }: IProps & Omit<DesktopDatePickerProps, "renderInput">,
    ref: Ref<HTMLDivElement>
  ) => (
    <DesktopDatePicker
      className={`date-input ${className ?? ""}`}
      renderInput={(params) => (
        <TextField
          ref={ref}
          {...params}
          required={!!required}
          error={!!error}
          helperText={helperText}
        />
      )}
      PaperProps={{ className: `calendar ${PaperProps ?? ""}` }}
      inputFormat={props.inputFormat ?? "dd-MM-yyyy"}
      mask={props.mask ?? "__-__-____"}
      value={value}
      {...props}
    />
  )
);
export default DatePicker;
