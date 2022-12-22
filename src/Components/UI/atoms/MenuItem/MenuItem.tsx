import { MenuItem as MuiMenuItem } from "@mui/material";
import type { MenuItemProps } from "@mui/material/MenuItem";

const MenuItem = ({ className, ...props }: MenuItemProps) => (
  <MuiMenuItem className={`menu-item ${className ?? ""}`} {...props} />
);
export default MenuItem;
