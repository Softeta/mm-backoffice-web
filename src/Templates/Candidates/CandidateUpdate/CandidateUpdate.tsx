import AddIcon from "Assets/Icons/add.svg";
import Divide from "Components/UI/atoms/Divide";
import DivideVariantType from "Components/UI/atoms/Divide/divideVariantType";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import ColorType from "Components/Enums/colorType";
import CloseIcon from "Assets/Icons/close.svg";
import { FormProvider } from "react-hook-form";
import Button from "Components/UI/atoms/Button";
import {
  CandidateQueryKeys,
  putCandidate,
  updateCandidateNote,
  updateCandidateOpenForOpportunities,
} from "API/Calls/candidates";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { setDefaultAttachment } from "Helpers/setDefaultAttachment";
import { TCandidateWorkExperience } from "API/Types/Candidate/Common/candidateWorkExperience";
import {
  createWorkExperience,
  deleteWorkExperience,
  updateWorkExperience,
} from "API/Calls/candidateWorkExperience";
import {
  TAddCandidateCourseRequest,
  TUpdateCandidateCourseRequest,
} from "API/Types/Candidate/Common/candidateCourse";
import {
  createCourse,
  deleteCourse,
  updateCourse,
} from "API/Calls/candidateCourse";
import {
  createEducation,
  deleteEducation,
  updateEducation,
} from "API/Calls/candidateEducation";
import {
  TCandidate,
  TCandidateResponse,
} from "API/Types/Candidate/candidateGet";
import {
  TAddCandidateEducationRequest,
  TUpdateCandidateEducationRequest,
} from "API/Types/Candidate/Common/candidateEducation";
import { TCandidateUpdateRequest } from "API/Types/Candidate/candidateUpdate";
import ModalLoader from "Components/UI/molecules/ModalLoader";
import WorkTypesEnum from "Enums/workType";
import CenteredLoader from "Components/UI/molecules/CenteredLoader";
import { TFile } from "Components/UI/molecules/FileUpload/FileUpload";
import { TFileResponse } from "API/Types/fileResponse";
import StatusNote from "Components/UI/molecules/StatusNote";
import { approveCandidate, rejectCandidate } from "API/Calls/pendingCandidates";
import PendingControls from "Components/UI/organisms/PendingControls";
import { TCandidateNote } from "API/Types/Candidate/Common/candidateNote";
import {
  candidateToInputs,
  useCandidateUpdateForm,
} from "../CandidateForm/useCandidateUpdateForm";
import CandidateForm from "../CandidateForm";
import CandidateHeader from "../CandidateHeader";
import { ICandidateHeader } from "../CandidateHeader/CandidateHeader";
import CandidateStatusNoteForm from "../CandidateStatusNoteForm";

type TCandidateUpdate = {
  candidateId: string;
  pending?: boolean;
  candidate?: TCandidateResponse;
  isLoading?: boolean;
  onClose?: () => void;
  onCandidateUpdate: (data: TCandidate) => void;
  onPendingCandidatesChange?: () => void;
};

const CandidateUpdate = ({
  candidateId,
  candidate,
  pending,
  isLoading = false,
  onClose,
  onCandidateUpdate,
  onPendingCandidatesChange,
}: TCandidateUpdate) => {
  const methods = useCandidateUpdateForm();
  const mutation = useMutation(
    CandidateQueryKeys.candidateUpdate,
    (candidateData: TCandidateUpdateRequest) =>
      putCandidate(candidateData, candidateId)
  );

  const [isFormReady, setIsFormReady] = useState(false);
  const [showStatusNoteModal, setShowStatusNoteModal] = useState(false);
  const [candidateNote, setCandidateNote] = useState(candidate?.data.note);
  const [isApproving, setIsApproving] = useState(false);

  const handleStatusNoteChange = async (note?: TCandidateNote) => {
    setShowStatusNoteModal(false);
    const prevNote = { ...candidateNote } as TCandidateNote | undefined;
    try {
      setCandidateNote(note);
      const { data } = await updateCandidateNote(
        note
          ? {
              value: note.value,
              endDate: note.endDate,
            }
          : { value: undefined, endDate: undefined },
        candidateId
      );
      onCandidateUpdate(data);
    } catch (err) {
      setCandidateNote(prevNote);
    }
  };

  const handleStatusNoteDelete = () => handleStatusNoteChange(undefined);

  const handleOpenForOpportunitiesChange = async (checked: boolean) => {
    const { openForOpportunities } = methods.getValues();
    methods.setValue("openForOpportunities", checked);
    try {
      const { data } = await updateCandidateOpenForOpportunities(
        { openForOpportunities: methods.getValues().openForOpportunities },
        candidateId
      );
      onCandidateUpdate(data);
    } catch (err) {
      methods.setValue("openForOpportunities", openForOpportunities);
    }
  };

  const handleFormSubmit = async (
    payload: Partial<TCandidateUpdateRequest>
  ) => {
    const { data } = await mutation.mutateAsync(
      payload as TCandidateUpdateRequest
    );
    onCandidateUpdate(data);
  };

  const handleAddWork = async (
    payload: TCandidateWorkExperience,
    index?: number
  ) => {
    const { workExperiences = [] } = methods.getValues();
    const { data } = await createWorkExperience(candidateId, payload);
    if (data && index !== undefined && index > -1) {
      workExperiences.splice(index, 1);
      data.candidateWorkExperiences = data.candidateWorkExperiences.concat(
        workExperiences.filter((x) => !x.id)
      );
    }
    methods.setValue("workExperiences", data?.candidateWorkExperiences);
    onCandidateUpdate(data);
  };

  const handleEditWork = async (
    payload: TCandidateWorkExperience,
    index: number
  ) => {
    const { workExperiences = [] } = methods.getValues();
    const workExperienceId = workExperiences[index].id;
    if (!workExperienceId) return;

    const { data } = await updateWorkExperience(
      candidateId,
      workExperienceId,
      payload
    );

    if (data) {
      workExperiences[index] = data.candidateWorkExperiences[index];
    }

    methods.setValue("workExperiences", workExperiences);
    onCandidateUpdate(data);
  };

  const handleDeleteWork = async (index: number) => {
    const { workExperiences = [] } = methods.getValues();
    const workExperienceId = workExperiences[index].id;
    const workExperiencesEdited = [...workExperiences];
    workExperiencesEdited.splice(index, 1);
    methods.setValue("workExperiences", workExperiencesEdited);

    if (!workExperienceId) return;

    try {
      const { data } = await deleteWorkExperience(
        candidateId,
        workExperienceId
      );
      onCandidateUpdate(data);
    } catch (err) {
      methods.setValue("workExperiences", workExperiences);
    }
  };

  const handleAddEducation = async (
    payload: TAddCandidateEducationRequest,
    index?: number
  ) => {
    const { educations = [] } = methods.getValues();
    const { data } = await createEducation(candidateId, payload);
    if (data && index !== undefined && index > -1) {
      educations.splice(index, 1);
      data.candidateEducations = data.candidateEducations.concat(
        educations.filter((x) => !x.id)
      );
    }

    methods.setValue("educations", data.candidateEducations);
    onCandidateUpdate(data);
  };

  const handleEditEducation = async (
    payload: TUpdateCandidateEducationRequest,
    index: number
  ) => {
    const { educations = [] } = methods.getValues();
    const educationId = educations[index].id;
    if (!educationId) return;

    const { data } = await updateEducation(candidateId, educationId, payload);
    if (data) {
      educations[index] = data.candidateEducations[index];
    }

    methods.setValue("educations", educations);
    onCandidateUpdate(data);
  };

  const handleDeleteEducation = async (index: number) => {
    const { educations = [] } = methods.getValues();
    const educationId = educations[index].id;

    const educationsEdited = [...educations];
    educationsEdited.splice(index, 1);
    methods.setValue("educations", educationsEdited);

    if (!educationId) return;

    try {
      const { data } = await deleteEducation(candidateId, educationId);
      onCandidateUpdate(data);
    } catch (err) {
      methods.setValue("educations", educations);
    }
  };

  const handleAddCourse = async (
    payload: TAddCandidateCourseRequest,
    index?: number
  ) => {
    const { courses = [] } = methods.getValues();
    const { data } = await createCourse(candidateId, payload);
    if (data && index !== undefined && index > -1) {
      courses.splice(index, 1);
      data.candidateCourses = data.candidateCourses.concat(
        courses.filter((x) => !x.id)
      );
    }

    methods.setValue("courses", data.candidateCourses);
    onCandidateUpdate(data);
  };

  const handleEditCourse = async (
    payload: TUpdateCandidateCourseRequest,
    index: number
  ) => {
    const { courses = [] } = methods.getValues();
    const courseId = courses[index].id;
    if (!courseId) return;

    const { data } = await updateCourse(candidateId, courseId, payload);
    if (data) {
      courses[index] = data.candidateCourses[index];
    }

    methods.setValue("courses", courses);
    onCandidateUpdate(data);
  };

  const handleDeleteCourse = async (index: number) => {
    const { courses = [] } = methods.getValues();
    const courseId = courses[index].id;
    const coursesEdited = [...courses];
    coursesEdited.splice(index, 1);
    methods.setValue("courses", coursesEdited);

    if (!courseId) return;

    try {
      const { data } = await deleteCourse(candidateId, courseId);
      onCandidateUpdate(data);
    } catch (err) {
      methods.setValue("courses", courses);
    }
  };

  const handleCurriculumVitaeUpload = (cacheId?: string) => {
    methods.setValue("curriculumVitae", { cacheId, hasChanged: true });
  };

  const handleVideoUpload = (cacheId?: string) => {
    methods.setValue("video", { cacheId, hasChanged: true });
  };

  const handlePictureUpload = (cacheId?: string, file?: TFile) => {
    methods.setValue("picture", { cacheId, hasChanged: true });
    methods.setValue("attachedPicture", file as TFileResponse);
  };

  const handlePendingCandidateAprove = async () => {
    try {
      setIsApproving(true);
      await handleFormSubmit(methods.getValues());
      await approveCandidate(candidateId);
    } finally {
      setIsApproving(false);
    }

    onPendingCandidatesChange?.();
  };

  const handlePendingCandidateReject = async () => {
    await rejectCandidate(candidateId);
    onPendingCandidatesChange?.();
  };

  const formData = methods.watch();
  const headerProps: ICandidateHeader = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    imageURL: formData.attachedPicture?.uri,
    currentPosition: formData.currentPosition,
    freelance: formData.workTypes.includes(WorkTypesEnum.Freelance),
    permanent: formData.workTypes.includes(WorkTypesEnum.Permanent),
    startDate: formData.startDate,
    linkedInUrl: formData.linkedInUrl,
    personalWebsiteUrl: formData.personalWebsiteUrl,
  };

  useEffect(() => {
    if (candidate?.data) {
      setCandidateNote(candidate?.data.note);
    }
  }, [candidate]);

  useEffect(() => {
    if (candidate?.data) {
      methods.reset(candidateToInputs(candidate.data));
      setIsFormReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidate?.data]);

  useEffect(() => {
    methods.setValue("picture", setDefaultAttachment());
    methods.setValue("video", setDefaultAttachment());
    methods.setValue("curriculumVitae", setDefaultAttachment());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess]);

  return (
    <div className="w-full h-100v lg:w-[85vw] flex flex-col">
      {(mutation.isLoading || isApproving || isLoading) && <ModalLoader open />}
      <div className="flex items-center px-6 py-4 border-b border-alto tmpUtil-headerHeight flex-shrink-0">
        {onClose && (
          <>
            <Button
              label="Close"
              variant={ButtonVariantType.Text}
              startIcon={<img src={CloseIcon} alt="" />}
              color={ColorType.Info}
              onClick={onClose}
            />
            <Divide variant={DivideVariantType.Vertical} />
          </>
        )}
        <CandidateHeader className="mr-auto" {...headerProps} />

        {candidateNote ? (
          <StatusNote
            className="ml-2"
            note={candidateNote}
            onEdit={() => setShowStatusNoteModal(true)}
            onDelete={handleStatusNoteDelete}
          />
        ) : (
          <Button
            className="text-grey-middle text-xs ml-auto"
            label="Add a new note or status"
            onClick={() => setShowStatusNoteModal(true)}
            variant={ButtonVariantType.Text}
            startIcon={<img src={AddIcon} alt="" />}
          />
        )}
      </div>
      {!isFormReady && <CenteredLoader />}
      {isFormReady && (
        <FormProvider {...methods}>
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
            onYearExperienceChange={() => {}}
            onOpenForOpportunitiesChange={handleOpenForOpportunitiesChange}
            onCurriculumVitaeUpload={handleCurriculumVitaeUpload}
            onVideoUpload={handleVideoUpload}
            onCandidatePictureUpload={handlePictureUpload}
            defaultVideoCacheId={methods.getValues().video?.cacheId}
            selectedCurriculumVitae={
              methods.getValues().attachedCurriculumVitae as TFile | undefined
            }
            selectedVideo={
              methods.getValues().attachedVideo as TFile | undefined
            }
            selectedCandidatePicture={
              methods.getValues().attachedPicture as TFile | undefined
            }
            defaultCurriculumVitaeCacheId={
              methods.getValues().curriculumVitae?.cacheId
            }
            defaultCandidatePictureCacheId={
              methods.getValues().picture?.cacheId
            }
            onSubmit={methods.handleSubmit(handleFormSubmit)}
            isLoading={isLoading}
            candidateId={candidateId}
            footer={
              pending && (
                <PendingControls
                  className="ml-auto"
                  email={formData.email}
                  onApprove={handlePendingCandidateAprove}
                  onReject={handlePendingCandidateReject}
                />
              )
            }
          />
        </FormProvider>
      )}
      <CandidateStatusNoteForm
        open={showStatusNoteModal}
        statusNote={candidateNote}
        onStatusNoteChange={handleStatusNoteChange}
        onClose={() => setShowStatusNoteModal(false)}
      />
    </div>
  );
};

export default CandidateUpdate;
