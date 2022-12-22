import { useState, useMemo, useEffect } from "react";
import AvatarWithText from "Components/UI/molecules/AvatarWithText";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import Autocomplete from "Components/UI/molecules/Autocomplete";
import TextField from "Components/UI/atoms/TextField";
import { TOption } from "Components/UI/molecules/Autocomplete/Autocomplete";
import Avatar from "Components/UI/atoms/Avatar";
import { FormControl } from "@mui/material";

export type TPersonItem = {
  id: string;
  name: string;
  pictureUri?: string;
};

type TValue = TOption | null;

interface IUserSingleSelect {
  persons: TPersonItem[];
  className?: string;
  onSelect: (id?: string) => void;
  selectedPersonId?: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

const UserSingleSelect = ({
  persons,
  onSelect,
  selectedPersonId,
  label,
  className,
  required,
  disabled = false,
  error,
  helperText,
}: IUserSingleSelect) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedPerson, setSelectedPerson] = useState<TPersonItem>();

  useEffect(() => {
    if (!searchInput) {
      setSelectedPerson(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    const person = persons.find((x) => x.id === selectedPersonId);
    setSelectedPerson(person);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPersonId]);

  const value: TValue = useMemo(
    () =>
      selectedPerson
        ? {
            id: selectedPerson.id,
            label: selectedPerson.name,
            pictureUri: selectedPerson.pictureUri,
          }
        : null,
    [selectedPerson]
  );

  const options: TOption[] = useMemo(
    () =>
      (persons || []).map((item) => ({
        id: item.id,
        label: item.name,
        labelNode: (
          <AvatarWithText
            size={AvatarSizeType.Small}
            title={item.name}
            imageURL={item.pictureUri}
          />
        ),
      })),
    [persons]
  );

  const hasLogo: boolean = useMemo(
    () => !!selectedPerson?.pictureUri,
    [selectedPerson]
  );

  const handleItemSelect = (item: TValue) => {
    if (item === null) {
      return;
    }

    const person = persons.find((p) => p.id === item.id);

    if (!person) return;

    setSelectedPerson(person);
    onSelect(person?.id);
  };

  const handleOptionsFiltering = (filterOptions: TOption[]): TOption[] =>
    filterOptions.filter((p) =>
      p.label.toLowerCase().includes(searchInput.toLowerCase())
    );

  const handleOnBlur = () => {
    if (!selectedPerson) {
      onSelect(undefined);
      setSearchInput("");
    }
  };

  const handleInputChange = (newInputValue: string) => {
    setSearchInput(newInputValue);
    setSelectedPerson(undefined);
  };

  return (
    <FormControl className={className ?? ""}>
      <Autocomplete
        className="mt-0"
        value={value}
        disabled={disabled}
        onChange={(_, newValue) => handleItemSelect(newValue as TValue)}
        inputValue={searchInput}
        onInputChange={(_, newInputValue) => handleInputChange(newInputValue)}
        onBlur={handleOnBlur}
        options={options}
        required={required}
        filterOptions={(ops) => handleOptionsFiltering(ops)}
        renderInput={(props) => (
          <TextField
            {...props}
            error={error}
            helperText={helperText}
            required={required && !selectedPerson}
            InputProps={{
              // eslint-disable-next-line react/prop-types
              ...props.InputProps,
              startAdornment: hasLogo ? (
                <Avatar
                  size={AvatarSizeType.Small}
                  imageURL={selectedPerson?.pictureUri}
                />
              ) : null,
            }}
            label={`${label} ${required && !selectedPerson ? "" : "*"}`}
          />
        )}
        freeSolo
      />
    </FormControl>
  );
};
export default UserSingleSelect;
