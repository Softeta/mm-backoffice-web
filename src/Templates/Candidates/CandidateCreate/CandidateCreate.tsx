import { TCandidate } from "API/Types/Candidate/candidateGet";
import { FormProvider } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { createCandidate, CandidateQueryKeys } from "API/Calls/candidates";
import { TAddCandidateCourseRequest } from "API/Types/Candidate/Common/candidateCourse";
import { useMemo } from "react";
import { TCandidateWorkExperience } from "API/Types/Candidate/Common/candidateWorkExperience";
import { TAddCandidateEducationRequest } from "API/Types/Candidate/Common/candidateEducation";
import { TCandidateCreateRequest } from "API/Types/Candidate/candidateCreate";
import { TFile } from "Components/UI/molecules/FileUpload/FileUpload";
import TopBar from "Components/UI/molecules/TopBar";
import WorkTypesEnum from "Enums/workType";
import CandidateHeader, {
  ICandidateHeader,
} from "../CandidateHeader/CandidateHeader";
import CandidateForm from "../CandidateForm";
import { useCandidateCreateForm } from "../CandidateForm/useCandidateCreateForm";

type TCandidateCreate = {
  onClose: () => void;
  onCreate?: (candidate?: TCandidate) => void;
};

const CandidateCreate = ({ onClose, onCreate }: TCandidateCreate) => {
  const methods = useCandidateCreateForm();

  const candidateMutation = useMutation((candidate: TCandidateCreateRequest) =>
    createCandidate(candidate)
  );

  const queryClient = useQueryClient();

  const handleAddWork = (data: TCandidateWorkExperience) => {
    const { workExperiences = [] } = methods.getValues();
    methods.setValue("workExperiences", [...workExperiences, data]);
  };
  const handleEditWork = (data: TCandidateWorkExperience, index: number) => {
    const { workExperiences = [] } = methods.getValues();
    workExperiences.splice(index, 1, data);
    methods.setValue("workExperiences", workExperiences);
  };
  const handleDeleteWork = (index: number) => {
    const { workExperiences = [] } = methods.getValues();
    workExperiences.splice(index, 1);
    methods.setValue("workExperiences", workExperiences);
  };

  const handleAddEducation = (data: TAddCandidateEducationRequest) => {
    const { educations = [] } = methods.getValues();
    methods.setValue("educations", [...educations, data]);
  };
  const handleEditEducation = (
    data: TAddCandidateEducationRequest,
    index: number
  ) => {
    const { educations = [] } = methods.getValues();
    educations.splice(index, 1, data);
    methods.setValue("educations", educations);
  };
  const handleDeleteEducation = (index: number) => {
    const { educations = [] } = methods.getValues();
    educations.splice(index, 1);
    methods.setValue("educations", educations);
  };

  const handleAddCourse = (data: TAddCandidateCourseRequest) => {
    const { courses = [] } = methods.getValues();
    methods.setValue("courses", [...courses, data]);
  };
  const handleEditCourse = (
    data: TAddCandidateCourseRequest,
    index: number
  ) => {
    const { courses = [] } = methods.getValues();
    courses.splice(index, 1, data);
    methods.setValue("courses", courses);
  };
  const handleDeleteCourse = (index: number) => {
    const { courses = [] } = methods.getValues();
    courses.splice(index, 1);
    methods.setValue("courses", courses);
  };

  const handleYearExperienceChange = (experience?: number) => {
    methods.setValue("yearsOfExperience", experience);
  };

  const handleCurriculumVitaeUpload = (cacheId?: string) => {
    methods.setValue("curriculumVitae.cacheId", cacheId);
  };

  const handleVideoUpload = (cacheId?: string) => {
    methods.setValue("video.cacheId", cacheId);
  };

  const handleCandidatePictureUpload = (cacheId?: string, file?: TFile) => {
    methods.setValue("picture.cacheId", cacheId);
    methods.setValue("attachedPictureUrl", file?.uri);
  };

  const handleFormSubmit = async (request: TCandidateCreateRequest) => {
    const { data } = (await candidateMutation.mutateAsync(request)) as any;
    queryClient.invalidateQueries(CandidateQueryKeys.candidates);

    if (onCreate) onCreate(data as TCandidate);
    onClose();
  };

  const handleOpenForOpportunitiesChange = (checked: boolean) => {
    methods.setValue("openForOpportunities", checked);
  };

  const formData = methods.watch();
  const headerProps: ICandidateHeader = useMemo(
    () => ({
      imageURL: formData.attachedPictureUrl,
      firstName: formData.firstName,
      lastName: formData.lastName,
      currentPosition: formData.currentPosition,
      freelance: formData.workTypes.includes(WorkTypesEnum.Freelance),
      permanent: formData.workTypes.includes(WorkTypesEnum.Permanent),
      startDate: formData.startDate,
      linkedInUrl: formData.linkedInUrl,
      personalWebsiteUrl: formData.personalWebsiteUrl,
    }),
    [formData]
  );

  return (
    <FormProvider {...methods}>
      <div className="w-full h-100v lg:w-[85vw] flex flex-col">
        <TopBar onClose={onClose}>
          <CandidateHeader {...headerProps} />
        </TopBar>
        <CandidateForm
          onDeleteWork={handleDeleteWork}
          onAddWork={handleAddWork}
          onEditWork={handleEditWork}
          onDeleteEducation={handleDeleteEducation}
          onAddEducation={handleAddEducation}
          onEditEducation={handleEditEducation}
          onDeleteCourse={handleDeleteCourse}
          onAddCourse={handleAddCourse}
          onEditCourse={handleEditCourse}
          onYearExperienceChange={handleYearExperienceChange}
          onVideoUpload={handleVideoUpload}
          onCurriculumVitaeUpload={handleCurriculumVitaeUpload}
          onCandidatePictureUpload={handleCandidatePictureUpload}
          defaultVideoCacheId={methods.getValues().video?.cacheId}
          defaultCurriculumVitaeCacheId={
            methods.getValues().curriculumVitae?.cacheId
          }
          defaultCandidatePictureCacheId={methods.getValues().picture?.cacheId}
          onSubmit={methods.handleSubmit(handleFormSubmit)}
          onOpenForOpportunitiesChange={handleOpenForOpportunitiesChange}
        />
      </div>
    </FormProvider>
  );
};

export default CandidateCreate;
