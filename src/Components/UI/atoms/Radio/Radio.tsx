import MuiRadio from "@mui/material/Radio";
import type { RadioProps } from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import type { FormControlLabelProps } from "@mui/material/FormControlLabel";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonCheckedTwoTone";

interface IRadio extends Omit<FormControlLabelProps, "control"> {
  className?: string;
  RadioProps?: RadioProps;
}
const Radio = ({ className, RadioProps, ...props }: IRadio) => {
  const disabled = !!(props?.disabled || RadioProps?.disabled);
  return (
    <FormControlLabel
      className={`input-radio ${className ?? ""} `}
      disabled={disabled}
      {...props}
      control={
        <MuiRadio
          className={RadioProps?.className}
          disabled={disabled}
          icon={disabled ? <CircleTwoToneIcon /> : <RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />}
          {...RadioProps}
        />
      }
    />
  );
};
export default Radio;
