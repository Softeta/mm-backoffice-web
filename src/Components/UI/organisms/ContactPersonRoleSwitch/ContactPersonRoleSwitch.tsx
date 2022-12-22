import { forwardRef, useState, Ref } from "react";
import ContactPersonRoles from "Enums/contactPersonRoles";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonIcon from "@mui/icons-material/Person";
import ToggleSwitch from "../../molecules/ToggleSwitch";

const getSelectedValueIndex = (value: ContactPersonRoles): number =>
  Object.values(ContactPersonRoles).findIndex((x) => x === value);

interface IContactPersonRoleSwitch {
  selected: ContactPersonRoles;
  onChange?: (selected: ContactPersonRoles) => void;
  disabled?: boolean;
  className?: string;
}
const ContactPersonRoleSwitch = forwardRef(
  (
    { selected, onChange, disabled, className }: IContactPersonRoleSwitch,
    ref: Ref<HTMLDivElement>
  ) => {
    const [selectedIndex, setSelectedIndex] = useState(
      getSelectedValueIndex(selected)
    );

    const handleChange = (id: number) => {
      const selectedRole =
        id === 0 ? ContactPersonRoles.Admin : ContactPersonRoles.User;

      setSelectedIndex(getSelectedValueIndex(selectedRole));
      if (onChange) onChange(selectedRole);
    };

    return (
      <ToggleSwitch
        ref={ref}
        className={className}
        disabled={disabled}
        selected={selectedIndex}
        options={[
          {
            startIcon: <ManageAccountsIcon />,
            label: ContactPersonRoles.Admin,
          },
          { startIcon: <PersonIcon />, label: ContactPersonRoles.User },
        ]}
        onChange={handleChange}
      />
    );
  }
);

export default ContactPersonRoleSwitch;
