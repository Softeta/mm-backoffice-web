import MuiTabs, { TabsProps } from "@mui/material/Tabs";

const Tabs = ({ className, ...props }: TabsProps) => (
  <MuiTabs className={`tabs ${className ?? ""}`} {...props} />
);
export default Tabs;
