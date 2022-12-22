import TextField from "Components/UI/atoms/TextField";
import Currencies from "Assets/Currencies.json";
import MenuItem from "Components/UI/atoms/MenuItem";
import Select from "Components/UI/atoms/Select";
import { InputAdornment, SelectChangeEvent } from "@mui/material";
import { ChangeEvent, forwardRef, Ref } from "react";
import { TCurrency } from "API/Types/currency";

interface IValue {
  currency: string;
  ammount?: number;
}

interface IName {
  currency: string;
  ammount: string;
}

export interface IChange {
  currency: (event: SelectChangeEvent<unknown>) => void;
  ammount: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

interface ICurrencySelectWithInput {
  className?: string;
  value: IValue;
  name: IName;
  label: string;
  onChange: IChange;
  onBlur?: () => void;
  disabled?: boolean;
}

export const CurrencySelectWithInput = forwardRef(
  (
    {
      className,
      value,
      name,
      label,
      onChange,
      onBlur,
      disabled = false,
    }: ICurrencySelectWithInput,
    ref: Ref<HTMLDivElement>
  ) => (
    <div className={`currency-select-with-input ${className ?? ""}`}>
      <TextField
        ref={ref}
        type="number"
        inputMode="numeric"
        className="p-0"
        disabled={disabled}
        label={label}
        value={value.ammount ? +value.ammount : ""}
        onChange={onChange.ammount}
        onBlur={onBlur}
        name={name.ammount}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Select
                disabled={disabled}
                variant="standard"
                className="border-none w-12 pb-1"
                fullWidth={false}
                value={value.currency}
                onChange={onChange.currency}
                name={name.ammount}
                renderValue={(currencyCode) =>
                  Currencies.find(
                    (currency: TCurrency) => currencyCode === currency.code
                  )?.code
                }
              >
                {Currencies.map((currency: TCurrency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {`${currency.symbol} ${currency.code}`}
                  </MenuItem>
                ))}
              </Select>
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
);

export default CurrencySelectWithInput;
