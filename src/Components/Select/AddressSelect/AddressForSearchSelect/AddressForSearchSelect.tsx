import { FormControl } from "@mui/material";
import { useGeocoderSuggestions } from "API/Calls/autocompleteGeocoder";
import { fetchLocation } from "API/Calls/location";
import { TGeocoderSuggestion } from "API/Types/Geocoder/geocoder";
import { TLocation } from "API/Types/location";
import Autocomplete from "Components/UI/molecules/Autocomplete";
import { TOption } from "Components/UI/molecules/Autocomplete/Autocomplete";
import useDebounce from "Hooks/useDebounce";
import { SyntheticEvent, useEffect, useState } from "react";

interface IProps {
  onItemSelect: (location?: TLocation) => void;
  className?: string;
  label: string;
  required?: boolean;
  selectedValue?: string;
}

const AddressForSearchSelect = ({
  onItemSelect,
  className,
  label,
  required,
  selectedValue = "",
}: IProps) => {
  const [suggestions, setSuggestions] = useState<TGeocoderSuggestion[]>([]);
  const [searchValue, setSearchValue] = useState<[string, boolean]>([
    selectedValue,
    true,
  ]);

  const debouncedSearchValue = useDebounce(searchValue);
  const { status, data, refetch } = useGeocoderSuggestions(
    searchValue[0],
    true
  );

  useEffect(() => {
    if (status === "success") {
      setSuggestions(data.data?.suggestions ?? []);
    }
  }, [status, data]);

  useEffect(() => {
    setSearchValue([selectedValue, searchValue[1]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  useEffect(() => {
    if (
      debouncedSearchValue[0] &&
      debouncedSearchValue[0].length >= 2 &&
      debouncedSearchValue[1]
    ) {
      refetch();
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchValue, refetch]);

  const handleItemSelectChanged = async (value: TOption) => {
    setSuggestions([]);
    if (!value?.id) {
      onItemSelect(undefined);
      return;
    }

    const selectedSuggestion = suggestions.find(
      (x) => x.locationId === value.id
    );
    if (selectedSuggestion) {
      const location = await fetchLocation(selectedSuggestion.label);
      onItemSelect(location.data);
      setSearchValue([selectedSuggestion.label, false]);
    }
  };

  const handleItemSelectBlured = async (
    e?: React.FocusEvent<HTMLDivElement, Element>
  ) => {
    setSuggestions([]);
    const currentValue = (e?.target as HTMLInputElement)?.value;

    if (!searchValue[1]) return;

    setSearchValue([currentValue, false]);

    if (!currentValue) {
      onItemSelect(undefined);
      return;
    }

    try {
      const location = await fetchLocation(currentValue);
      onItemSelect(location.data);
    } catch (exception) {
      setSearchValue(["", false]);
      onItemSelect(undefined);
    }
  };

  const handleInputChange = (
    e: SyntheticEvent<Element, Event>,
    value: string
  ) => {
    if (e.type === "change") {
      setSearchValue([value, true]);
    } else {
      setSearchValue([value, false]);
    }
  };

  return (
    <FormControl className={className ?? ""}>
      <Autocomplete
        label={label}
        required={required}
        isShrink
        onBlur={handleItemSelectBlured}
        onChange={(_, newValue) => handleItemSelectChanged(newValue as TOption)}
        inputValue={searchValue[0]}
        onInputChange={(e, newInputValue) =>
          handleInputChange(e, newInputValue)
        }
        options={suggestions.map((x) => ({ id: x.locationId, label: x.label }))}
        filterOptions={(options) => options}
        freeSolo
        componentsProps={{
          paper: {
            sx: {
              width: "fit-content",
            },
          },
        }}
      />
    </FormControl>
  );
};

export default AddressForSearchSelect;
