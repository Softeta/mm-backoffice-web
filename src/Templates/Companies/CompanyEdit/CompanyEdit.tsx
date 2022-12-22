import { useContext, useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DevTool } from "@hookform/devtools";
import TopBar from "Components/UI/molecules/TopBar";
import Button from "Components/UI/atoms/Button";
import { CompaniesQueryKeys, updateCompany } from "API/Calls/companies";
import { Tab, Tabs } from "Components/UI/atoms/Tabs";
import Modal from "Components/UI/atoms/Modal";
import {
  TCompanyUpdateForm,
  TCompanyUpdateRequest,
} from "API/Types/Companies/companyUpdate";
import CompanyModalActiveTabContext, {
  CompanyModalActiveTab,
} from "Contexts/ActiveTabs/CompanyModalActiveTab/CompanyModalActiveTabContext";
import { CompanyModalTabSections } from "Contexts/ActiveTabs/CompanyModalActiveTab/CompanyModalTabSections";
import { TCompany } from "API/Types/Companies/companyGet";
import { useForm } from "react-hook-form";
import ContactsGrid from "Templates/CompanyContacts/ContactsGrid/ContactsGrid";
import JobModalActiveTabContext, {
  JobModalActiveTab,
} from "Contexts/ActiveTabs/JobModalActiveTab/JobModalActiveTabContext";
import JobInitialization from "Templates/Jobs/JobInitialization";
import { TCompanySearch } from "API/Types/Companies/companySearchGet";
import { TCompanyContactPerson } from "API/Types/Companies/common/companyContactPerson";
import PopupHeader from "Components/UI/molecules/PopupHeader";
import PendingControls from "Components/UI/organisms/PendingControls";
import { approveCompany, rejectCompany } from "API/Calls/pendingCompanies";
import ModalLoader from "Components/UI/molecules/ModalLoader";
import JobFilterInputNames from "API/Types/Jobs/jobFilterParameters";
import { JobModalTabSections } from "Contexts/ActiveTabs/JobModalActiveTab/JobModalTabSections";
import CompanyStatus from "Enums/companyStatus";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useJobs } from "API/Calls/jobs";
import routes from "Routes/routes";
import { CompanyEditForm } from "../CompanyForms";
import CompanyHeader from "../CompanyHeader";
import { ICompanyHeader } from "../CompanyHeader/CompanyHeader";
import CompanyJobsTable from "../CompanyJobsTable/CompanyJobsTable";
import ContactAddForm from "../CompanySelection/helpers/ContactAddForm";

const validationSchema = yup.object({
  address: yup.object({
    addressLine: yup.string().required(),
    postalCode: yup.string().required(),
  }),
});

const getQueryString = (companyId: string): URLSearchParams => {
  const params = new URLSearchParams();
  params.append(JobFilterInputNames.Companies, companyId);
  return params;
};

interface IProps {
  company: TCompany;
  onClose?: () => void;
  onPendingCompaniesChange?: () => void;
}

export const CompanyEdit = ({
  company,
  onClose,
  onPendingCompaniesChange,
}: IProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [selectedContact, setSelectedContact] =
    useState<TCompanyContactPerson>();
  const [companyContacts, setCompanyContacts] = useState<
    TCompanyContactPerson[]
  >(company.contactPersons || []);
  const [showJobCreationModal, setShowJobCreationModal] = useState(false);
  const [isLogoLoading, setIsLogoLoading] = useState<boolean>(false);

  const queryParams = new URLSearchParams();
  queryParams.append(JobFilterInputNames.Companies, company.id);
  const companyJobs = useJobs(getQueryString(company.id));
  const { activeTab: companyActiveTab, setActiveTab: setCompanyActiveTab } =
    useContext<CompanyModalActiveTab>(CompanyModalActiveTabContext);
  const { setActiveTab: setJobActiveTab } = useContext<JobModalActiveTab>(
    JobModalActiveTabContext
  );

  const isPending = company.status === CompanyStatus.Pending;

  const jobsData = companyJobs.data?.pages
    .map((page) => page.data)
    .map((row) => row.data)
    .flat();

  const form = useForm<TCompanyUpdateForm>({
    defaultValues: {
      address: company?.address,
      websiteUrl: company?.websiteUrl,
      linkedInUrl: company?.linkedInUrl,
      glassdoorUrl: company?.glassdoorUrl,
      industries: company?.industries,
      attachedLogo: company.logo,
      logo: {
        hasChanged: false,
      },
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const emailTo = useMemo(
    () =>
      companyContacts.length > 0
        ? companyContacts.map((person) => person.email).join(",")
        : "",
    [companyContacts]
  );

  const handleConctactSelect = (
    _: TCompanySearch,
    contact: TCompanyContactPerson
  ) => {
    setSelectedContact(contact);
  };

  const removeCompanyQueries = () => {
    queryClient.removeQueries(CompaniesQueryKeys.PagedCompanies);
    queryClient.removeQueries([CompaniesQueryKeys.Company, company.id]);
  };

  const handleJobInitializationSubmit = () => {
    companyJobs.refetch();
    setSelectedContact(undefined);
    setShowJobCreationModal(false);
  };

  const handleJobInitializationClose = () => {
    setSelectedContact(undefined);
    setShowJobCreationModal(false);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCompanyActiveTab(newValue);
  };

  const handleFormSubmit = async (formData: TCompanyUpdateForm) => {
    setLoading(true);

    try {
      const request = { ...formData } as TCompanyUpdateRequest;
      await updateCompany(company.id, request);
      removeCompanyQueries();
      onClose?.();
    } finally {
      setLoading(false);
    }
  };

  const handleJobSelect = (jobId: string): void => {
    setJobActiveTab(JobModalTabSections.Info);
    navigate(`${routes.jobs.url}/${jobId}`);
  };

  const handlePendingCompanyAprove = async () => {
    setLoading(true);

    try {
      await approveCompany(company.id);
      removeCompanyQueries();
      onPendingCompaniesChange?.();
    } finally {
      setLoading(false);
    }
  };

  const handlePendingCompanyReject = async () => {
    setLoading(true);

    try {
      await rejectCompany(company.id);
      removeCompanyQueries();
      onPendingCompaniesChange?.();
    } finally {
      setLoading(false);
    }
  };

  const formData = form.watch();

  const headerProps: ICompanyHeader = useMemo(
    () => ({
      logoUri: formData.attachedLogo?.uri,
      name: company.name,
      registrationNumber: company.registrationNumber,
      industries: formData.industries?.map((x) => x.code),
      websiteUrl: formData.websiteUrl,
      linkedInUrl: formData.linkedInUrl,
      glassdoorUrl: formData.glassdoorUrl,
    }),
    [formData, company]
  );

  const infoOpen = companyActiveTab === CompanyModalTabSections.Info;
  const jobsOpen = companyActiveTab === CompanyModalTabSections.Jobs;
  const contactsOpen = companyActiveTab === CompanyModalTabSections.Contacts;

  const contactSelectOpen = !!(showJobCreationModal && !selectedContact);
  const jobCreationOpen = !!(showJobCreationModal && selectedContact);

  return (
    <div className="flex flex-col h-full">
      <TopBar onClose={onClose}>
        <CompanyHeader {...headerProps} />
      </TopBar>
      <div className="flex bg-grey-light/25 border-b border-alto pl-1">
        <Tabs value={companyActiveTab} onChange={handleTabChange}>
          <Tab value={CompanyModalTabSections.Info} label="Company info" />
          <Tab
            value={CompanyModalTabSections.Contacts}
            label="Company contacts"
          />
          <Tab value={CompanyModalTabSections.Jobs} label="Company jobs" />
        </Tabs>
      </div>
      <div
        className={`grid grid-cols-1 ${
          infoOpen ? "" : "hidden"
        } overflow-y-auto overflow-x-visible`}
      >
        <div className="my-8 px-6 ">
          <CompanyEditForm
            form={form}
            company={company}
            onLogoLoading={setIsLogoLoading}
          />
        </div>
      </div>
      <div className={`my-8 px-6  ${contactsOpen ? "" : "hidden"}`}>
        <ContactsGrid
          companyId={company.id}
          contacts={company.contactPersons || []}
          onContactsChange={setCompanyContacts}
          hideAddNew={isPending}
        />
      </div>
      <div
        className={`${
          jobsOpen ? "" : "hidden"
        } overflow-y-auto overflow-x-visible`}
      >
        <CompanyJobsTable
          key={company.id}
          count={companyJobs.data?.pages[0].data.count}
          data={jobsData}
          fetchNextPage={companyJobs.fetchNextPage}
          hasNextPage={companyJobs.hasNextPage}
          isError={companyJobs.isError}
          isLoading={companyJobs.isLoading}
          onRowClick={handleJobSelect}
          onCreateJobClick={() => setShowJobCreationModal(true)}
        />
      </div>

      <div className="h-16 flex justify-between items-center p-4 border-t border-alto mt-auto">
        <Button
          className={`${infoOpen ? "" : "hidden"}`}
          label="Apply changes"
          type="submit"
          disabled={!form.formState.isValid || isLogoLoading}
          onClick={form.handleSubmit(handleFormSubmit)}
        />
        {isPending && (
          <PendingControls
            className="ml-auto"
            email={emailTo}
            onApprove={handlePendingCompanyAprove}
            onReject={handlePendingCompanyReject}
          />
        )}
      </div>
      <Modal
        open={contactSelectOpen}
        header={
          <PopupHeader
            label={company.name}
            onClose={() => setShowJobCreationModal(false)}
          />
        }
      >
        <div className="py-5 px-6">
          <div className="flex flex-col justify-between mb-5 w-[460px]">
            <ContactAddForm
              company={company}
              onCompanySelect={handleConctactSelect}
            />
          </div>
        </div>
      </Modal>
      {selectedContact && (
        <JobInitialization
          open={jobCreationOpen}
          onClose={handleJobInitializationClose}
          onSubmit={handleJobInitializationSubmit}
          selectedCompany={{
            company,
            contact: {
              ...selectedContact,
              isMainContact: true,
            },
          }}
        />
      )}
      {loading && <ModalLoader open />}

      <DevTool control={form.control} />
    </div>
  );
};

export default CompanyEdit;
