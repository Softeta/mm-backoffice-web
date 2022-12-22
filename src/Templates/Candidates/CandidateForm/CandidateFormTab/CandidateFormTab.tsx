import React, { ReactNode } from "react";

interface ICandidateFormTab {
  open?: boolean;
  left?: () => ReactNode;
  right?: () => ReactNode;
}
const CandidateFormTab = ({ open, left, right }: ICandidateFormTab) => (
  <div
    className={`grid grid-cols-2 overflow-y-auto grow ${open ? "" : "hidden"}`}
  >
    <div className="px-6 py-8 border-r border-alto">{left?.()}</div>
    <div className="px-6 py-8">{right?.()}</div>
  </div>
);

export default CandidateFormTab;
