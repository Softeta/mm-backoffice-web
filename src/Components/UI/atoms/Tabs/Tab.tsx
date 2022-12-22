import MuiTab, { TabProps } from "@mui/material/Tab";

const Tab = ({ className, ...props }: TabProps) => (
  <MuiTab className={`tab ${className ?? ""}`} {...props} />
);
export default Tab;
