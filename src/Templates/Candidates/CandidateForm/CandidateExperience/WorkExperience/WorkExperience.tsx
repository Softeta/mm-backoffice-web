import { useJobPositions } from "API/Calls/jobPositions";
import { TCandidateWorkExperience } from "API/Types/Candidate/Common/candidateWorkExperience";
import ColorType from "Components/Enums/colorType";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import AddIcon from "Assets/Icons/add.svg";
import NumberSelect from "Components/UI/molecules/NumberSelect";
import ActionMode from "../helpers/modeEnum";
import { InputNames } from "../../InputNames";
import { useWorkExperienceForm } from "./useWorkExperienceForm";
import WorkExperienceRecord from "./WorkExperienceRecord";
import EmptyExperience from "../helpers/EmptyExperience";
import WorkExperienceForm from "./WorkExperienceForm";
import {
  ExperienceCategories,
  ExperienceInputNames,
} from "../CourseExperience/enums";

interface IWorkExperience {
  isNewCandidate: boolean;
  onDeleteWork: (index: number) => void;
  onAddWork: (data: TCandidateWorkExperience, index?: number) => void;
  onEditWork: (data: TCandidateWorkExperience, index: number) => void;
  onYearExperienceChange: (experience?: number) => void;
}

const WorkExperience = ({
  isNewCandidate,
  onDeleteWork,
  onAddWork,
  onEditWork,
  onYearExperienceChange,
}: IWorkExperience) => {
  const form = useFormContext();
  const workExperienceForm = useWorkExperienceForm();
  const positionsQuery = useJobPositions();

  const [showWorkExperience, setShowWorkExperience] = useState(false);

  const [workExperience, setWorkExperience] = useState<
    [TCandidateWorkExperience?, number?]
  >([undefined, undefined]);

  const [workExperienceActionMode, setWorkExperienceActionMode] =
    useState<ActionMode>(ActionMode.Add);

  const candidateWorkExperiences =
    form.watch(ExperienceInputNames.workExperiences) ?? [];
  const candidateCurrentPosition = form.watch(InputNames.currentPosition);

  const handleWorkExperienceEditClick = (
    data: TCandidateWorkExperience,
    index: number
  ) => {
    setWorkExperience([data, index]);
    if (isNewCandidate) {
      setWorkExperienceActionMode(ActionMode.Edit);
    } else {
      const actionMode = data?.id ? ActionMode.Edit : ActionMode.Add;
      setWorkExperienceActionMode(actionMode);
    }
    setShowWorkExperience(true);
  };

  const handleWorkExperienceClose = () => {
    setWorkExperienceActionMode(ActionMode.Add);
    setWorkExperience([undefined, undefined]);
    setShowWorkExperience(false);
  };

  return (
    <>
      <div className="flex">
        <h4 className="font-semibold pb-4">Work</h4>
        <div className="ml-auto">
          {candidateWorkExperiences.length > 0 && (
            <Button
              className="min-w-0 h-min p-0 text-xs"
              variant={ButtonVariantType.Text}
              color={ColorType.Info}
              onClick={() => {
                setShowWorkExperience(true);
              }}
              label="Add a new work"
              startIcon={
                <img className="relative left-1" src={AddIcon} alt="" />
              }
            />
          )}
        </div>
      </div>
      {candidateWorkExperiences.length > 0 &&
        candidateWorkExperiences.map(
          (x: TCandidateWorkExperience, index: number) => (
            <WorkExperienceRecord
              key={x.id}
              workExperience={x}
              onDelete={() => onDeleteWork(index)}
              onEdit={(data) => handleWorkExperienceEditClick(data, index)}
            />
          )
        )}
      {candidateWorkExperiences.length === 0 && (
        <EmptyExperience
          category={ExperienceCategories.Work}
          buttonLabel="Add work"
          onClick={() => setShowWorkExperience(true)}
        />
      )}
      <WorkExperienceForm
        isModalOpen={showWorkExperience}
        form={workExperienceForm}
        positions={positionsQuery?.data?.data?.data ?? []}
        currentPosition={
          candidateWorkExperiences.length === 0
            ? candidateCurrentPosition
            : undefined
        }
        workExperience={workExperience[0]}
        workExperienceIndex={workExperience[1]}
        onSubmit={onAddWork}
        onSave={onEditWork}
        onClose={handleWorkExperienceClose}
        actionMode={workExperienceActionMode}
      />
      <h4 className="font-semibold pb-4">Years of experience</h4>
      <NumberSelect
        className="w-[154px]"
        label="Years"
        value={form.getValues().yearsOfExperience}
        onChange={onYearExperienceChange}
      />
    </>
  );
};

export default WorkExperience;
