import { ReactNode } from "react";

interface ISectionHeading {
  title: string;
  button?: ReactNode;
}

const SectionHeading = ({ title, button = undefined }: ISectionHeading) => (
  <div className="flex justify-between items-center py-3">
    <h2 className="font-normal">{title}</h2>
    {button}
  </div>
);

export default SectionHeading;
