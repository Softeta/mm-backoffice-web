import { useContext, useMemo, useState } from "react";
import Modal from "Components/UI/atoms/Modal";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import { Tabs, Tab } from "Components/UI/atoms/Tabs";
import ColorType from "Components/Enums/colorType";
import { useForm } from "react-hook-form";
import { createJob } from "API/Calls/jobs";
import { useMutation, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import snackbarState from "Components/UI/molecules/Snackbar/snackbarState";
import { AlertColor } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import ModalLoader from "Components/UI/molecules/ModalLoader";
import { yupResolver } from "@hookform/resolvers/yup";
import { t } from "i18next";
import { TJobInitRequest } from "API/Types/Jobs/jobInit";
import { TJobCompanyContactPersonResponse } from "API/Types/Jobs/Common/jobCompanyContactPersonResponse";
import { TCompanySearch } from "API/Types/Companies/companySearchGet";
import {
  CandidateQueryKeys,
  useSuggestedCandidates,
} from "API/Calls/candidates";
import {
  GetJobSugestedCandidatesRequestFromForm,
  TJobSuggestedCandidatesRequest,
} from "API/Types/Jobs/jobSuggestedCandidates";
import WorkingHoursType from "Enums/workingHoursType";
import {
  contentStateToHtml,
  EditorState,
} from "Components/UI/organisms/RichTextInput";
import CompanyInfo, {
  TCompanyInfoState,
  TCompanyInfoUpdate,
} from "Templates/Jobs/CompanyInfo/CompanyInfo";
import TopBar from "Components/UI/molecules/TopBar";
import BackOfficeUsersContext from "Contexts/BackOfficeUsers/BackOfficeUsersContext";
import { TBackOfficeUser } from "API/Types/backOfficeUsers";
import CandidateSelect from "Components/Select/CandidateSelect";
import { TCandidateBrief } from "API/Types/Candidate/candidatesBriefGet";
import CandidateLink from "Components/UI/molecules/CandidateLink";
import TextFieldPopover from "Components/UI/organisms/TextFieldPopover";
import LinkCard from "Components/UI/molecules/LinkCard";
import JobForm from "../JobForm";
import jobFormValidationSchema from "../JobForm/JobFormValidationSchema";
import IJobForm from "../JobForm/IJobForm";
import JobHeader from "../JobHeader";
import { IJobHeader } from "../JobHeader/JobHeader";
import SuggestedProfiles from "../SuggestedProfiles/SuggestedProfiles";

type TJobDetails = {
  onClose: () => void;
  onSubmit: () => void;
  open: boolean;
  selectedCompany: {
    company: TCompanySearch;
    contact: TJobCompanyContactPersonResponse;
  };
};

enum TabSections {
  Info,
  Company,
}

const idToEmployee = (boUsers: TBackOfficeUser[], id: string) => {
  const boUser = boUsers.find((u) => u.id === id);
  return boUser
    ? {
        id: boUser.id,
        firstName: boUser.firstName,
        lastName: boUser.lastName,
        pictureUri: boUser.pictureUri,
      }
    : undefined;
};

const defaultPageParams = new URLSearchParams();
defaultPageParams.append("PageSize", process.env.REACT_APP_PAGE_SIZE!);

export const JobInitialization = ({
  open,
  onClose,
  onSubmit,
  selectedCompany,
}: TJobDetails) => {
  const users = useContext(BackOfficeUsersContext);
  const setSnackbar = useSetRecoilState(snackbarState);
  const queryClient = useQueryClient();

  const [selectedTab, setSelectedTab] = useState(0);
  const [companyInfo, setCompanyInfo] = useState<TCompanyInfoState>({
    descriptionEditorState: EditorState.createEmpty(),
    address: selectedCompany.company.address ?? { addressLine: "" },
    contactPersons: [selectedCompany.contact],
  });

  const jobInfoOpen = selectedTab === TabSections.Info;
  const companyInfoOpen = selectedTab === TabSections.Company;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const form = useForm<IJobForm>({
    defaultValues: {
      currency: "DKK" as string,
      workingHourTypes: [],
      workTypes: [],
      assignedEmployees: [],
      skills: [],
      industries: [],
      seniorities: [],
      languages: [],
      formats: [],
      interestedCandidates: [],
      interestedLinkedIns: [],
      isPriority: false,
    },
    resolver: yupResolver(jobFormValidationSchema),
    mode: "onChange",
  });

  const formData = form.watch();

  const location = useMemo(
    () =>
      companyInfo.address
        ? `${companyInfo.address.city} (${companyInfo.address.country})`
        : "",
    [companyInfo.address]
  );

  const headerProps: IJobHeader = useMemo(
    () => ({
      companyLogo: selectedCompany.company.logo?.uri,
      companyName: selectedCompany.company.name,
      position: formData.position?.code,
      deadLineDate: formData.deadLineDate,
      workTypes: formData.workTypes,
      owner: idToEmployee(users, formData.ownerId),
      assignedEmployees: formData.assignedEmployees,
    }),
    [formData, selectedCompany.company, users]
  );

  const showSuggestedProfiles =
    formData.position && formData.workTypes.length > 0 && location;

  const showCandidateSelect = formData.interestedCandidates.length < 4;

  const showLinkedInsAdd = formData.interestedLinkedIns.length < 4;

  const suggestedCandidatesRequest: TJobSuggestedCandidatesRequest = useMemo(
    () => GetJobSugestedCandidatesRequestFromForm(formData, location),
    [formData, location]
  );

  const suggestedCandidatesQuery = useSuggestedCandidates(
    suggestedCandidatesRequest,
    !!showSuggestedProfiles,
    defaultPageParams
  );

  const createJobMutation = useMutation((data: TJobInitRequest) =>
    createJob(data)
  );

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCompanyInfoChange = (company: TCompanyInfoUpdate) => {
    setCompanyInfo((prev) => ({ ...prev, ...company }));
  };

  const handleCandidateSelect = (candidate: TCandidateBrief) => {
    const { id, firstName, lastName, currentPosition, picture } = candidate;
    const { interestedCandidates } = form.getValues();

    form.setValue("interestedCandidates", [
      ...interestedCandidates,
      { id, firstName, lastName, picture, position: currentPosition?.code },
    ]);
  };

  const handleCandidateDelete = (id: string) => {
    const { interestedCandidates } = form.getValues();
    form.setValue(
      "interestedCandidates",
      interestedCandidates.filter((candidate) => candidate.id !== id)
    );
  };

  const handleInterestedLinkedInSelect = (link?: string) => {
    if (!link) return;

    const { interestedLinkedIns } = form.getValues();
    form.setValue("interestedLinkedIns", [...interestedLinkedIns, link]);
  };

  const handleInterestedLinkedInDelete = (link: string) => {
    const { interestedLinkedIns } = form.getValues();
    const index = interestedLinkedIns.indexOf(link);

    if (index === -1) return;

    const newInterestedLinkedIns = [...interestedLinkedIns];
    newInterestedLinkedIns.splice(index, 1);
    form.setValue("interestedLinkedIns", newInterestedLinkedIns);
  };

  const validateJobSubmit = (): boolean => {
    const severity = "error";
    if (!form.getValues().position) {
      showSnackbar(t("Error.Job.PositionRequired"), severity);
      return false;
    }
    if (!form.getValues().ownerId) {
      showSnackbar(t("Error.Job.OwnerRequired"), severity);
      return false;
    }
    if (
      !form.getValues().workTypes ||
      form.getValues().workTypes.length === 0
    ) {
      showSnackbar(t("Error.Job.WorkTypeRequired"), severity);
      return false;
    }
    return true;
  };

  const handleFormSubmit = async () => {
    const isValid = validateJobSubmit();
    await form.trigger();
    if (!isValid) return;
    const data = form.getValues();
    const payload: TJobInitRequest = {
      ...data,
      assignedEmployees: data.assignedEmployees.map((employee) => employee.id),
      languages: data.languages,
      company: {
        id: selectedCompany.company.id!,
        address: companyInfo.address,
        description: contentStateToHtml(companyInfo.descriptionEditorState),
        contactPersons: companyInfo.contactPersons,
      },
      interestedCandidates: data.interestedCandidates.map(
        (candidate) => candidate.id
      ),
    };
    if (
      data.workingHourTypes.includes(WorkingHoursType.FullTime) &&
      payload?.weeklyWorkHours
    )
      delete payload.weeklyWorkHours;
    await createJobMutation.mutateAsync(payload);
    onSubmit();
  };

  const handleClose = () => {
    queryClient.invalidateQueries(CandidateQueryKeys.suggestedCandidates);
    onClose?.();
  };

  return (
    <Modal
      disableEscapeKeyDown
      enableSlideAnimation
      onClose={handleClose}
      open={open}
    >
      {(props: { onClose: () => void }) => (
        <div className="w-full h-100v lg:w-[85vw] flex flex-col">
          <TopBar onClose={props.onClose}>
            <JobHeader {...headerProps} />
          </TopBar>
          <div className="flex bg-grey-light/25 border-b border-alto pl-1">
            <Tabs value={selectedTab} onChange={handleTabChange}>
              <Tab label="Job info" />
              <Tab label="Company info" />
            </Tabs>
          </div>
          <div
            className={`overflow-y-auto overflow-x-visible grid grid-cols-2 ${
              jobInfoOpen ? "" : "hidden"
            }`}
          >
            <div className="px-6 py-8 border-r overflow-y-auto overflow-x-visible border-alto">
              <form className="grid grid-cols-2 gap-4">
                <JobForm form={form} location={location} />
              </form>
            </div>
            <div className="px-6 py-8">
              <p className="col-span-2 h4 font-semibold mb-2">
                Benchmark profiles
              </p>
              {showSuggestedProfiles && (
                <SuggestedProfiles
                  suggestedCandidatesQuery={suggestedCandidatesQuery}
                />
              )}
              <p className="col-span-2 text-xs my-3">Add profiles</p>
              <div className="grid grid-cols-2 gap-2 mt-2 mb-1">
                {formData.interestedCandidates.map((candidate) => (
                  <CandidateLink
                    key={candidate.id}
                    candidate={candidate}
                    onDelete={handleCandidateDelete}
                  />
                ))}
              </div>
              {showCandidateSelect && (
                <CandidateSelect
                  excludedCandidates={formData.interestedCandidates.map(
                    ({ id }) => id
                  )}
                  onCandidateSelect={handleCandidateSelect}
                />
              )}
              <div className="grid grid-cols-2 gap-2 mt-2 mb-1">
                {formData.interestedLinkedIns.map((link) => (
                  <LinkCard
                    key={link}
                    link={link}
                    onDelete={() => handleInterestedLinkedInDelete(link)}
                  />
                ))}
              </div>
              {showLinkedInsAdd && (
                <TextFieldPopover
                  buttonLabel="Add link"
                  inputLabel="LinkedIn URL"
                  onSubmit={handleInterestedLinkedInSelect}
                />
              )}
            </div>
          </div>
          <div className={`${companyInfoOpen ? "" : "hidden"}`}>
            {selectedCompany && (
              <CompanyInfo
                companyId={selectedCompany.company.id!}
                descriptionEditorState={companyInfo.descriptionEditorState}
                address={companyInfo.address}
                contactPersons={companyInfo.contactPersons}
                readOnly={false}
                onChange={handleCompanyInfoChange}
              />
            )}
          </div>
          <div className="h-16 flex justify-between items-center p-4 border-t border-alto mt-auto">
            <Button
              label="Back"
              variant={ButtonVariantType.Outlined}
              color={ColorType.Info}
            />
            <ModalLoader open={createJobMutation.isLoading} />
            <Button
              label="Create a job"
              type="submit"
              onClick={handleFormSubmit}
            />
          </div>
          <DevTool control={form.control} />
        </div>
      )}
    </Modal>
  );
};
export default JobInitialization;
