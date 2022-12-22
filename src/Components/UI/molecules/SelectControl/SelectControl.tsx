import { FormControl, SelectChangeEvent, SelectProps } from "@mui/material";
import MenuItem from "Components/UI/atoms/MenuItem";
import Select from "Components/UI/atoms/Select";
import { ReactNode } from "react";

export type TSelectItem = {
  id: string;
  label: string | JSX.Element;
};

interface ISelectControl extends SelectProps {
  dataSource?: TSelectItem[];
  selected?: string[];
  className?: string;
  label?: string;
  value?: string;
  onChange?: (event: SelectChangeEvent<unknown>, child: ReactNode) => void;
}
const SelectControl = ({
  dataSource,
  className,
  label,
  value = "",
  onChange,
  ...props
}: ISelectControl) => (
  <FormControl className={className}>
    <Select
      className="w-auto"
      label={label}
      value={value}
      onChange={onChange}
      {...props}
    >
      <MenuItem className="h-5"> </MenuItem>
      {dataSource?.map((el) => (
        <MenuItem key={el.id} value={el.id}>
          {el.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
export default SelectControl;
