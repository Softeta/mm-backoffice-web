import { useCompany } from "API/Calls/companies";
import { usePendingCompanies } from "API/Calls/pendingCompanies";
import CenteredLoader from "Components/UI/molecules/CenteredLoader";
import CompanyModalActiveTabContext, {
  CompanyModalActiveTab,
} from "Contexts/ActiveTabs/CompanyModalActiveTab/CompanyModalActiveTabContext";
import { CompanyModalTabSections } from "Contexts/ActiveTabs/CompanyModalActiveTab/CompanyModalTabSections";
import { useContext, useEffect, useState } from "react";
import CompanyEdit from "../CompanyEdit";
import CompaniesList from "./CompaniesList";

type TPendingCompanies = {
  onClose: () => void;
};

const PendingCompanies = ({ onClose }: TPendingCompanies) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<
    string | undefined
  >();
  const { setActiveTab } = useContext<CompanyModalActiveTab>(
    CompanyModalActiveTabContext
  );

  const companies = usePendingCompanies();
  const company = useCompany(selectedCompanyId);

  const data = companies?.data?.pages
    .map((page) => page.data)
    .map((row) => row.data)
    .flat();

  const findNextCompanyId = (currentId?: string) => {
    const index = data?.findIndex((x) => x.id === currentId);
    return (index || index === 0) && data && index + 1 < data.length
      ? data[index + 1].id
      : undefined;
  };

  const handleCompanySelect = (id: string) => {
    if (id !== selectedCompanyId) {
      setSelectedCompanyId(id);
    }
  };

  const handleListChange = () => {
    setSelectedCompanyId((prevId) => findNextCompanyId(prevId));
    companies.refetch();
  };

  useEffect(() => {
    setActiveTab(CompanyModalTabSections.Info);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompanyId]);

  useEffect(() => {
    if (!selectedCompanyId && data && data.length > 0) {
      setSelectedCompanyId(data[0].id);
    }
  }, [data, selectedCompanyId]);

  return (
    <div className="flex h-full">
      <CompaniesList
        isLoading={companies.isLoading}
        data={data}
        fetchNextPage={companies.fetchNextPage}
        hasNextPage={!!companies.hasNextPage}
        onCompanySelect={handleCompanySelect}
        selectedCompanyId={selectedCompanyId}
        onClose={onClose}
      />
      <div className="w-full">
        {!company.isFetching && company.data?.data && (
          <CompanyEdit
            key={selectedCompanyId}
            company={company?.data?.data}
            onPendingCompaniesChange={handleListChange}
          />
        )}
        {company.isFetching && !company?.data?.data && (
          <CenteredLoader delay={500} />
        )}
      </div>
    </div>
  );
};

export default PendingCompanies;
