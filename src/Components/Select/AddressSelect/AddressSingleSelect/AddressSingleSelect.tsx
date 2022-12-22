import { FormControl } from "@mui/material";
import { useGeocoderSuggestions } from "API/Calls/autocompleteGeocoder";
import { TAddress } from "API/Types/address";
import { TGeocoderSuggestion } from "API/Types/Geocoder/geocoder";
import Autocomplete from "Components/UI/molecules/Autocomplete";
import { TOption } from "Components/UI/molecules/Autocomplete/Autocomplete";
import useDebounce from "Hooks/useDebounce";
import { SyntheticEvent, useEffect, useState } from "react";
import { formatAddressLine } from "./formatAddressLine";

interface IProps {
  onItemSelect: (address?: TAddress) => void;
  className?: string;
  label: string;
  required?: boolean;
  selectedValue?: string;
}

const AddressSingleSelect = ({
  onItemSelect,
  className,
  label,
  required,
  selectedValue = "",
}: IProps) => {
  const [suggestions, setSuggestions] = useState<TGeocoderSuggestion[]>([]);
  /* [0 - selected value, 1 - is need to refetch] */
  const [searchValue, setSearchValue] = useState<[string, boolean]>([
    selectedValue,
    false,
  ]);

  const debouncedSearchValue = useDebounce(searchValue);
  const { status, data, refetch } = useGeocoderSuggestions(searchValue[0]);

  useEffect(() => {
    if (status === "success") {
      const suggestionsResponse =
        data.data?.suggestions.map((x) => ({
          ...x,
          label: formatAddressLine(x),
        })) ?? [];
      setSuggestions(
        suggestionsResponse.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.label === value.label)
        )
      );
    }
  }, [status, data]);

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

  const handleItemSelectChanged = (value: TOption) => {
    setSuggestions([]);

    if (!value?.id) {
      onItemSelect(undefined);
      return;
    }

    const selectedSuggestion = suggestions.find(
      (x) => x.locationId === value.id
    );
    if (selectedSuggestion) {
      onItemSelect({
        addressLine: selectedSuggestion.label,
        country: selectedSuggestion.address.country,
        city: selectedSuggestion.address.city,
        postalCode: selectedSuggestion.address.postalCode,
      });
    }
  };

  const handleItemSelectBlured = (
    e?: React.FocusEvent<HTMLDivElement, Element>
  ) => {
    setSuggestions([]);
    const currentValue = (e?.target as HTMLInputElement)?.value;

    if (!searchValue[1]) return;

    if (!currentValue) {
      onItemSelect(undefined);
    }

    if (currentValue) {
      onItemSelect({
        addressLine: currentValue,
      });
    }
    setSearchValue([currentValue, false]);
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

export default AddressSingleSelect;
