import { useEffect, useState, forwardRef } from "react";
import Button from "Components/UI/atoms/Button";
import ColorType from "Components/Enums/colorType";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import Divide from "Components/UI/atoms/Divide";
import Select from "Components/UI/atoms/Select";
import MenuItem from "Components/UI/atoms/MenuItem";
import Checkbox from "Components/UI/atoms/Checkbox";
import AvatarWithText from "Components/UI/molecules/AvatarWithText";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import { FormControl } from "@mui/material";

export type TDropDownItem = {
  id: string;
  label: string;
  pictureUri?: string;
};

interface IDropDownProps {
  dataSource: TDropDownItem[];
  itemName: string;
  selected?: string[];
  resetValues?: boolean;
  className?: string;
  label?: string;

  onConfirmedSelections: (selections: string[]) => void;
}

const DropDown = forwardRef(
  (
    {
      dataSource,
      itemName,
      selected = [],
      resetValues,
      className,
      label,
      onConfirmedSelections,
    }: IDropDownProps,
    ref
  ) => {
    const [selectedItems, setSelectedItems] = useState<string[]>(selected);
    const [isOpen, setOpen] = useState<boolean>(false);

    useEffect(() => {
      if (resetValues) {
        setSelectedItems([]);
      }
    }, [resetValues]);

    const selectItem = (event: any) => {
      const {
        target: { value },
      } = event;

      setSelectedItems(typeof value === "string" ? value.split(",") : value);
    };

    const deselectItems = () => {
      setSelectedItems([]);
    };

    const formatSelectedItems = (items: string[]): string =>
      items.length > 1
        ? `${items.length} ${itemName}`
        : dataSource.find((x) => x.id === selectedItems[0])?.label || "";

    const closeDropdown = () => {
      setOpen(false);
      onConfirmedSelections(selectedItems);
    };

    const openDropdown = () => {
      setOpen(true);
    };

    const selectedItemsCount = selectedItems.length;

    return (
      <FormControl className={`dropdown ${className ?? ""}`}>
        <Select
          multiple
          label={label}
          open={isOpen}
          value={selectedItems}
          onChange={selectItem}
          onClose={closeDropdown}
          onOpen={openDropdown}
          MenuProps={{ classes: { paper: "dropdown" } }}
          renderValue={(items) => (
            <div className="h6">{formatSelectedItems(items as string[])}</div>
          )}
          ref={ref}
        >
          {selectedItemsCount > 0 && (
            <div className="flex flex-row-reverse mr-1 mt-1 mb-2">
              <Button
                className="text-xs font-normal"
                variant={ButtonVariantType.Text}
                color={ColorType.Info}
                label={`Deselect all (${selectedItemsCount})`}
                disabled={false}
                onClick={deselectItems}
              />
            </div>
          )}
          {dataSource.map((item) => (
            <MenuItem key={item.id} value={item.id} className="p-0 pt-1 pb-1">
              <Checkbox
                className="dropdown p-0 ml-2.5 pointer-events-none"
                checked={selectedItems.includes(item.id)}
                label={
                  <AvatarWithText
                    className="dropdown-text h6 ml-5 h-6"
                    imageURL={item.pictureUri}
                    size={AvatarSizeType.Medium}
                    title={item.label}
                  />
                }
              />
            </MenuItem>
          ))}
          <Divide size={1} />
          <div className="flex justify-between m-2.5 ml-3 mr-3">
            <div className="dropdown-text h6 self-center">
              {selectedItemsCount} {itemName} selected
            </div>
            <Button
              className="text-xs font-normal"
              label="Done"
              onClick={closeDropdown}
            />
          </div>
        </Select>
      </FormControl>
    );
  }
);
export default DropDown;
