import { Menu } from "@mui/material";
import ColorType from "Components/Enums/colorType";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import MenuItem from "Components/UI/atoms/MenuItem";
import { MouseEvent, useState } from "react";
import { ReactComponent as TagIcon } from "Assets/Icons/tag.svg";
import Divide from "Components/UI/atoms/Divide";
import SelectedCandidateStages from "Enums/selectedCandidateStages";
import options from "./helpers/options";

interface IStatusSelect {
  onSelect: (option: SelectedCandidateStages) => void;
  selectedCandidatesCount: number;
}

const StatusSelect = ({ onSelect, selectedCandidatesCount }: IStatusSelect) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();
  const open = !!anchorEl;
  const [items, setItems] = useState(options(selectedCandidatesCount));

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setItems(options(selectedCandidatesCount));
    setAnchorEl(event.target as HTMLButtonElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option: SelectedCandidateStages) => () => {
    onSelect(option);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        label="Change status"
        variant={ButtonVariantType.Contained}
        color={ColorType.Primary}
        startIcon={<TagIcon />}
        onClick={handleOpen}
      />
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <div className="px-4 py-2">
          {items &&
            items.map(({ value, label, disabled, subOption, divider }) => (
              <>
                <MenuItem
                  disabled={disabled}
                  className={`px-3 text-sm font-normal text-grey-dark ${
                    subOption ? "pl-12" : ""
                  }`}
                  key={value}
                  value={value}
                  onClick={value && handleSelect(value)}
                  tabIndex={0}
                >
                  {label}
                </MenuItem>
                {divider && <Divide className="opacity-70" size={0} />}
              </>
            ))}
        </div>
      </Menu>
    </>
  );
};

export default StatusSelect;
