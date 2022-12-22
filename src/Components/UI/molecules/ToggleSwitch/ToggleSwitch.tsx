import { forwardRef, ReactNode, Ref } from "react";
import Button from "Components/UI/atoms/Button";

type TSwitchButton = {
  label: string;
  startIcon?: ReactNode;
};

interface IToggleSwitch {
  selected?: number;
  options: TSwitchButton[];
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

const ToggleSwitch = forwardRef(
  (
    { options, selected = 0, onChange, disabled, className }: IToggleSwitch,
    ref: Ref<HTMLDivElement>
  ) => {
    const handleClick = (id: number) => {
      onChange(id);
    };
    return (
      <div
        className={`p-1 bg-blue-light rounded w-fit col-span-2 ${className}`}
        ref={ref}
      >
        {options.map(({ label, startIcon }, index) => {
          const id = index;
          return (
            <Button
              className={`toggle-switch inline-block ${
                disabled ? "pointer-events-none" : ""
              } ${selected === id && "selected"}`}
              key={id}
              startIcon={startIcon}
              label={label}
              size="small"
              onClick={() => handleClick(id)}
            />
          );
        })}
      </div>
    );
  }
);

export default ToggleSwitch;
