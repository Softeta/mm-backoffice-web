import { SelectChangeEvent } from "@mui/material";
import MenuItem from "Components/UI/atoms/MenuItem";
import Select from "Components/UI/atoms/Select";
import HeaderVariantType from "./headerVariantTypes";

export interface IHeaderGroup {
  onChange: (variant: HeaderVariantType) => void;
  value: HeaderVariantType;
}

const HeaderGroup = ({ onChange, value }: IHeaderGroup) => {
  const current = Object.values(HeaderVariantType).includes(value)
    ? value
    : HeaderVariantType.normal;

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    event.preventDefault();

    const headerVariantType = event.target.value as HeaderVariantType;

    if (!headerVariantType) return;
    if (Object.values(HeaderVariantType).includes(headerVariantType)) {
      onChange(headerVariantType);
    }
  };

  return (
    <Select
      className="inline-block"
      name="headers"
      id="headers"
      variant="standard"
      value={current}
      onChange={handleChange}
    >
      <MenuItem value="header-one">Heading 1</MenuItem>
      <MenuItem value="header-two">Heading 2</MenuItem>
      <MenuItem value="header-three">Heading 3</MenuItem>
      <MenuItem value="unstyled">normal</MenuItem>
    </Select>
  );
};

export default HeaderGroup;
