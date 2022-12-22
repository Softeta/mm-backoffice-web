import { FormControl } from "@mui/material";
import { createJobPosition, useJobPositions } from "API/Calls/jobPositions";
import { TPosition } from "API/Types/position";
import Autocomplete from "Components/UI/molecules/Autocomplete";
import { TOption } from "Components/UI/molecules/Autocomplete/Autocomplete";
import useDebounce from "Hooks/useDebounce";
import { forwardRef, Ref, useEffect, useMemo, useState } from "react";
import {
  optionToPosition,
  positionsToOptions,
  positionToOption,
} from "./helpers";

interface IProps {
  selectedItem: TPosition | null;
  onItemSelect: (position: TPosition | null) => void;
  className?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
}

type TValue = TOption | null;

const PositionSingleSelect = forwardRef(
  (
    {
      selectedItem: selectedItemProp,
      onItemSelect,
      className = "",
      label = "Position",
      disabled = false,
      required = false,
      error,
      helperText,
    }: IProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const [searchInput, setSearchInput] = useState<[string, boolean]>([
      selectedItemProp?.code || "",
      false,
    ]);
    const [selectedItem, setSelectedItem] = useState<TPosition | null>();
    const [positions, setPositions] = useState<TPosition[]>([]);
    const { data, refetch } = useJobPositions(searchInput[0]);
    const debouncedSearchValue = useDebounce(searchInput);

    const value = useMemo(
      () => (selectedItem ? positionToOption(selectedItem) : null),
      [selectedItem]
    );

    const showCreateOption = useMemo(
      () =>
        selectedItem?.code !== debouncedSearchValue[0] &&
        debouncedSearchValue[0].length > 2,
      [debouncedSearchValue, selectedItem]
    );

    const options = useMemo(() => {
      const positionOptions = positionsToOptions(positions);
      return !showCreateOption
        ? positionOptions
        : [
            ...positionOptions,
            {
              code: searchInput[0],
              label: searchInput[0],
              labelNode: (
                <div>
                  <span className="mb-2 text-2xs font-normal text-grey-middle pr-2">
                    Create
                  </span>
                  {searchInput[0]}
                </div>
              ),
            },
          ];
    }, [showCreateOption, positions, searchInput]);

    const handleInputChange = (_: any, newValue: string) => {
      setSearchInput([newValue, true]);
      if (
        selectedItem &&
        selectedItem.code.toLowerCase() !== newValue.trim().toLowerCase()
      ) {
        setSelectedItem(null);
      }
    };

    const handleItemCreate = (item: TValue) => {
      if (!item || !item.code) return;
      createJobPosition({ code: item.code })
        .then((res) => {
          const { id, code } = res.data;
          if (!id) return;
          setSelectedItem({ id, code });
          onItemSelect({ id, code });
        })
        .catch(() => {
          setSearchInput([selectedItem?.code || "", false]);
        });
    };

    const handleItemSelect = async (item: TValue) => {
      if (!item?.id) {
        await handleItemCreate(item);
        return;
      }

      const position = item ? optionToPosition(item) : null;
      setSelectedItem(position);
      onItemSelect(position);
    };

    const handleBlur = () => {
      if (!selectedItem || !searchInput[0]) return;
      if (selectedItem.code !== searchInput[0])
        setSearchInput([selectedItem?.code || "", false]);
    };

    useEffect(() => {
      if (data?.data?.data) setPositions(data?.data?.data);
    }, [data?.data]);

    useEffect(() => {
      if (debouncedSearchValue[0].length > 1 && debouncedSearchValue[1]) {
        refetch();
      }
    }, [debouncedSearchValue, refetch]);

    useEffect(() => {
      if (selectedItemProp) {
        setSelectedItem(selectedItemProp);
      }
    }, [selectedItemProp]);

    return (
      <FormControl className={className}>
        <Autocomplete
          disabled={disabled}
          inputRef={ref}
          className={className}
          label={label}
          options={options}
          inputValue={searchInput[0]}
          value={value}
          required={required}
          error={!!error}
          helperText={helperText}
          onChange={(_, newInputValue) =>
            handleItemSelect(newInputValue as TValue)
          }
          onInputChange={handleInputChange}
          freeSolo
          onBlur={handleBlur}
        />
      </FormControl>
    );
  }
);

export default PositionSingleSelect;
