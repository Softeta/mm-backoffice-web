import { IProvider } from "Contexts/IProvider";
import { useMemo, useState } from "react";
import JobModalActiveTabContext, {
  JobModalActiveTab,
} from "./JobModalActiveTabContext";
import { JobModalTabSections } from "./JobModalTabSections";

export const JobModalActiveTabProvider = ({ children }: IProvider) => {
  const [activeTab, setActiveTab] = useState<JobModalTabSections>(
    JobModalTabSections.Info
  );

  const value: JobModalActiveTab = useMemo(
    () => ({
      activeTab,
      setActiveTab,
    }),
    [activeTab]
  );

  return (
    <JobModalActiveTabContext.Provider value={value}>
      {children}
    </JobModalActiveTabContext.Provider>
  );
};

export default JobModalActiveTabProvider;
