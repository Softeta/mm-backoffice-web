import {
  TAddCandidateCourseRequest,
  TCandidateCourseResponse,
  TUpdateCandidateCourseRequest,
} from "API/Types/Candidate/Common/candidateCourse";
import AddIcon from "Assets/Icons/add.svg";
import ColorType from "Components/Enums/colorType";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import EmptyExperience from "../helpers/EmptyExperience";
import ActionMode from "../helpers/modeEnum";
import CourseExperienceForm from "./CourseExperienceForm";
import CourseExperienceRecord from "./CourseExperienceRecord";
import { ExperienceCategories, ExperienceInputNames } from "./enums";
import { useCourseExperienceForm } from "./useCourseExperienceForm";

interface ICourseExperience {
  isNewCandidate: boolean;
  onDeleteCourse: (index: number) => void;
  onAddCourse: (data: TAddCandidateCourseRequest, index?: number) => void;
  onEditCourse: (data: TUpdateCandidateCourseRequest, index: number) => void;
}
const CourseExperience = ({
  isNewCandidate,
  onDeleteCourse,
  onAddCourse,
  onEditCourse,
}: ICourseExperience) => {
  const form = useFormContext();
  const courseExperienceForm = useCourseExperienceForm();
  const [showCourseExperience, setShowCourseExperience] = useState(false);

  const [course, setCourse] = useState<[TCandidateCourseResponse?, number?]>([
    undefined,
    undefined,
  ]);

  const [courseActionMode, setCourseActionMode] = useState<ActionMode>(
    ActionMode.Add
  );

  const candidateCourses = form.watch(ExperienceInputNames.courses) ?? [];

  const handleCourseEditClick = (
    data: TCandidateCourseResponse,
    index: number
  ) => {
    setCourse([data, index]);
    if (isNewCandidate) {
      setCourseActionMode(ActionMode.Edit);
    } else {
      const actionMode = data?.id ? ActionMode.Edit : ActionMode.Add;
      setCourseActionMode(actionMode);
    }
    setShowCourseExperience(true);
  };
  const handleCourseClose = () => {
    setCourseActionMode(ActionMode.Add);
    setCourse([undefined, undefined]);
    setShowCourseExperience(false);
  };
  return (
    <>
      <div className="flex pt-4">
        <h4 className="font-semibold pb-4">Courses</h4>
        <div className="ml-auto">
          {candidateCourses.length > 0 && (
            <Button
              className="min-w-0 h-min p-0 text-xs"
              variant={ButtonVariantType.Text}
              color={ColorType.Info}
              onClick={() => {
                setShowCourseExperience(true);
              }}
              label="Add a new course"
              startIcon={
                <img className="relative left-1" src={AddIcon} alt="" />
              }
            />
          )}
        </div>
      </div>
      {candidateCourses.length > 0 &&
        candidateCourses.map((x: TCandidateCourseResponse, index: number) => (
          <CourseExperienceRecord
            key={x.id}
            course={x}
            onEdit={(data) => handleCourseEditClick(data, index)}
            onDelete={() => onDeleteCourse(index)}
          />
        ))}
      {candidateCourses.length === 0 && (
        <EmptyExperience
          category={ExperienceCategories.Courses}
          buttonLabel="Add course"
          onClick={() => setShowCourseExperience(true)}
        />
      )}
      <CourseExperienceForm
        isModalOpen={showCourseExperience}
        form={courseExperienceForm}
        course={course[0]}
        courseIndex={course[1]}
        onSubmit={onAddCourse}
        onSave={onEditCourse}
        onClose={handleCourseClose}
        actionMode={courseActionMode}
      />
    </>
  );
};

export default CourseExperience;
