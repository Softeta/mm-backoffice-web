import { ReactNode } from "react";
import MuiLink, { LinkProps } from "@mui/material/Link";

interface ILink {
  disabled?: boolean;
  children?: ReactNode;
}

const Link = ({ disabled, children, ...props }: ILink & LinkProps) => (
  <MuiLink
    {...props}
    className={`${props.className} ${
      disabled ? "pointer-events-none cursor-default" : ""
    }`}
  >
    {children}
  </MuiLink>
);

export default Link;
