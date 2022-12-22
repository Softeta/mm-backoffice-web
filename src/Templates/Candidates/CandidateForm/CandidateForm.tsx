import { useContext, useState } from "react";
import { AlertColor, Tab } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import snackbarState from "Components/UI/molecules/Snackbar/snackbarState";
import Switch from "Components/UI/atoms/Switch";
import { Tabs } from "Components/UI/atoms/Tabs";
import { t } from "i18next";
import {
  TAddCandidateCourseRequest,
  TUpdateCandidateCourseRequest,
} from "API/Types/Candidate/Common/candidateCourse";
import {
  TAddCandidateEducationRequest,
  TUpdateCandidateEducationRequest,
} from "API/Types/Candidate/Common/candidateEducation";
import { useCandidateTests } from "API/Calls/candidatesTests";
import { parsePhoneNumber as libParsePhoneNumber } from "libphonenumber-js";
import ModalLoader from "Components/UI/molecules/ModalLoader";
import { TCandidateWorkExperience } from "API/Types/Candidate/Common/candidateWorkExperience";
import { CandidateModalTabSections } from "Contexts/ActiveTabs/CandidateModalActiveTab/CandidateModalTabSections";
import CandidateModalActiveTabContext, {
  CandidateModalActiveTab,
} from "Contexts/ActiveTabs/CandidateModalActiveTab/CandidateModalActiveTabContext";
import Button from "Components/UI/atoms/Button";
import { TFile } from "Components/UI/molecules/FileUpload/FileUpload";
import Divide from "Components/UI/atoms/Divide";
import DivideVariantType from "Components/UI/atoms/Divide/divideVariantType";
import TextField from "Components/UI/atoms/TextField";
import { TCvCandidate } from "API/Types/Candidate/candidateFromCv";
import { CandidateTestResults } from "Components/UI/organisms/CandidateTestResults";
import CandidateInfoForm from "./CandidateInfo/CandidateInfoForm/CandidateInfoForm";
import { InputNames } from "./InputNames";
import CandidateFormTab from "./CandidateFormTab";
import WorkExperience from "./CandidateExperience/WorkExperience/WorkExperience";
import EducationExperience from "./CandidateExperience/EducationExperience/EducationExperience";
import CourseExperience from "./CandidateExperience/CourseExperience/CourseExperience";
import CandidateFiles from "./CandidateInfo/CandidateFiles";
import CandidateActivity from "../CandidateActivity";
import { ExperienceInputNames } from "./CandidateExperience/CourseExperience/enums";
import WeavyApp from "../../../Weavy/WeavyApp";
import CandidateTestsControls from "../CandidateTestsControls";

type TCandidateForm = {
  onDeleteWork: (index: number) => void;
  onAddWork: (data: TCandidateWorkExperience, index?: number) => void;
  onEditWork: (data: TCandidateWorkExperience, index: number) => void;
  onDeleteEducation: (index: number) => void;
  onAddEducation: (data: TAddCandidateEducationRequest, index?: number) => void;
  onEditEducation: (
    data: TUpdateCandidateEducationRequest,
    index: number
  ) => void;
  onDeleteCourse: (index: number) => void;
  onAddCourse: (data: TAddCandidateCourseRequest, index?: number) => void;
  onEditCourse: (data: TUpdateCandidateCourseRequest, index: number) => void;
  onOpenForOpportunitiesChange: (checked: boolean) => void;
  onYearExperienceChange: (experience?: number) => void;
  onVideoUpload: (cacheId?: string) => void;
  onCurriculumVitaeUpload: (cacheId?: string) => void;
  onCandidatePictureUpload: (cacheId?: string, file?: TFile) => void;
  defaultVideoCacheId?: string;
  defaultCurriculumVitaeCacheId?: string;
  defaultCandidatePictureCacheId?: string;
  selectedVideo?: TFile;
  selectedCurriculumVitae?: TFile;
  selectedCandidatePicture?: TFile;
  onSubmit?: () => void;
  isLoading?: boolean;
  candidateId?: string;
  footer?: React.ReactNode;
};

export const CandidateForm = ({
  onDeleteWork,
  onAddWork,
  onEditWork,
  onDeleteEducation,
  onAddEducation,
  onEditEducation,
  onDeleteCourse,
  onAddCourse,
  onEditCourse,
  onYearExperienceChange,
  onOpenForOpportunitiesChange,
  onVideoUpload,
  onCurriculumVitaeUpload,
  onCandidatePictureUpload,
  defaultVideoCacheId,
  defaultCurriculumVitaeCacheId,
  defaultCandidatePictureCacheId,
  selectedVideo,
  selectedCurriculumVitae,
  selectedCandidatePicture,
  onSubmit,
  isLoading,
  candidateId,
  footer,
}: TCandidateForm) => {
  const setSnackbar = useSetRecoilState(snackbarState);
  const methods = useFormContext();
  const {
    formState: { isSubmitting },
  } = methods;
  const { activeTab, setActiveTab } = useContext<CandidateModalActiveTab>(
    CandidateModalActiveTabContext
  );
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(false);
  const [isCurriculumVitaeLoading, setIsCurriculumVitaeLoading] =
    useState<boolean>(false);
  const [isCandidatePictureLoading, setIsCandidatePictureLoading] =
    useState<boolean>(false);
  const [isPhoneError, setIsPhoneError] = useState<boolean>(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const showErrorSnackbar = (error: string) => {
    if (error) {
      showSnackbar(t(error), "error");
    }
  };

  const validate = () => {
    if (!methods.getValues().firstName) {
      return "Error.Candidate.FirstNameRequired";
    }
    if (!methods.getValues().lastName) {
      return "Error.Candidate.LastNameRequired";
    }
    if (
      !methods.getValues().workTypes ||
      methods.getValues().workTypes.length === 0
    ) {
      return "Error.Candidate.WorkTypeRequired";
    }
    if (isPhoneError) {
      return "Error.Candidate.PhoneNumberInvalid";
    }
    return undefined;
  };

  const handleSubmit = async () => {
    const error = validate();
    await methods.trigger();
    if (error) {
      showErrorSnackbar(error);
    } else {
      onSubmit?.();
    }
  };

  const hasIncompleteExperience = () => {
    const courses = methods.getValues(
      ExperienceInputNames.courses
    ) as TAddCandidateCourseRequest[];
    const incompleteCourses = courses?.filter((x) => !x.id);
    const educations = methods.getValues(
      ExperienceInputNames.educations
    ) as TAddCandidateEducationRequest[];
    const incompleteEducations = educations?.filter((x) => !x.id);
    const workExperiences = methods.getValues(
      ExperienceInputNames.workExperiences
    ) as TCandidateWorkExperience[];
    const incompleteWorkExperiences = workExperiences?.filter((x) => !x.id);

    return (
      incompleteCourses?.length > 0 ||
      incompleteEducations?.length > 0 ||
      incompleteWorkExperiences?.length > 0
    );
  };

  const isButtonDisabled = () =>
    isVideoLoading || isCurriculumVitaeLoading || isCandidatePictureLoading;

  const infoOpen = activeTab === CandidateModalTabSections.Info;
  const experienceOpen = activeTab === CandidateModalTabSections.Experience;
  const testsOpen = activeTab === CandidateModalTabSections.Tests;
  const activityOpen = activeTab === CandidateModalTabSections.Activity;
  const showLoader = isLoading || isSubmitting;
  const showApplyButton = !!candidateId && infoOpen && !showLoader;
  const showCreateButton = !candidateId && !showLoader;

  const handleCandidateCvParsed = (data: TCvCandidate) => {
    if (data.firstName && !methods.getValues("firstName")) {
      methods.setValue("firstName", data.firstName);
    }
    if (data.lastName && !methods.getValues("lastName")) {
      methods.setValue("lastName", data.lastName);
    }
    if (data.phoneNumber && !methods.getValues("phone.number")) {
      try {
        const parser = libParsePhoneNumber(data.phoneNumber);
        methods.setValue("phone.countryCode", `+${parser.countryCallingCode}`);
        methods.setValue("phone.number", parser.nationalNumber);
      } catch {
        //
      }
    }
    if (
      data.languages &&
      data.languages.length > 0 &&
      methods.getValues("languages").length === 0
    ) {
      methods.setValue("languages", data.languages);
    }
    if (data.linkedInUrl && !methods.getValues("linkedInUrl")) {
      methods.setValue("linkedInUrl", data.linkedInUrl);
    }
    if (data.email && !methods.getValues("email")) {
      methods.setValue("email", data.email);
    }
    if (data.address && !methods.getValues("address")) {
      methods.setValue("address", data.address);
    }
    if (data.currentPosition && !methods.getValues("currentPosition")) {
      methods.setValue("currentPosition", data.currentPosition);
    }
    if (
      data.skills &&
      data.skills.length > 0 &&
      methods.getValues("skills").length === 0
    ) {
      methods.setValue("skills", data.skills);
    }

    if (
      data.candidateWorkExperiences &&
      data.candidateWorkExperiences.length > 0 &&
      methods.getValues(ExperienceInputNames.workExperiences).length === 0
    ) {
      methods.setValue(
        ExperienceInputNames.workExperiences,
        data.candidateWorkExperiences
      );
    }
    if (
      data.candidateEducations &&
      data.candidateEducations.length > 0 &&
      methods.getValues(ExperienceInputNames.educations).length === 0
    ) {
      methods.setValue(
        ExperienceInputNames.educations,
        data.candidateEducations
      );
    }
    if (
      data.candidateCourses &&
      data.candidateCourses.length > 0 &&
      methods.getValues(ExperienceInputNames.courses).length === 0
    ) {
      methods.setValue(ExperienceInputNames.courses, data.candidateCourses);
    }
  };

  const {
    data: candidateTests,
    isLoading: testsLoading,
    refetch,
  } = useCandidateTests(candidateId!, testsOpen);

  const handleCandidateTestChanges = () => {
    refetch();
  };

  return (
    <>
      <div className="flex bg-grey-light/25 border-b border-alto pl-1">
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab value={CandidateModalTabSections.Info} label="Candidate info" />
          {hasIncompleteExperience() ? (
            <Tab
              value={CandidateModalTabSections.Experience}
              label="Experience (New)"
            />
          ) : (
            <Tab
              value={CandidateModalTabSections.Experience}
              label="Experience"
            />
          )}
          <Tab value={CandidateModalTabSections.Tests} label="Tests" />
          {candidateId && (
            <Tab value={CandidateModalTabSections.Activity} label="Activity" />
          )}
        </Tabs>
        <Controller
          name={InputNames.openForOpportunities}
          control={methods.control}
          render={({ field }) => (
            <Switch
              className="ml-auto mr-10 self-center"
              text="Open to opportunities"
              {...field}
              checked={methods.getValues().openForOpportunities}
              onChange={(_, checked) => onOpenForOpportunitiesChange(checked)}
            />
          )}
        />
      </div>
      {hasIncompleteExperience() && !!candidateId && (
        <div className="bg-yellow-light h6 p-2">
          Warning! There is some new experiences in experience tab. Review and
          save it. Otherwise the data of new experiences will be lost.
        </div>
      )}
      <CandidateFormTab
        open={infoOpen}
        left={() => (
          <CandidateInfoForm
            defaultCandidatePictureChacheId={defaultCandidatePictureCacheId}
            selectedPicture={selectedCandidatePicture}
            onCandidatePictureLoading={setIsCandidatePictureLoading}
            onCandidatePictureUpload={onCandidatePictureUpload}
            onPhoneError={setIsPhoneError}
            form={methods}
          />
        )}
        right={() => (
          <>
            <p className="h4 font-semibold col-span-2 mb-4">Bio</p>
            <Controller
              name={InputNames.bio}
              control={methods.control}
              render={({ field }) => (
                <TextField {...field} label="Bio" multiline minRows={3} />
              )}
            />
            <Divide
              variant={DivideVariantType.Horizontal}
              size={6}
              className="col-span-2"
            />
            <CandidateFiles
              defaultVideoCacheId={defaultVideoCacheId}
              defaultCurriculumVitaeCacheId={defaultCurriculumVitaeCacheId}
              selectedCurriculumVitae={selectedCurriculumVitae}
              selectedVideo={selectedVideo}
              onVideoUpload={onVideoUpload}
              onCurriculumVitaeUpload={onCurriculumVitaeUpload}
              onVideoLoading={setIsVideoLoading}
              onCurriculumVitaeLoading={setIsCurriculumVitaeLoading}
              onCandidateCvParsed={handleCandidateCvParsed}
            />
            <Divide
              variant={DivideVariantType.Horizontal}
              size={6}
              className="col-span-2"
            />
            <p className="h4 font-semibold col-span-2 mb-4">Comments</p>
            <div className="h-full flex flex-col flex-1">
              <WeavyApp
                spaceKey={`candidate-${candidateId}`}
                spaceName={`candidate-${candidateId}`}
                appKey={`candidate-${candidateId}`}
                appName="Comments"
                appType="posts"
              />
            </div>
          </>
        )}
      />

      <CandidateFormTab
        open={experienceOpen}
        left={() => (
          <WorkExperience
            isNewCandidate={!candidateId}
            onDeleteWork={onDeleteWork}
            onAddWork={onAddWork}
            onEditWork={onEditWork}
            onYearExperienceChange={onYearExperienceChange}
          />
        )}
        right={() => (
          <>
            <EducationExperience
              isNewCandidate={!candidateId}
              onDeleteEducation={onDeleteEducation}
              onAddEducation={onAddEducation}
              onEditEducation={onEditEducation}
            />
            <CourseExperience
              isNewCandidate={!candidateId}
              onDeleteCourse={onDeleteCourse}
              onAddCourse={onAddCourse}
              onEditCourse={onEditCourse}
            />
          </>
        )}
      />

      {candidateId && testsOpen && (
        <CandidateTestResults data={candidateTests} isLoading={testsLoading} />
      )}
      {candidateId && activityOpen && (
        <CandidateActivity candidateId={candidateId} />
      )}

      <div className="h-16 flex justify-between items-center p-4 border-t mt-auto border-alto">
        <ModalLoader open={showLoader} />
        {showApplyButton && (
          <Button
            label="Apply changes"
            disabled={isButtonDisabled()}
            onClick={handleSubmit}
          />
        )}
        {showCreateButton && (
          <Button
            label="Create Candidate"
            disabled={isButtonDisabled()}
            onClick={handleSubmit}
          />
        )}
        {candidateId && testsOpen && (
          <CandidateTestsControls
            data={candidateTests}
            isLoading={testsLoading}
            candidateId={candidateId!}
            onDeleteLgi={handleCandidateTestChanges}
            onDeletePapi={handleCandidateTestChanges}
            onForceSyncLgi={handleCandidateTestChanges}
            onForceSyncPapi={handleCandidateTestChanges}
          />
        )}
        {footer}
      </div>
    </>
  );
};

export default CandidateForm;
