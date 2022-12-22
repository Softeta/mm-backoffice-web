import {
  useState,
  useMemo,
  ReactElement,
  ChangeEvent,
  MouseEvent,
} from "react";
import { FormControl, Menu } from "@mui/material";
import MenuItem from "Components/UI/atoms/MenuItem";
import AvatarWithText from "Components/UI/molecules/AvatarWithText";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import SearchField from "Components/UI/atoms/SearchField";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import ColorType from "Components/Enums/colorType";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Divide from "Components/UI/atoms/Divide";

export type TFilterItem = {
  id: string;
  label: string;
  pictureUri?: string;
};

interface IContactSelect {
  dataSource: TFilterItem[];
  /* Base element to click on */
  button: ReactElement<HTMLButtonElement>;
  /* Style for container of the base element. */
  className?: string;
  /* Is seacrh case sensitive */
  caseSensitive?: boolean;
  onSelect: (id: string) => void;
  onNewContactAdd: () => void;
}

const ContactSelect = ({
  dataSource,
  button,
  className,
  caseSensitive = false,
  onSelect,
  onNewContactAdd,
}: IContactSelect) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [search, setSearch] = useState<string>("");

  const handleOpen = (event: MouseEvent<HTMLDivElement>) => {
    setSearch("");
    setAnchorEl(event.target as HTMLButtonElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event?.target?.value ?? "");
  };

  const handleSelect = (id: string) => {
    onSelect(id);
    handleClose();
  };

  const handleNewContactClick = () => {
    setAnchorEl(null);
    onNewContactAdd();
  };

  const open = !!anchorEl;

  const filtered: TFilterItem[] = useMemo(
    () =>
      caseSensitive
        ? dataSource.filter((el) => el.label.includes(search))
        : dataSource.filter((el) =>
            el.label.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          ),
    [search, dataSource, caseSensitive]
  );

  return (
    <>
      <div className={className} onClick={handleOpen} aria-hidden="true">
        {button}
      </div>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onKeyDownCapture={(e) => e.stopPropagation()}
      >
        <div className="w-40 min-w-dropdown">
          <FormControl className="w-full px-4">
            <SearchField value={search} onChange={handleSearch} />
          </FormControl>
          <div className="px-4 py-2 max-h-40 overflow-y-auto">
            {filtered.map((option, index) => (
              <MenuItem
                className={`pr-0 pl-0 ${
                  index > 0 ? "border-t border-solid border-alto" : ""
                }`}
                key={option.id}
                value={option.id}
                onClick={() => handleSelect(option.id)}
                tabIndex={0}
              >
                <AvatarWithText
                  imageURL={option.pictureUri}
                  title={option.label}
                  size={AvatarSizeType.Medium}
                  showImagePlaceholder
                />
              </MenuItem>
            ))}
          </div>
          <Divide size={2} />
          <Button
            className="w-full"
            variant={ButtonVariantType.Text}
            label="Create a new contact"
            color={ColorType.Info}
            startIcon={<PersonAddIcon />}
            onClick={handleNewContactClick}
          />
        </div>
      </Menu>
    </>
  );
};
export default ContactSelect;
