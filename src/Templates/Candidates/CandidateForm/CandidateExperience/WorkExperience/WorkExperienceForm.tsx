import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import ColorType from "Components/Enums/colorType";
import { TCandidateWorkExperience } from "API/Types/Candidate/Common/candidateWorkExperience";
import { Controller, UseFormReturn } from "react-hook-form";
import TextField from "Components/UI/atoms/TextField";
import { TPosition } from "API/Types/position";
import PopupHeader from "Components/UI/molecules/PopupHeader";
import FormControl from "@mui/material/FormControl";
import DatePicker from "Components/UI/molecules/DatePicker";
import Checkbox from "Components/UI/atoms/Checkbox";
import { useEffect, useState } from "react";
import Modal from "Components/UI/atoms/Modal";
import SkillSelect from "Components/Select/SkillSelect";
import PositionSingleSelect from "Components/Select/PositionSelect/PositionSingleSelect";
import { TSkill } from "API/Types/skills";
import { CircularProgress } from "@mui/material";
import ActionMode from "../helpers/modeEnum";
import { defaultValues, InputNames } from "./useWorkExperienceForm";

interface IProps {
  isModalOpen: boolean;
  form: UseFormReturn<TCandidateWorkExperience, any>;
  positions: TPosition[];
  currentPosition: TPosition | undefined;
  workExperience: TCandidateWorkExperience | undefined;
  workExperienceIndex?: number;
  actionMode: ActionMode;
  onSubmit: (data: TCandidateWorkExperience, index?: number) => void;
  onSave: (data: TCandidateWorkExperience, index: number) => void;
  onClose: () => void;
}

const WorkExperienceForm = ({
  isModalOpen,
  form,
  currentPosition,
  workExperience,
  workExperienceIndex,
  actionMode,
  onSubmit,
  onSave,
  onClose,
}: IProps) => {
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (workExperience) {
      form.reset(workExperience);
      setIsCurrentlyWorking(workExperience.isCurrentJob);
    }
  }, [workExperience, form]);

  useEffect(() => {
    if (currentPosition) {
      form.setValue("position", currentPosition);
    }
  }, [form, currentPosition]);

  const isValid = () => {
    if (!form.getValues().to && !form.getValues().isCurrentJob) {
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
    form.setValue("isCurrentJob", check);
    setIsCurrentlyWorking(check);
  };

  const handlePositionChange = (position: TPosition | null) => {
    if (position) {
      form.setValue("position", position);
      form.clearErrors(InputNames.position);
    }
  };

  const handleSkillsChange = (skills: TSkill[]) => {
    form.setValue("skills", skills);
  };

  const handleClose = () => {
    form.reset(defaultValues);
    setIsCurrentlyWorking(false);
    if (currentPosition) {
      form.setValue("position", currentPosition);
    }
    onClose();
  };

  const handleFormSubmit = async () => {
    if (isCurrentlyWorking) {
      form.setValue("to", undefined);
      form.clearErrors(InputNames.to);
    }

    await form.trigger();
    if (!isValid()) return;
    const result = form.getValues();
    setIsSubmitting(true);

    try {
      if (actionMode === ActionMode.Add) {
        await onSubmit(result, workExperienceIndex);
      } else if (
        actionMode === ActionMode.Edit &&
        workExperienceIndex !== undefined
      ) {
        await onSave(result, workExperienceIndex);
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
          label={actionMode === ActionMode.Add ? "Add a new work" : "Save work"}
          onClose={handleClose}
        />
      }
    >
      <form onSubmit={handleFormSubmit}>
        <div className="pb-8 grid grid-cols-2 gap-4 py-8 px-4 w-[392px]">
          <div className="col-span-2">
            <Controller
              name={InputNames.companyName}
              control={form.control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Company"
                  value={value}
                  onChange={onChange}
                  required
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </div>
          <div className="col-span-2 ">
            <Controller
              control={form.control}
              name={InputNames.position}
              render={({
                field: { value, ...rest },
                fieldState: { error },
              }) => (
                <FormControl className="w-full">
                  <PositionSingleSelect
                    className="w-full"
                    {...rest}
                    selectedItem={value}
                    onItemSelect={handlePositionChange}
                    required
                    error={!!error}
                    helperText={error?.message}
                  />
                </FormControl>
              )}
            />
          </div>
          <div className="col-span-2">
            <Controller
              name={InputNames.skills}
              control={form.control}
              render={({ field }) => (
                <FormControl className="w-full">
                  <SkillSelect
                    {...field}
                    onSelectedChange={handleSkillsChange}
                    selected={form.getValues().skills || []}
                    jobPosition={form.getValues().position}
                  />
                </FormControl>
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
                    error={!!error}
                    helperText={error?.message}
                    required
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
                      form.getValues().isCurrentJob ? "Currently working" : "To"
                    }
                    {...field}
                    error={!!error}
                    helperText={
                      error
                        ? "To date or currently working is required"
                        : undefined
                    }
                    disabled={form.getValues().isCurrentJob}
                  />
                </FormControl>
              )}
            />
          </div>
          <div className="col-start-2 text-right">
            <Controller
              control={form.control}
              name={InputNames.isCurrentJob}
              render={() => (
                <Checkbox
                  className="p-0 m-0"
                  label="Currently working"
                  value={InputNames.isCurrentJob}
                  onChange={() =>
                    handleCurrentlyWorkingChange(!form.getValues().isCurrentJob)
                  }
                  checked={isCurrentlyWorking}
                />
              )}
            />
          </div>
          <div className="col-span-2">
            <Controller
              name={InputNames.jobDescription}
              control={form.control}
              render={({ field: { onChange } }) => (
                <TextField
                  multiline
                  label="Job description"
                  minRows={3}
                  inputProps={{
                    maxLength: 150,
                  }}
                  value={form.getValues(InputNames.jobDescription)}
                  onChange={onChange}
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
                      actionMode === ActionMode.Add ? "Add work" : "Save work"
                    }
                    className="mt-1"
                    onClick={handleFormSubmit}
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
export default WorkExperienceForm;
