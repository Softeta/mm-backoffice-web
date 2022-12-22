import { TCandidateCourseResponse } from "API/Types/Candidate/Common/candidateCourse";
import ColorType from "Components/Enums/colorType";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import IconButton from "Components/UI/atoms/IconButton";
import CandidateExperienceRecord from "../helpers/CandidateExperienceRecord";

interface IProps {
  course: TCandidateCourseResponse;
  onEdit: (workExperience: TCandidateCourseResponse) => void;
  onDelete: () => void;
}

const CourseExperienceRecord = ({ course, onEdit, onDelete }: IProps) => (
  <CandidateExperienceRecord
    experience={course}
    onDelete={onDelete}
    onEdit={onEdit}
  >
    <div className="flex">
      {!course?.id && <span className="mr-2">New</span>}
      <div className="font-semibold pr-1">{course.name}</div>
    </div>
    <div className="pt-2 flex gap-2">
      {course.issuingOrganization}
      {course.certificate?.uri && (
        <a href={course.certificate.uri} target="_blank" rel="noreferrer">
          <IconButton
            variant={ButtonVariantType.Text}
            size="small"
            color={ColorType.Info}
            icon={<AttachFileIcon />}
          />
        </a>
      )}
    </div>
  </CandidateExperienceRecord>
);

export default CourseExperienceRecord;
