import { IProvider } from "Contexts/IProvider";
import { useMemo, useState } from "react";
import CandidateModalActiveTabContext, {
  CandidateModalActiveTab,
} from "./CandidateModalActiveTabContext";
import { CandidateModalTabSections } from "./CandidateModalTabSections";

export const CandidateModalActiveTabProvider = ({ children }: IProvider) => {
  const [activeTab, setActiveTab] = useState<CandidateModalTabSections>(
    CandidateModalTabSections.Info
  );

  const value: CandidateModalActiveTab = useMemo(
    () => ({
      activeTab,
      setActiveTab,
    }),
    [activeTab]
  );

  return (
    <CandidateModalActiveTabContext.Provider value={value}>
      {children}
    </CandidateModalActiveTabContext.Provider>
  );
};

export default CandidateModalActiveTabProvider;
