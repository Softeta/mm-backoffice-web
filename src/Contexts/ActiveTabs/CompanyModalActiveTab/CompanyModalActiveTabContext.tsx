import { createContext } from "react";
import { ActiveTab } from "../Shared/ActiveTab";
import { CompanyModalTabSections } from "./CompanyModalTabSections";

export type CompanyModalActiveTab = ActiveTab<CompanyModalTabSections>;

const CompanyModalActiveTabContext = createContext<CompanyModalActiveTab>({
  activeTab: CompanyModalTabSections.Info,
  setActiveTab: () => CompanyModalTabSections.Info,
});

export default CompanyModalActiveTabContext;
