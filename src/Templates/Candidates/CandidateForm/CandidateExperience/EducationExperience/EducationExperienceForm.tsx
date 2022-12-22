import {
  TAddCandidateEducationRequest,
  TCandidateEducationForm,
  TCandidateEducationResponse,
  TUpdateCandidateEducationRequest,
} from "API/Types/Candidate/Common/candidateEducation";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import Modal from "Components/UI/atoms/Modal";
import { useContext, useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import ColorType from "Components/Enums/colorType";
import TextField from "Components/UI/atoms/TextField";
import PopupHeader from "Components/UI/molecules/PopupHeader";
import FormControl from "@mui/material/FormControl";
import DatePicker from "Components/UI/molecules/DatePicker";
import Checkbox from "Components/UI/atoms/Checkbox";
import {
  TFile,
  UploadType,
} from "Components/UI/molecules/FileUpload/FileUpload";
import { TConfigurations } from "API/Types/configurations";
import { ConfigurationsContext } from "Contexts/Configurations/ConfigurationsContext";
import { CircularProgress } from "@mui/material";
import FileCacheUpload from "Components/UI/molecules/FileUpload/FileCacheUpload";
import {
  addCertificateCache,
  deleteCertificateCache,
  updateCertificateCache,
} from "API/Calls/candidateCertificate";
import ActionMode from "../helpers/modeEnum";
import { defaultValues, InputNames } from "./useEducationExperienceForm";

interface IProps {
  isModalOpen: boolean;
  form: UseFormReturn<TCandidateEducationForm, any>;
  education: TCandidateEducationResponse | undefined;
  educationIndex?: number;
  actionMode: ActionMode;
  onSubmit: (data: TAddCandidateEducationRequest, index?: number) => void;
  onSave: (data: TUpdateCandidateEducationRequest, index: number) => void;
  onClose: () => void;
}

const EducationExperienceForm = ({
  isModalOpen,
  form,
  education,
  educationIndex,
  actionMode,
  onSubmit,
  onSave,
  onClose,
}: IProps) => {
  const [isStillStudying, setIsStillStudying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCertificateLoading, setIsCertificateLoading] = useState(false);

  const { documentSettings } = useContext<TConfigurations>(
    ConfigurationsContext
  );

  useEffect(() => {
    if (education) {
      form.reset({ ...education, certificate: { hasChanged: false } });
      setIsStillStudying(education.isStillStudying);
    }
  }, [education, form]);

  const isValid = () => {
    if (!form.getValues().to && !form.getValues().isStillStudying) {
      return false;
    }
    return form.formState.isValid;
  };

  form.watch(InputNames.to);

  const handleCurrentlyWorkingChange = (check: boolean) => {
    if (check) {
      form.setValue("to", undefined);
      form.clearErrors(InputNames.to);
    }
    form.setValue("isStillStudying", check);
    setIsStillStudying(check);
  };

  const handleCertificateUpload = (cacheId?: string) => {
    form.setValue("certificate", { cacheId, hasChanged: true });
  };

  const handleClose = () => {
    form.reset(defaultValues);
    setIsStillStudying(false);
    onClose();
  };

  const handleSubmit = async () => {
    const result = form.getValues();
    if (isStillStudying) {
      form.setValue("to", undefined);
      form.clearErrors(InputNames.to);
    }

    await form.trigger();
    if (!isValid()) return;
    setIsSubmitting(true);

    try {
      if (actionMode === ActionMode.Add) {
        await onSubmit(result, educationIndex);
      } else if (
        actionMode === ActionMode.Edit &&
        educationIndex !== undefined
      ) {
        await onSave(result, educationIndex);
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
            actionMode === ActionMode.Add
              ? "Add a new education"
              : "Save education"
          }
          onClose={handleClose}
        />
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="pb-8 grid grid-cols-2 gap-4 py-8 px-4 w-[392px]">
          <div className="col-span-2">
            <Controller
              name={InputNames.schoolName}
              control={form.control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="School"
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
              control={form.control}
              name={InputNames.degree}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Degree"
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
              name={InputNames.fieldOfStudy}
              control={form.control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Field of study"
                  value={value}
                  onChange={onChange}
                  required
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={form.control}
              name={InputNames.from}
              render={({ field, fieldState: { error } }) => (
                <FormControl>
                  <DatePicker
                    label="From"
                    {...field}
                    required
                    error={!!error}
                    helperText={error?.message}
                  />
                </FormControl>
              )}
            />
          </div>
          <div>
            <Controller
              control={form.control}
              name={InputNames.to}
              render={({ field, fieldState: { error } }) => (
                <FormControl>
                  <DatePicker
                    label={
                      form.getValues().isStillStudying ? "Still studying" : "To"
                    }
                    {...field}
                    error={!!error}
                    helperText={
                      error
                        ? "To date or is still studying is required"
                        : undefined
                    }
                    disabled={form.getValues().isStillStudying}
                  />
                </FormControl>
              )}
            />
          </div>
          <div className="col-start-2 text-right">
            <Checkbox
              className="p-0 m-0"
              label="Still studying"
              value={InputNames.isStillStudying}
              onChange={() =>
                handleCurrentlyWorkingChange(!form.getValues().isStillStudying)
              }
              checked={isStillStudying}
            />
          </div>
          <div className="col-span-2">
            <Controller
              name={InputNames.studiesDescription}
              control={form.control}
              render={({ field: { onChange } }) => (
                <TextField
                  multiline
                  label="Studies description"
                  minRows={3}
                  inputProps={{
                    maxLength: 150,
                  }}
                  value={form.getValues(InputNames.studiesDescription)}
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
                  selectedFile={education?.certificate as TFile | undefined}
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
                        ? "Add education"
                        : "Save education"
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
export default EducationExperienceForm;
