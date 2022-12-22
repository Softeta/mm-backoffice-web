import ToggleSwitch from "Components/UI/molecules/ToggleSwitch";
import GroupsIcon from "@mui/icons-material/Groups";
import ArchiveIcon from "@mui/icons-material/Archive";

export enum GridMode {
  Active,
  Archive,
}

interface IGridToggle {
  selected: GridMode;
  onChange: (selected: GridMode) => void;
}
const GridToggle = ({ selected, onChange }: IGridToggle) => {
  const handleChange = (id: number) => {
    if (id === 1) onChange(GridMode.Archive);
    else onChange(GridMode.Active);
  };

  return (
    <ToggleSwitch
      selected={selected}
      options={[
        { startIcon: <GroupsIcon />, label: "Active candidates" },
        { startIcon: <ArchiveIcon />, label: "Archived candidates" },
      ]}
      onChange={handleChange}
    />
  );
};

export default GridToggle;
