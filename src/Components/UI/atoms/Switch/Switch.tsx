import { SwitchProps } from "@mui/material";
import MuiSwitch from "@mui/material/Switch";
import { forwardRef, Ref } from "react";

export interface ISwitch extends SwitchProps {
  text?: string;
}

const Switch = forwardRef((props: ISwitch, ref: Ref<HTMLButtonElement>) => {
  const { text, className, ...rest } = props;
  return (
    <div className={`input-switch ${className ?? ""}`}>
      <MuiSwitch ref={ref} {...rest} />
      {text && <div className="inline text-xs">{text}</div>}
    </div>
  );
});

export default Switch;
