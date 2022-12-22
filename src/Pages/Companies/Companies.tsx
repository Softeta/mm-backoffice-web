import { useState, useEffect, useContext } from "react";
import CompanyCreate from "Templates/Companies/CompanyCreate";
import { CompaniesQueryKeys, usePagedCompanies } from "API/Calls/companies";
import CompaniesTable from "Templates/Companies/CompaniesTable";
import { useQueryClient } from "react-query";
import CompaniesFilter from "Templates/Companies/CompaniesFilter";
import { TSelectedCompaniesFilters } from "API/Types/Companies/companiesFilterParameters";
import CompaniesFiltersContext from "Contexts/SelectedFilters/Companies/CompaniesFiltersContext";
import { defaultFilters } from "Contexts/SelectedFilters/Companies/CompaniesFiltersProvider";
import queryParamsBuilder from "Templates/Companies/CompaniesFilter/queryParamsBuilder";
import Button from "Components/UI/atoms/Button";
import AddIcon from "@mui/icons-material/Add";
import ColorType from "Components/Enums/colorType";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import PendingCompanies from "Templates/Companies/PendingCompanies/PendingCompanies";
import ModalSlide from "Components/UI/molecules/ModalSlide";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import routes from "Routes/routes";
import CompanyModalActiveTabContext, {
  CompanyModalActiveTab,
} from "Contexts/ActiveTabs/CompanyModalActiveTab/CompanyModalActiveTabContext";
import { CompanyModalTabSections } from "Contexts/ActiveTabs/CompanyModalActiveTab/CompanyModalTabSections";

enum ModalEnum {
  Create,
  Update,
  Pending,
}

const Companies = () => {
  const navigate = useNavigate();
  const { params, setParams } = useContext<TSelectedCompaniesFilters>(
    CompaniesFiltersContext
  );
  const { setActiveTab } = useContext<CompanyModalActiveTab>(
    CompanyModalActiveTabContext
  );
  const [modal, setModal] = useState<ModalEnum | undefined>();
  const [key, setKey] = useState<number>(1);

  const [queryString, setQueryString] = useState<URLSearchParams>(
    queryParamsBuilder(params)
  );

  const queryClient = useQueryClient();
  const location = useLocation();

  const companies = usePagedCompanies(queryString, false);

  const currentLocation = location.pathname;

  const data = companies?.data?.pages
    .map((page) => page.data)
    .map((row) => row.data)
    .flat();

  useEffect(() => {
    if (currentLocation === routes.companies.url) {
      companies.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation]);

  useEffect(() => {
    companies.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  const handleRowClick = async (id: string) => {
    setActiveTab(CompanyModalTabSections.Info);
    navigate(`${routes.companies.url}/${id}`);
  };

  const handleOpenCreate = () => {
    setKey(key + 1);
    setModal(ModalEnum.Create);
  };

  const handleCloseModal = () => {
    queryClient.removeQueries(CompaniesQueryKeys.PagedCompanies);
    setModal(undefined);
    companies.refetch();
  };

  const handleApplyFilters = () => {
    setQueryString(queryParamsBuilder(params));
  };

  const handleClearFilters = () => {
    setQueryString(queryParamsBuilder(defaultFilters));
  };

  const showCreateModal = modal === ModalEnum.Create;
  const showPendingModal = modal === ModalEnum.Pending;

  return (
    <>
      <Outlet />
      <CompaniesTable
        isLoading={companies.isLoading}
        isError={companies.isError}
        data={data}
        fetchNextPage={companies.fetchNextPage}
        hasNextPage={companies.hasNextPage}
        count={companies.data?.pages[0].data.count}
        filter={
          <CompaniesFilter
            params={params}
            setParams={setParams}
            clearParams={() => setParams(defaultFilters)}
            onClearFilter={handleClearFilters}
            onApplyFilters={handleApplyFilters}
          />
        }
        headingControls={
          <div>
            <Button
              className="mr-5"
              label="Pending companies"
              onClick={() => setModal(ModalEnum.Pending)}
              variant={ButtonVariantType.Text}
              color={ColorType.Info}
            />

            <Button
              label="Create a company"
              onClick={handleOpenCreate}
              startIcon={<AddIcon />}
            />
          </div>
        }
        onRowClick={handleRowClick}
        title="Companies"
      />

      <ModalSlide open={showCreateModal}>
        <CompanyCreate key={key} onClose={handleCloseModal} />
      </ModalSlide>

      <ModalSlide open={showPendingModal}>
        <PendingCompanies onClose={handleCloseModal} />
      </ModalSlide>
    </>
  );
};

export default Companies;
