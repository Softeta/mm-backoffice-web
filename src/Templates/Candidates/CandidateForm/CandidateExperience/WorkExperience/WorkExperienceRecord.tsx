import { TCandidateWorkExperience } from "API/Types/Candidate/Common/candidateWorkExperience";
import Tag from "Components/UI/atoms/Tag";
import { format } from "date-fns";
import DateFormats from "Enums/dateFormats";
import CandidateExperienceRecord from "../helpers/CandidateExperienceRecord";

interface IProps {
  workExperience: TCandidateWorkExperience;
  onEdit: (workExperience: TCandidateWorkExperience) => void;
  onDelete: () => void;
}

const WorkExperienceRecord = ({ workExperience, onEdit, onDelete }: IProps) => (
  <CandidateExperienceRecord
    experience={workExperience}
    onDelete={onDelete}
    onEdit={onEdit}
  >
    <div className="flex">
      {!workExperience?.id && <span className="mr-2">New</span>}
      <div className="font-semibold pr-1">{workExperience.companyName}</div>
      <div className="text-grey-middle">- {workExperience.position?.code}</div>
    </div>
    <div className="mt-2">
      {format(new Date(workExperience.from), DateFormats.Date)} -{" "}
      {workExperience.to
        ? format(new Date(workExperience.to), DateFormats.Date)
        : "now"}
    </div>
    {workExperience.skills && (
      <div className="mt-2 flex flex-wrap gap-2">
        {workExperience.skills.map((x) => (
          <Tag key={x.id} text={x.code} nowrap />
        ))}
      </div>
    )}
  </CandidateExperienceRecord>
);

export default WorkExperienceRecord;
