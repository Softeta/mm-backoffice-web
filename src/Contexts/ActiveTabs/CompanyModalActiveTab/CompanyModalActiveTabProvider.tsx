import { IProvider } from "Contexts/IProvider";
import { useMemo, useState } from "react";
import CompanyModalActiveTabContext, {
  CompanyModalActiveTab,
} from "./CompanyModalActiveTabContext";
import { CompanyModalTabSections } from "./CompanyModalTabSections";

export const CompanyModalActiveTabProvider = ({ children }: IProvider) => {
  const [activeTab, setActiveTab] = useState<CompanyModalTabSections>(
    CompanyModalTabSections.Info
  );

  const value: CompanyModalActiveTab = useMemo(
    () => ({
      activeTab,
      setActiveTab,
    }),
    [activeTab]
  );

  return (
    <CompanyModalActiveTabContext.Provider value={value}>
      {children}
    </CompanyModalActiveTabContext.Provider>
  );
};

export default CompanyModalActiveTabProvider;
