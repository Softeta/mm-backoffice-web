import { ReactNode } from "react";

interface ISidebar {
  children: ReactNode;
}

const Sidebar = ({ children }: ISidebar) => (
  <aside className="border-r border-alto bg-white px-4 pt-6">{children}</aside>
);

export default Sidebar;
