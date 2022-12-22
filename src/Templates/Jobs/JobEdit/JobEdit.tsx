import { format } from "date-fns";
import DateFormats from "Enums/dateFormats";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import ColorType from "Components/Enums/colorType";
import CheckIcon from "Assets/Icons/check.svg";
import { memo, useContext, useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { TCandidateBrief } from "API/Types/Candidate/candidatesBriefGet";
import { AlertType } from "Components/UI/molecules/Snackbar";
import { AlertColor } from "@mui/material";
import ModalLoader from "Components/UI/molecules/ModalLoader";
import {
  publishJob,
  putJobCalibrated,
  putJobCalibratedCompany,
  JobQueryKeys,
  activateJob,
  approveJob,
  rejectJob,
  startSearchAndSelection,
} from "API/Calls/jobs";
import {
  activateCandidates,
  addSelectedCandidates,
  archiveCandidates,
  JobCandidatesQueryKeys,
  updateCandidateBrief,
  updateSelectedCandidatesRanking,
  updateSelectedCandidatesStage,
} from "API/Calls/jobCandidates";
import { TJobCalibrateCompanyRequest } from "API/Types/Jobs/jobCalibrateCompany";
import JobModalActiveTabContext, {
  JobModalActiveTab,
} from "Contexts/ActiveTabs/JobModalActiveTab/JobModalActiveTabContext";
import {
  TJobCalibration,
  TJobCalibrationRequest,
} from "API/Types/Jobs/jobCalibrate";
import {
  TJobCandidates,
  TJobCandidatesResponse,
} from "API/Types/Jobs/jobCandidatesGet";
import { t } from "i18next";
import { Tab, Tabs } from "Components/UI/atoms/Tabs";
import Utils from "Utils/utils";
import CandidatesSearch from "Templates/Candidates/CandidatesSearch";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "Components/UI/molecules/Snackbar/snackbarState";
import CandidatesGrid from "Templates/Candidates/CandidatesGrid";
import TopBar from "Components/UI/molecules/TopBar";
import { TJobSelectedCandidatesRequest } from "API/Types/Jobs/jobSelectedCandidates";
import { TJobSelectedCandidate } from "API/Types/Jobs/Common/jobSelectedCandidate";
import { TUpdateCandidateStageRequest } from "API/Types/Jobs/jobUpdateCandidateStage";
import { JobModalTabSections } from "Contexts/ActiveTabs/JobModalActiveTab/JobModalTabSections";
import {
  TActivateCandidatesRequest,
  TArchiveCandidateStageRequest,
} from "API/Types/Jobs/jobArchiveCandidateStage";
import { TJobActivateResponse } from "API/Types/Jobs/jobActivation";
import ArchiveIcon from "@mui/icons-material/Archive";
import JobStages from "Enums/JobStages";
import { TCandidateRanking } from "API/Types/Jobs/jobUpdateCandidatesRanking";
import Link from "Components/UI/atoms/Link";
import PendingControls from "Components/UI/organisms/PendingControls";
import {
  CandidateQueryKeys,
  useSuggestedCandidates,
} from "API/Calls/candidates";
import CandidateSelect from "Components/Select/CandidateSelect";
import CandidateLink from "Components/UI/molecules/CandidateLink";
import TextFieldPopover from "Components/UI/organisms/TextFieldPopover";
import {
  GetJobSugestedCandidatesRequestFromForm,
  TJobSuggestedCandidatesRequest,
} from "API/Types/Jobs/jobSuggestedCandidates";
import LinkCard from "Components/UI/molecules/LinkCard";
import WeavyApp from "Weavy/WeavyApp";
import JobSharing from "../JobSharing";
import JobHeader from "../JobHeader";
import JobCompanyCallibration from "../JobCompanyCallibration";
import JobArchive from "../JobArchive";
import { useJobUpdateForm } from "../JobForm/useJobUpdateForm";
import SuggestedProfiles from "../SuggestedProfiles";
import JobForm from "../JobForm";
import { IJobHeader } from "../JobHeader/JobHeader";

type TJobEdit = {
  jobId: string;
  jobData: TJobCalibration;
  jobCandidatesData?: TJobCandidates;
  hideClose?: boolean;
  onClose?: () => void;
  onActivate?: (jobId: string) => void;
  onPendingJobsChange?: () => void;
};

enum QueryKey {
  jobCalibrated = "jobCalibrated",
  jobCompany = "jobCompany",
  company = "company",
}

const scrollableTargetId = "JobCandidatesParentDiv";

const defaultPageParams = new URLSearchParams();
defaultPageParams.append("PageSize", process.env.REACT_APP_PAGE_SIZE!);

// TODO: Activate when job sharing functionality will be ready for realese.
const hideJobSharingFunctionality = true;

let jobSharedTimeout: NodeJS.Timeout | undefined;
let shortlistSentTimeout: NodeJS.Timeout | undefined;

export const JobEdit = ({
  jobId,
  jobData,
  hideClose,
  jobCandidatesData,
  onClose,
  onActivate,
  onPendingJobsChange,
}: TJobEdit) => {
  const setSnackbar = useSetRecoilState(snackbarState);
  const form = useJobUpdateForm(jobData);
  const [job, setJob] = useState<TJobCalibration>(jobData);
  const [jobCandidates, setJobCandidates] = useState<
    TJobCandidates | undefined
  >(jobCandidatesData);
  const [jobShared, setJobShared] = useState(false);
  const [showJobSharing, setShowJobSharing] = useState(false);
  const [showJobArchive, setShowJobArchive] = useState(false);
  const [activateDisabled, setActivateDisabled] = useState(false);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>(
    jobCandidates?.selectedCandidates.map((x) => x.id) || []
  );
  const [shortlistActivated, setShortlistActivated] = useState(false);
  const [popupAnchorEl, setPopupAnchorEl] = useState<
    HTMLButtonElement | undefined
  >(undefined);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const { activeTab, setActiveTab } = useContext<JobModalActiveTab>(
    JobModalActiveTabContext
  );

  const jobMutation = useMutation(
    QueryKey.jobCalibrated,
    (data: TJobCalibrationRequest) => putJobCalibrated(data, jobId)
  );

  const jobCompanyMutation = useMutation(
    QueryKey.jobCompany,
    (data: TJobCalibrateCompanyRequest) => putJobCalibratedCompany(data, jobId)
  );

  const mailTo: string | undefined = useMemo(
    () =>
      job.company.contactPersons.find((contact) => contact.isMainContact)
        ?.email,
    [job.company.contactPersons]
  );

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const showFormErrorSnackbar = (error?: string) => {
    if (error) {
      showSnackbar(t(error), "error");
    }
  };

  const validateJobSubmit = (): string | undefined => {
    if (!form.getValues().position) {
      return "Error.Job.PositionRequired";
    }
    if (!form.getValues().ownerId) {
      return "Error.Job.OwnerRequired";
    }
    if (
      !form.getValues().workTypes ||
      form.getValues().workTypes.length === 0
    ) {
      return "Error.Job.WorkTypeRequired";
    }
    return undefined;
  };

  const candidateSelectedSuccessfuly = (
    response: TJobCandidatesResponse,
    candidate: TCandidateBrief
  ) => {
    showSnackbar(
      `${candidate.firstName} ${candidate.lastName} has been selected`,
      AlertType.success
    );
    queryClient.removeQueries([JobCandidatesQueryKeys.jobCandidates, jobId]);
    setJobCandidates(response.data);
  };

  const toggleCandidateSelection = (candidate: TCandidateBrief) => {
    const exist = jobCandidates?.selectedCandidates.some(
      (x: TJobSelectedCandidate) => x.id === candidate.id
    );
    if (!exist) {
      addSelectedCandidates(jobId, {
        candidates: [candidate.id],
      } as TJobSelectedCandidatesRequest)
        .then((response: TJobCandidatesResponse) => {
          candidateSelectedSuccessfuly(response, candidate);
        })
        .catch(() => {
          setSelectedCandidateIds([
            ...selectedCandidateIds.filter((x) => x !== candidate.id),
          ]);
        });
      setSelectedCandidateIds([...selectedCandidateIds, candidate.id]);
    } else {
      /* TODO: need to clearify and implement candidates unselection proccess */
      showSnackbar(
        `${candidate.firstName} ${candidate.lastName} has been unselected`,
        AlertType.info
      );
    }
  };

  const handleClose = () => {
    queryClient.removeQueries([JobQueryKeys.jobCalibrated, jobId]);
    queryClient.removeQueries([JobCandidatesQueryKeys.jobCandidates, jobId]);
    queryClient.removeQueries(CandidateQueryKeys.suggestedCandidates);
    queryClient.removeQueries(QueryKey.company);
    queryClient.removeQueries(JobQueryKeys.jobs);
    onClose?.();
  };

  useEffect(() => {
    if (jobMutation.data?.data) {
      setJob(jobMutation.data.data);
    }
    if (jobMutation.data?.data && isPublishing) {
      const publish = async () => {
        try {
          await publishJob(jobId);
          setJob((prevState) => ({
            ...prevState,
            isPublished: true,
          }));
        } finally {
          setIsPublishing(false);
        }
      };
      publish();
    }
    if (jobMutation.data?.data && isApproving) {
      const approve = async () => {
        try {
          await approveJob(jobId);
          onPendingJobsChange?.();
        } finally {
          setIsApproving(false);
          handleClose();
        }
      };
      approve();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobMutation.data]);

  useEffect(() => {
    setIsPublishing(false);
    setIsApproving(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobMutation.error]);

  useEffect(() => {
    if (jobCompanyMutation.data?.data.company) {
      setJob((prevState: TJobCalibration) => ({
        ...prevState,
        company: jobCompanyMutation.data?.data.company,
      }));
    }
  }, [jobCompanyMutation.data]);

  const location = useMemo(
    () =>
      job.company.address
        ? `${job.company.address.city} (${job.company.address.country})`
        : "",
    [job.company.address]
  );

  const formData = form.watch();

  const isActiveStage = useMemo(
    () =>
      formData.position &&
      formData.workTypes.length > 0 &&
      location &&
      [
        JobStages.Pending,
        JobStages.Calibration,
        JobStages.CandidateSelection,
        JobStages.ShortListed,
      ].includes(job.stage),
    [job.stage, formData, location]
  );

  const suggestedCandidatesRequest: TJobSuggestedCandidatesRequest = useMemo(
    () => GetJobSugestedCandidatesRequestFromForm(formData, location, jobId),
    [formData, location, jobId]
  );

  const suggestedCandidates = useSuggestedCandidates(
    suggestedCandidatesRequest,
    !!isActiveStage,
    defaultPageParams
  );

  const showBenchmark = useMemo(
    () =>
      isActiveStage ||
      formData.interestedCandidates.length > 0 ||
      formData.interestedLinkedIns.length > 0,
    [isActiveStage, formData.interestedCandidates, formData.interestedLinkedIns]
  );

  const showCandidateSelect = useMemo(
    () => formData.interestedCandidates.length < 4 && isActiveStage,
    [formData.interestedCandidates, isActiveStage]
  );

  const showLinkedInsAdd = useMemo(
    () => formData.interestedLinkedIns.length < 4 && isActiveStage,
    [formData.interestedLinkedIns, isActiveStage]
  );

  const headerProps: IJobHeader = useMemo(
    () => ({
      companyLogo: job.company.logo?.uri,
      companyName: job.company.name,
      position: formData.position?.code,
      deadLineDate: formData.deadLineDate,
      stage: job.stage,
      owner: job.owner,
      assignedEmployees: formData.assignedEmployees,
      workTypes: formData.workTypes,
    }),
    [formData, job]
  );

  const handleShareInfoChanges = (date: Date) => {
    setJob((prevState: TJobCalibration) => ({
      ...prevState,
      sharingDate: date,
    }));
    if (jobSharedTimeout) {
      clearTimeout(jobSharedTimeout);
    }
    setJobShared(true);
    jobSharedTimeout = setTimeout(() => {
      setJobShared(false);
    }, 3000);
  };

  const handleJobArchiveChanges = (jobStage: JobStages) => {
    setJob((prevState: TJobCalibration) => ({
      ...prevState,
      stage: jobStage,
      isArchived: true,
    }));
    setShowJobArchive(false);
  };

  const handleJobSubmit = (error?: string) => {
    let formError = error;
    if (!formError) {
      formError = validateJobSubmit();
    }

    showFormErrorSnackbar(formError);
    if (formError) return;

    const payload = {
      ...form.getValues(),
      assignedEmployees: form
        .getValues()
        .assignedEmployees.map((assignedEmployee) => assignedEmployee.id),
      interestedCandidates: form
        .getValues()
        .interestedCandidates.map((candidate) => candidate.id),
    };
    jobMutation.mutate(payload);
    queryClient.removeQueries(JobQueryKeys.jobs);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCompanyInfoUpdate = (update: TJobCalibrateCompanyRequest) => {
    jobCompanyMutation.mutate(update);
  };

  const handleSharingClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPopupAnchorEl(event.currentTarget);
    setShowJobSharing(true);
  };

  const handleArchiveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPopupAnchorEl(event.currentTarget);
    setShowJobArchive(true);
  };

  const handleJobActivate = () => {
    setActivateDisabled(true);
    activateJob(jobId)
      .then((res: TJobActivateResponse) => {
        setJob((prevState: TJobCalibration) => ({
          ...prevState,
          isActivated: true,
        }));
        onActivate?.(res.data.jobId);
      })
      .catch(() => {
        setActivateDisabled(false);
      });
  };

  const handleSaveOnPublishClick = () => {
    const error = validateJobSubmit();
    handleJobSubmit(error);
    if (error) return;
    setIsPublishing(true);
  };

  const handleUpdateCandidateBrief = (candidateId: string, brief?: string) => {
    updateCandidateBrief(jobId, candidateId, { brief }).then(
      (response: TJobCandidatesResponse) => {
        setJobCandidates(response.data);
      }
    );
  };

  const handleUpdateCandidatesStage = (
    candidates: TUpdateCandidateStageRequest
  ) => {
    updateSelectedCandidatesStage(jobId, candidates).then(
      (response: TJobCandidatesResponse) => {
        setJob((prevState: TJobCalibration) => ({
          ...prevState,
          stage: response.data.stage,
          isArchived: response.data.stage === JobStages.Successful,
        }));
        setJobCandidates(response.data);
      }
    );
  };

  const handleArchiveCandidates = (
    candidates: TArchiveCandidateStageRequest
  ) => {
    archiveCandidates(jobId, candidates).then(
      (response: TJobCandidatesResponse) => {
        setJobCandidates(response.data);
      }
    );
  };

  const handleActivateCandidates = (candidates: TActivateCandidatesRequest) => {
    activateCandidates(jobId, candidates).then(
      (response: TJobCandidatesResponse) => {
        setJobCandidates(response.data);
      }
    );
  };

  const handleActivateShortList = (data: TJobCandidates) => {
    setJobCandidates(data);
    if (!data.shortListActivatedAt) {
      return;
    }

    setJob({ ...job, stage: data.stage });

    if (shortlistSentTimeout) {
      clearTimeout(shortlistSentTimeout);
    }
    setShortlistActivated(true);
    shortlistSentTimeout = setTimeout(() => {
      setShortlistActivated(false);
    }, 3000);
  };

  const handleRankingCandidates = (candidatesRanking: TCandidateRanking[]) => {
    updateSelectedCandidatesRanking(jobId, { candidatesRanking }).then(
      (response: TJobCandidatesResponse) => {
        setJobCandidates(response.data);
      }
    );
  };

  const handlePendingJobAprove = async () => {
    const error = validateJobSubmit();
    handleJobSubmit(error);
    if (error) return;
    setIsApproving(true);
  };

  const handlePendingJobReject = async () => {
    await rejectJob(jobId);
    handleClose();
    onPendingJobsChange?.();
  };

  const handleSearchAndSelectionStart = async () => {
    try {
      setIsLoading(true);
      const result = await startSearchAndSelection(jobId, queryClient);
      setJob((prevState) => ({
        ...prevState,
        isSelectionStarted: true,
        stage: result.data.jobStage,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInterestedCandidateSelect = (candidate: TCandidateBrief) => {
    const { id, firstName, lastName, currentPosition, picture } = candidate;
    const { interestedCandidates } = form.getValues();

    form.setValue("interestedCandidates", [
      ...interestedCandidates,
      { id, firstName, lastName, picture, position: currentPosition?.code },
    ]);
  };

  const handleInterestedCandidateDelete = (id: string) => {
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

  const jobInfoOpen = activeTab === JobModalTabSections.Info;
  const candidatesSearchOpen = activeTab === JobModalTabSections.Search;
  const companyInfoOpen = activeTab === JobModalTabSections.Company;
  const selectionOpen = activeTab === JobModalTabSections.Selection;

  const showArchiveControls = job.isArchived;
  const showPendingControls = job.stage === JobStages.Pending;
  const showActiveControls = !showArchiveControls && !showPendingControls;

  return (
    <div className="h-full flex flex-col">
      <TopBar
        className="tmpUtil-headerHeight"
        onClose={hideClose ? undefined : handleClose}
      >
        <JobHeader {...headerProps} />
      </TopBar>
      <div className="flex bg-grey-light/25 border-b border-alto pl-1 tmpUtil-tabMenuHeight">
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab value={JobModalTabSections.Info} label="Job info" />
          {job.isSelectionStarted && (
            <Tab value={JobModalTabSections.Search} label="Search" />
          )}
          {job.isSelectionStarted && (
            <Tab
              value={JobModalTabSections.Selection}
              label={`Selection (${
                jobCandidates?.selectedCandidates.length || 0
              })`}
            />
          )}
          <Tab value={JobModalTabSections.Company} label="Company info" />
        </Tabs>
        {job.parentJobId && (
          <Link
            className="ml-auto mr-10 self-center"
            href={`/jobs/${job.parentJobId}`}
          >
            Original (archived) job
          </Link>
        )}
      </div>
      {job && !Utils.IsObjectEmpty(job) && (
        <div
          className={`grid grid-cols-2 overflow-y-auto ${
            jobInfoOpen ? "" : "hidden"
          }`}
        >
          <div className="py-8 px-6 overflow-y-auto overflow-x-visible  border-r border-alto">
            <form className="grid grid-cols-2 gap-4">
              <JobForm
                disabled={job.isArchived}
                form={form}
                location={location}
              />
            </form>
          </div>

          {showBenchmark && (
            <div className="px-6 py-8 overflow-y-auto">
              <p className="col-span-2 h4 font-semibold mb-2">
                Benchmark profiles
              </p>
              {isActiveStage && (
                <SuggestedProfiles
                  suggestedCandidatesQuery={suggestedCandidates}
                />
              )}
              <p className="col-span-2 text-xs mt-4 mb-2">Add profiles</p>
              {formData.interestedCandidates.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {formData.interestedCandidates.map((candidate) => (
                    <CandidateLink
                      key={candidate.id}
                      candidate={candidate}
                      onDelete={
                        isActiveStage
                          ? handleInterestedCandidateDelete
                          : undefined
                      }
                    />
                  ))}
                </div>
              )}

              {isActiveStage && showCandidateSelect && (
                <CandidateSelect
                  excludedCandidates={formData.interestedCandidates.map(
                    ({ id }) => id
                  )}
                  onCandidateSelect={handleInterestedCandidateSelect}
                />
              )}

              <div className="grid grid-cols-2 gap-2">
                {formData.interestedLinkedIns.map((link) => (
                  <LinkCard
                    key={link}
                    link={link}
                    onDelete={() => handleInterestedLinkedInDelete(link)}
                  />
                ))}
              </div>

              {isActiveStage && showLinkedInsAdd && (
                <TextFieldPopover
                  buttonLabel="Add link"
                  inputLabel="LinkedIn URL"
                  onSubmit={handleInterestedLinkedInSelect}
                />
              )}
              <p className="col-span-2 h4 font-semibold mb-2 mt-4">Comments</p>
              <div className="h-full flex flex-col flex-1">
                <WeavyApp
                  spaceKey={`job-${jobId}`}
                  spaceName={`job-${jobId}`}
                  appKey={`job-${jobId}`}
                  appName="Comments"
                  appType="posts"
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div
        id={scrollableTargetId}
        className={`grid overflow-y-auto ${
          candidatesSearchOpen ? "" : "hidden"
        }`}
      >
        {job.isSelectionStarted && candidatesSearchOpen && (
          <CandidatesSearch
            suggestedCandidatesQuery={suggestedCandidates}
            disabled={job?.isArchived}
            jobId={jobId}
            selectedCandidateIds={selectedCandidateIds}
            toggleCandidateSelection={toggleCandidateSelection}
            scrollableTargetId={scrollableTargetId}
          />
        )}
      </div>

      <div className={`grid h-full ${selectionOpen ? "" : "hidden"}`}>
        {job.isSelectionStarted && selectionOpen && (
          <CandidatesGrid
            jobId={jobId}
            allowedToInvite={job.isPublished}
            disabled={job?.isArchived}
            candidateLists={[
              ...(jobCandidates?.selectedCandidates || []),
              ...(jobCandidates?.archivedCandidates || []),
            ]}
            shortlistActivated={shortlistActivated}
            onUpdateCandidateBrief={handleUpdateCandidateBrief}
            onUpdateCandidatesStage={handleUpdateCandidatesStage}
            onRemoveCandidates={handleArchiveCandidates}
            onActivateCandidates={handleActivateCandidates}
            onActivateShortList={handleActivateShortList}
            onRankingCandidates={handleRankingCandidates}
            onInvitationSubmit={setJobCandidates}
            shortListActivatedAt={jobCandidates?.shortListActivatedAt}
          />
        )}
      </div>

      <div
        className={`flex flex-col grow min-h-0 ${
          companyInfoOpen ? "" : "hidden"
        }`}
      >
        {job.company && (
          <JobCompanyCallibration
            jobCompany={job.company}
            disabled={job.isArchived}
            hideAddNewContact={showPendingControls}
            onSubmit={handleCompanyInfoUpdate}
          />
        )}
      </div>
      {jobInfoOpen && (
        <div className="h-16 flex justify-between items-center p-4 border-t border-alto mt-auto">
          {!job.isArchived && (
            <div className="mr-auto">
              {(jobMutation.isLoading ||
                isPublishing ||
                isApproving ||
                isLoading) && <ModalLoader open />}
              <Button
                label="Save changes"
                variant={ButtonVariantType.Contained}
                color={ColorType.Primary}
                className="mr-4"
                onClick={() => handleJobSubmit()}
              />
            </div>
          )}
          <div className="ml-auto">
            {job.sharingDate && (
              <span className="mr-4 text-xs text-grey-middle">
                {format(new Date(job.sharingDate), DateFormats.DateWithTime)}
              </span>
            )}

            {showArchiveControls && (
              <div>
                {!job.isActivated &&
                  [JobStages.Successful, JobStages.OnHold].includes(
                    job.stage
                  ) && (
                    <Button
                      label="Activate"
                      disabled={activateDisabled}
                      onClick={handleJobActivate}
                    />
                  )}
              </div>
            )}
            {showActiveControls && (
              <>
                <Button
                  label="Archive the job"
                  variant={ButtonVariantType.Outlined}
                  color={ColorType.Info}
                  startIcon={<ArchiveIcon />}
                  className="mr-4"
                  onClick={handleArchiveClick}
                />
                <JobArchive
                  popupAnchorEl={popupAnchorEl}
                  isModalOpen={showJobArchive}
                  onSetOpenModal={setShowJobArchive}
                  jobId={jobId}
                  onSubmit={handleJobArchiveChanges}
                />
                {!hideJobSharingFunctionality && (
                  <Button
                    label={
                      jobShared ? "Information was shared" : "Share information"
                    }
                    variant={
                      jobShared
                        ? ButtonVariantType.Contained
                        : ButtonVariantType.Outlined
                    }
                    color={jobShared ? ColorType.Success : ColorType.Info}
                    startIcon={
                      jobShared ? <img src={CheckIcon} alt="check" /> : null
                    }
                    className="mr-4"
                    onClick={handleSharingClick}
                  />
                )}
                <JobSharing
                  popupAnchorEl={popupAnchorEl}
                  isModalOpen={showJobSharing}
                  onSetOpenModal={setShowJobSharing}
                  jobId={jobId}
                  onSubmitSharing={handleShareInfoChanges}
                />
                <Button
                  className="mr-4"
                  label={
                    job.isSelectionStarted
                      ? "Search and selection started"
                      : "Start search and selection"
                  }
                  onClick={handleSearchAndSelectionStart}
                  disabled={job.isSelectionStarted}
                  variant={ButtonVariantType.Outlined}
                  color={ColorType.Info}
                />
                <Button
                  label={job.isPublished ? "Published" : "Save and publish"}
                  onClick={handleSaveOnPublishClick}
                  disabled={job.isPublished}
                  variant={ButtonVariantType.Outlined}
                  color={ColorType.Info}
                />
              </>
            )}
            {showPendingControls && (
              <PendingControls
                className="ml-auto"
                email={mailTo}
                onApprove={handlePendingJobAprove}
                onReject={handlePendingJobReject}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(JobEdit);
