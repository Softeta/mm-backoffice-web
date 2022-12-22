import { ReactNode, Ref } from "react";
import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
} from "@mui/material";
import MenuItem from "Components/UI/atoms/MenuItem";
import TextField from "Components/UI/atoms/TextField";

export type TOption = {
  id?: string;
  code?: string;
  label: string;
  labelNode?: React.ReactNode;
  data?: any;
};

interface IAutocomplete
  extends Omit<
    AutocompleteProps<TOption, boolean, boolean, boolean>,
    "renderInput" | "options"
  > {
  options: TOption[];
  className?: string;
  label?: string;
  required?: boolean;
  isShrink?: boolean;
  error?: boolean;
  helperText?: string;
  inputRef?: Ref<HTMLDivElement>;
  renderInput?: (params: AutocompleteRenderInputParams) => ReactNode;
}

const Autocomplete = ({
  options,
  className,
  label,
  required,
  isShrink,
  inputRef,
  error,
  helperText,
  ...rest
}: IAutocomplete) => (
  <MuiAutocomplete
    className={`mm-autocomplete ${className ?? ""}`}
    options={options}
    renderInput={(inputProps) => (
      <TextField
        {...inputProps}
        ref={inputRef}
        label={label}
        value={rest.inputValue}
        required={required}
        error={!!error}
        helperText={helperText}
        InputLabelProps={isShrink ? { shrink: true } : {}}
      />
    )}
    getOptionLabel={(option) => option.label?.toString() || ""}
    renderOption={(props, option, state) =>
      !state.selected ? (
        <MenuItem {...props} key={option.id} id={option.id}>
          {option.labelNode || option.label || ""}
        </MenuItem>
      ) : null
    }
    isOptionEqualToValue={(option, value) =>
      !!(option.id && option.id === value.id)
    }
    includeInputInList={false}
    popupIcon={null}
    {...rest}
  />
);

export default Autocomplete;
