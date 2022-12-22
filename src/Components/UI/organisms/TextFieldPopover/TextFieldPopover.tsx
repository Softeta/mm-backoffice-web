import ColorType from "Components/Enums/colorType";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";

import { ChangeEvent, useState, MouseEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { FormControl, Popover } from "@mui/material";
import TextField from "Components/UI/atoms/TextField";

interface ITextFieldPopover {
  buttonLabel?: string;
  inputLabel?: string;
  onSubmit: (value?: string) => void;
}

const TextFieldPopover = ({
  buttonLabel,
  inputLabel,
  onSubmit,
}: ITextFieldPopover) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [value, setValue] = useState<string | undefined>();

  const reset = () => {
    setValue(undefined);
  };

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.target as HTMLButtonElement);
  };

  const handleClose = () => {
    reset();
    setAnchorEl(null);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event?.target?.value);
  };

  const handleSubmit = () => {
    onSubmit(value);
    handleClose();
  };

  const isOpen = !!anchorEl;

  return (
    <>
      <Button
        onClick={handleOpen}
        variant={ButtonVariantType.Text}
        color={ColorType.Info}
        label={buttonLabel}
        startIcon={<AddIcon />}
      />
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onKeyDownCapture={(e) => e.stopPropagation()}
      >
        <div className="p-4 pb-2 min-w-dropdown">
          <FormControl className="w-full">
            <TextField
              value={value}
              onChange={handleChange}
              label={inputLabel}
            />
          </FormControl>
          <div className="mt-5 text-right flex">
            <div className="pr-3 ml-auto">
              <Button
                variant={ButtonVariantType.Outlined}
                color={ColorType.Info}
                label="Cancel"
                onClick={handleClose}
              />
            </div>
            <div>
              <Button label="Add" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
};

export default TextFieldPopover;
