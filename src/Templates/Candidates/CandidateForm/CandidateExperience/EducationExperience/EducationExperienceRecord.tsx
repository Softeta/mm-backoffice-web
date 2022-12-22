import { TCandidateEducationResponse } from "API/Types/Candidate/Common/candidateEducation";
import { format } from "date-fns";
import DateFormats from "Enums/dateFormats";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import IconButton from "Components/UI/atoms/IconButton";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import ColorType from "Components/Enums/colorType";
import CandidateExperienceRecord from "../helpers/CandidateExperienceRecord";

interface IProps {
  education: TCandidateEducationResponse;
  onEdit: (education: TCandidateEducationResponse) => void;
  onDelete: () => void;
}

const EducationExperienceRecord = ({ education, onEdit, onDelete }: IProps) => (
  <CandidateExperienceRecord
    experience={education}
    onDelete={onDelete}
    onEdit={onEdit}
  >
    <div className="flex">
      {!education?.id && <span className="mr-2">New</span>}
      <div className="font-semibold pr-1">{education.schoolName}</div>
    </div>
    <div className="pt-2">
      {format(new Date(education.from), DateFormats.Date)} -{" "}
      {education.to ? format(new Date(education.to), DateFormats.Date) : "now"}
    </div>
    <div className="pt-2 flex gap-1">
      {education.fieldOfStudy}
      {education.certificate?.uri && (
        <a href={education.certificate?.uri} target="_blank" rel="noreferrer">
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

export default EducationExperienceRecord;
