import { useContext } from "react";
import { FormControl } from "@mui/material";
import Autocomplete, {
  TOption,
} from "Components/UI/molecules/Autocomplete/Autocomplete";
import { TBackOfficeUser } from "API/Types/backOfficeUsers";
import BackOfficeUsersContext from "Contexts/BackOfficeUsers/BackOfficeUsersContext";
import { usersToOptions } from "./helpers";

interface IProps {
  selectedItems?: TBackOfficeUser[];
  onItemsSelect: (users?: TBackOfficeUser[]) => void;
  className?: string;
  label?: string;
  disabled?: boolean;
}

const UserMultiSelect = ({
  className,
  label = "Assigned to",
  selectedItems,
  onItemsSelect,
  disabled = false,
}: IProps) => {
  const users = useContext<TBackOfficeUser[]>(BackOfficeUsersContext);

  const value: TOption[] | undefined = usersToOptions(selectedItems || []);
  const options: TOption[] = usersToOptions(users);

  const optionsToUsers = (items?: TOption[]): TBackOfficeUser[] | undefined => {
    const ids = items?.map(({ id }) => id) || [];
    return users.filter((user) => ids.includes(user.id));
  };

  const handleItemSelect = (selectedOptions?: TOption[]) => {
    onItemsSelect(optionsToUsers(selectedOptions));
  };

  return (
    <FormControl className={className ?? ""}>
      <Autocomplete
        multiple
        disabled={disabled}
        value={value}
        label={label}
        limitTags={1}
        onChange={(_, newValue) =>
          handleItemSelect(newValue as TOption[] | undefined)
        }
        options={options}
      />
    </FormControl>
  );
};
export default UserMultiSelect;
