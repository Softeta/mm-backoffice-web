import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import Modal from "Components/UI/atoms/Modal";
import { useContext, useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import PopupHeader from "Components/UI/molecules/PopupHeader";
import ColorType from "Components/Enums/colorType";
import TextField from "Components/UI/atoms/TextField";
import {
  TFile,
  UploadType,
} from "Components/UI/molecules/FileUpload/FileUpload";
import { TConfigurations } from "API/Types/configurations";
import { ConfigurationsContext } from "Contexts/Configurations/ConfigurationsContext";
import {
  TAddCandidateCourseRequest,
  TCandidateCourseForm,
  TCandidateCourseResponse,
  TUpdateCandidateCourseRequest,
} from "API/Types/Candidate/Common/candidateCourse";
import { CircularProgress } from "@mui/material";
import FileCacheUpload from "Components/UI/molecules/FileUpload/FileCacheUpload";
import {
  addCertificateCache,
  deleteCertificateCache,
  updateCertificateCache,
} from "API/Calls/candidateCertificate";
import ActionMode from "../helpers/modeEnum";
import { defaultValues, InputNames } from "./useCourseExperienceForm";

interface IProps {
  isModalOpen: boolean;
  form: UseFormReturn<TCandidateCourseForm, any>;
  course: TCandidateCourseResponse | undefined;
  courseIndex?: number;
  actionMode: ActionMode;
  onSubmit: (data: TAddCandidateCourseRequest, index?: number) => void;
  onSave: (data: TUpdateCandidateCourseRequest, index: number) => void;
  onClose: () => void;
}

const CourseExperienceForm = ({
  isModalOpen,
  form,
  course,
  courseIndex,
  actionMode,
  onSubmit,
  onSave,
  onClose,
}: IProps) => {
  const { documentSettings } = useContext<TConfigurations>(
    ConfigurationsContext
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCertificateLoading, setIsCertificateLoading] = useState(false);

  useEffect(() => {
    if (course) {
      form.reset({ ...course, certificate: { hasChanged: false } });
    }
  }, [course, form]);

  const isValid = () => form.formState.isValid;

  const handleCertificateUpload = (cacheId?: string) => {
    form.setValue("certificate", { cacheId, hasChanged: true });
  };

  const handleClose = () => {
    form.reset(defaultValues);
    onClose();
  };

  const handleSubmit = async () => {
    const result = form.getValues();
    await form.trigger();
    if (!isValid()) return;
    setIsSubmitting(true);

    try {
      if (actionMode === ActionMode.Add) {
        await onSubmit(result, courseIndex);
      } else if (actionMode === ActionMode.Edit && courseIndex !== undefined) {
        await onSave(result, courseIndex);
      }
      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={isModalOpen}
      header={
        <PopupHeader
          label={
            actionMode === ActionMode.Add ? "Add a new course" : "Save course"
          }
          onClose={handleClose}
        />
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="pb-8 grid grid-cols-2 gap-4 py-8 px-4 w-[392px]">
          <div className="col-span-2">
            <Controller
              name={InputNames.name}
              control={form.control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  className="w-full"
                  label="Name"
                  value={value}
                  onChange={onChange}
                  required
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </div>
          <div className="col-span-2">
            <Controller
              name={InputNames.issuingOrganization}
              control={form.control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Issuing Organization"
                  value={value}
                  onChange={onChange}
                  required
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </div>
          <div className="col-span-2">
            <Controller
              name={InputNames.description}
              control={form.control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  multiline
                  label="Course description"
                  minRows={3}
                  inputProps={{
                    maxLength: 150,
                  }}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className="col-span-2">
            <Controller
              name={InputNames.certificateCacheId}
              control={form.control}
              render={() => (
                <FileCacheUpload
                  size={documentSettings.maxSizeInKilobytes}
                  label="Upload certificate"
                  changeLabel="Change certificate"
                  defaultCacheId={form.getValues().certificate?.cacheId}
                  onDeleteFileCache={deleteCertificateCache}
                  onUpdateFileCache={updateCertificateCache}
                  onAddFileCache={addCertificateCache}
                  onFileCacheUpdated={handleCertificateUpload}
                  onLoading={setIsCertificateLoading}
                  selectedFile={course?.certificate as TFile | undefined}
                  supportedExtensions={documentSettings.supportedExtensions}
                  uploadType={UploadType.File}
                />
              )}
            />
          </div>
          <div className="col-span-2 text-right flex ml-auto">
            {!isSubmitting ? (
              <>
                <div className="pr-3">
                  <Button
                    variant={ButtonVariantType.Outlined}
                    color={ColorType.Info}
                    label="Cancel"
                    className="mt-1"
                    onClick={handleClose}
                  />
                </div>
                <div>
                  <Button
                    label={
                      actionMode === ActionMode.Add
                        ? "Add course"
                        : "Save course"
                    }
                    disabled={isCertificateLoading}
                    className="mt-1"
                    onClick={handleSubmit}
                  />
                </div>
              </>
            ) : (
              <CircularProgress />
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CourseExperienceForm;
