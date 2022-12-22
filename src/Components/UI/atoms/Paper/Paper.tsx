import { ReactNode } from "react";

interface IPaper {
  children: ReactNode;
}
const Paper = ({ children }: IPaper) => (
  <div className="rounded-lg bg-white p-4 shadow">{children}</div>
);
export default Paper;
