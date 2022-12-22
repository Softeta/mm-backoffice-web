import {
  TAddCandidateEducationRequest,
  TCandidateEducationResponse,
  TUpdateCandidateEducationRequest,
} from "API/Types/Candidate/Common/candidateEducation";
import ColorType from "Components/Enums/colorType";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import AddIcon from "Assets/Icons/add.svg";
import ActionMode from "../helpers/modeEnum";
import { useEducationExperienceForm } from "./useEducationExperienceForm";
import EducationExperienceRecord from "./EducationExperienceRecord";
import EmptyExperience from "../helpers/EmptyExperience";
import EducationExperienceForm from "./EducationExperienceForm";
import {
  ExperienceCategories,
  ExperienceInputNames,
} from "../CourseExperience/enums";

interface IEducationExperience {
  isNewCandidate: boolean;
  onDeleteEducation: (index: number) => void;
  onAddEducation: (data: TAddCandidateEducationRequest, index?: number) => void;
  onEditEducation: (
    data: TUpdateCandidateEducationRequest,
    index: number
  ) => void;
}

const EducationExperience = ({
  isNewCandidate,
  onDeleteEducation,
  onAddEducation,
  onEditEducation,
}: IEducationExperience) => {
  const form = useFormContext();
  const educationExperienceForm = useEducationExperienceForm();

  const [showEducationExperience, setShowEducationExperience] = useState(false);

  const [education, setEducation] = useState<
    [TCandidateEducationResponse?, number?]
  >([undefined, undefined]);

  const [educationActionMode, setEducationActionMode] = useState<ActionMode>(
    ActionMode.Add
  );

  const candidateEducations = form.watch(ExperienceInputNames.educations) ?? [];

  const handleEducationEditClick = (
    data: TCandidateEducationResponse,
    index: number
  ) => {
    setEducation([data, index]);
    if (isNewCandidate) {
      setEducationActionMode(ActionMode.Edit);
    } else {
      const actionMode = data?.id ? ActionMode.Edit : ActionMode.Add;
      setEducationActionMode(actionMode);
    }
    setShowEducationExperience(true);
  };
  const handleEducationClose = () => {
    setEducationActionMode(ActionMode.Add);
    setEducation([undefined, undefined]);
    setShowEducationExperience(false);
  };

  return (
    <>
      <div className="flex">
        <h4 className="font-semibold pb-4">Education</h4>
        <div className="ml-auto">
          {candidateEducations.length > 0 && (
            <Button
              className="min-w-0 h-min p-0 text-xs"
              variant={ButtonVariantType.Text}
              color={ColorType.Info}
              onClick={() => {
                setShowEducationExperience(true);
              }}
              label="Add a new education"
              startIcon={
                <img className="relative left-1" src={AddIcon} alt="" />
              }
            />
          )}
        </div>
      </div>
      {candidateEducations.length > 0 &&
        candidateEducations.map(
          (x: TCandidateEducationResponse, index: number) => (
            <EducationExperienceRecord
              key={x.id}
              education={x}
              onEdit={(data) => handleEducationEditClick(data, index)}
              onDelete={() => onDeleteEducation(index)}
            />
          )
        )}
      {candidateEducations.length === 0 && (
        <EmptyExperience
          category={ExperienceCategories.Education}
          buttonLabel="Add education"
          onClick={() => setShowEducationExperience(true)}
        />
      )}
      <EducationExperienceForm
        isModalOpen={showEducationExperience}
        form={educationExperienceForm}
        education={education[0]}
        educationIndex={education[1]}
        onSubmit={onAddEducation}
        onSave={onEditEducation}
        onClose={handleEducationClose}
        actionMode={educationActionMode}
      />
    </>
  );
};

export default EducationExperience;
