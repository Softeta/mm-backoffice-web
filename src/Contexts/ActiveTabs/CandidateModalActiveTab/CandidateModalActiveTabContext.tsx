import { createContext } from "react";
import { ActiveTab } from "../Shared/ActiveTab";
import { CandidateModalTabSections } from "./CandidateModalTabSections";

export type CandidateModalActiveTab = ActiveTab<CandidateModalTabSections>;

const CandidateModalActiveTabContext = createContext<CandidateModalActiveTab>({
  activeTab: CandidateModalTabSections.Info,
  setActiveTab: () => CandidateModalTabSections.Info,
});

export default CandidateModalActiveTabContext;
