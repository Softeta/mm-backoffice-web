import TextField from "Components/UI/atoms/TextField";
import MenuItem from "Components/UI/atoms/MenuItem";
import Select from "Components/UI/atoms/Select";
import { InputAdornment, SelectChangeEvent } from "@mui/material";
import { forwardRef, Ref, useEffect, useState } from "react";
import {
  isValidPhoneNumber,
  parsePhoneNumber as libParsePhoneNumber,
} from "libphonenumber-js";
import countryCodes from "Assets/CountryCodes.json";

interface IOption {
  value: string;
  label: string;
}

interface IPhoneInput {
  className?: string;
  countryCode?: string;
  number?: string;
  label?: string;
  required?: boolean;
  onChange: (countryCode?: string, number?: string, isValid?: boolean) => void;
  onError?: (isError: boolean) => void;
}

export type TPhoneNumber = {
  countryCode?: string;
  number: string;
  isValid?: boolean;
};

const COUNTRY_CODE_OPTIONS: IOption[] = countryCodes.map((country) => ({
  label: country.code,
  value: country.dial_code,
}));

const DK_CODE = COUNTRY_CODE_OPTIONS.find(
  (country) => country.label === "DK"
)?.value;

const validate = ({
  countryCode = DK_CODE,
  number = "",
}: TPhoneNumber): boolean => {
  const fullNumber = `${countryCode}${number}`;
  try {
    const parser = libParsePhoneNumber(fullNumber);
    return isValidPhoneNumber(fullNumber, parser.country);
  } catch (err) {
    return false;
  }
};

export const PhoneInput = forwardRef(
  (
    {
      className,
      countryCode: initialCountryCode = DK_CODE,
      number: initialNumber = "",
      label = "Phone no.",
      required,
      onChange,
      onError,
    }: IPhoneInput,
    ref: Ref<HTMLDivElement>
  ) => {
    const [{ countryCode, number, isValid }, setPhoneNumber] =
      useState<TPhoneNumber>({
        countryCode: initialCountryCode,
        number: initialNumber,
        isValid:
          initialNumber || required
            ? validate({
                countryCode: initialCountryCode,
                number: initialNumber,
              })
            : true,
      });
    const [isDirty, setIsDirty] = useState<boolean>(false);

    useEffect(() => {
      if (onError) {
        onError(!isValid);
      }
    }, [isValid, onError]);

    const clear = () => {
      setIsDirty(false);
      setPhoneNumber({
        countryCode: undefined,
        number: "",
        isValid: !required,
      });
    };

    const handleCountryCodeChange = (event: SelectChangeEvent<unknown>) => {
      const newPhoneNumber = {
        countryCode: event.target.value as string | undefined,
        number,
      };
      setPhoneNumber({
        ...newPhoneNumber,
        isValid: number || required ? validate(newPhoneNumber) : true,
      });
    };

    const handlePhoneNumberChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const newPhoneNumber = {
        countryCode,
        number: event.target.value as string,
      };

      if (!newPhoneNumber.number) {
        clear();
        return;
      }
      setPhoneNumber({ ...newPhoneNumber, isValid: validate(newPhoneNumber) });
    };

    const handleSubmit = () => {
      setIsDirty(!!number);
      if (number) {
        onChange(`${countryCode ?? DK_CODE}`, number, !!isValid);
      } else {
        onChange(undefined, undefined, !!isValid);
      }
    };

    useEffect(() => {
      const newPhoneNumber = {
        countryCode: initialCountryCode,
        number: initialNumber,
      };

      setPhoneNumber({
        ...newPhoneNumber,
        isValid: initialNumber || required ? validate(newPhoneNumber) : true,
      });
    }, [initialCountryCode, initialNumber, required]);

    return (
      <TextField
        ref={ref}
        error={!isValid && isDirty}
        type="number"
        inputMode="numeric"
        className={`phone-input ${className ?? ""}`}
        label={label}
        value={number}
        helperText={isDirty && !isValid ? "Phone number invalid" : ""}
        onChange={handlePhoneNumberChange}
        onBlur={handleSubmit}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Select
                variant="standard"
                value={countryCode ?? DK_CODE}
                onChange={handleCountryCodeChange}
              >
                {COUNTRY_CODE_OPTIONS.map((option: IOption) => (
                  <MenuItem key={option.label} value={option.value}>
                    <span className="px-1">{`${option.label} (${option.value})`}</span>
                  </MenuItem>
                ))}
              </Select>
            </InputAdornment>
          ),
        }}
      />
    );
  }
);

export default PhoneInput;
