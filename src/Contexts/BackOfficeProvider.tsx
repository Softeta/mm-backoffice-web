import { IProvider } from "Contexts/IProvider";
import CandidateModalActiveTabProvider from "./ActiveTabs/CandidateModalActiveTab/CandidateModalActiveTabProvider";
import CompanyModalActiveTabProvider from "./ActiveTabs/CompanyModalActiveTab/CompanyModalActiveTabProvider";
import JobModalActiveTabProvider from "./ActiveTabs/JobModalActiveTab/JobModalActiveTabProvider";
import BackOfficeUsersProvider from "./BackOfficeUsers/BackOfficeUsersProvider";
import ClassificatorsProvider from "./Classificators/ClassificatorsProvider";
import ConfigurationsProvider from "./Configurations/ConfigurationsProvider";
import { CandidatesFiltersProvider } from "./SelectedFilters/Candidates/CandidatesFiltersProvider";
import { CompaniesFiltersProvider } from "./SelectedFilters/Companies/CompaniesFiltersProvider";
import DashboardFiltersProvider from "./SelectedFilters/Dashboard/DashboardFiltersProvider";
import JobsFiltersProvider from "./SelectedFilters/Jobs/JobsFiltersProvider";

export const BackOfficeProvider = ({ children }: IProvider) => (
  <ClassificatorsProvider>
    <BackOfficeUsersProvider>
      <DashboardFiltersProvider>
        <JobsFiltersProvider>
          <CandidatesFiltersProvider>
            <CompaniesFiltersProvider>
              <ConfigurationsProvider>
                <JobModalActiveTabProvider>
                  <CandidateModalActiveTabProvider>
                    <CompanyModalActiveTabProvider>
                      {children}
                    </CompanyModalActiveTabProvider>
                  </CandidateModalActiveTabProvider>
                </JobModalActiveTabProvider>
              </ConfigurationsProvider>
            </CompaniesFiltersProvider>
          </CandidatesFiltersProvider>
        </JobsFiltersProvider>
      </DashboardFiltersProvider>
    </BackOfficeUsersProvider>
  </ClassificatorsProvider>
);

export default BackOfficeProvider;
