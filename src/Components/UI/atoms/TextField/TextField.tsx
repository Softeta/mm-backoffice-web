import MuiTextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material";
import { forwardRef, Ref, useState } from "react";

const TextField = forwardRef(
  ({ className, ...props }: TextFieldProps, ref: Ref<HTMLDivElement>) => {
    const [isDirty, setIsDirty] = useState<boolean>(false);

    const handleOnBlur = (
      event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
    ) => {
      setIsDirty(!!props.error);

      if (props.onBlur) {
        props.onBlur(event);
      }
    };

    return (
      <MuiTextField
        ref={ref}
        {...props}
        error={
          (props.required && !props?.inputProps?.value && isDirty) ||
          props.error
        }
        className={`input-text w-full ${className ?? ""}`}
        onBlur={handleOnBlur}
      />
    );
  }
);
export default TextField;
