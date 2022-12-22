import { createContext } from "react";
import { ActiveTab } from "../Shared/ActiveTab";
import { JobModalTabSections } from "./JobModalTabSections";

export type JobModalActiveTab = ActiveTab<JobModalTabSections>;

const JobModalActiveTabContext = createContext<JobModalActiveTab>({
  activeTab: JobModalTabSections.Info,
  setActiveTab: () => JobModalTabSections.Info,
});

export default JobModalActiveTabContext;
