import { format } from "date-fns";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import AvatarWithText from "Components/UI/molecules/AvatarWithText";
import DateFormats from "Enums/dateFormats";
import translates from "locales/translates/translates";
import { TFunction } from "i18next";
import ArticleIcon from "@mui/icons-material/Article";
import getWorkTypes from "Helpers/getWorkTypes";
import IconButton from "Components/UI/atoms/IconButton";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import ColorType from "Components/Enums/colorType";
import { MouseEvent, KeyboardEvent } from "react";
import JobColumns from "./JobColumns";
import { TTableJob } from "./TableJobType";

interface IJobRow {
  job: TTableJob;
  cols: JobColumns[];
  selected?: boolean;
  onRowClick?: (jobId: string) => void;
  onCoverLetterClick?: (content?: string) => void;
  onAssigneeClick?: (
    event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
  ) => void;
  t?: TFunction | undefined;
}

const JobRow = ({
  job,
  cols,
  selected,
  onRowClick,
  onCoverLetterClick,
  onAssigneeClick,
  t,
}: IJobRow) => {
  const bgClass = job.isPriority ? "bg-buttery-white" : "";

  const bgClassHover = job.isPriority
    ? "hover:bg-white-rock"
    : "hover:bg-light-hover";

  const bgClassSelected = job.isPriority ? "bg-white-rock" : "bg-light-hover";

  const handleCoverLetterClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onCoverLetterClick?.(job.coverLetter);
  };

  return (
    <tr
      key={job.jobId}
      onClick={() => (onRowClick ? onRowClick(job.jobId) : null)}
    >
      {cols.includes(JobColumns.Company) && (
        <td className={selected ? bgClassSelected : bgClass}>
          <div className="flex items-center text-sm relative">
            {job.isPriority && (
              <div className="w-1 h-16 rounded -left-4 absolute bg-selective-yellow" />
            )}
            <div className="w-12 mr-2 shrink-0">
              {job.companyLogoUri && (
                <img src={job.companyLogoUri} alt={job.companyName} />
              )}
            </div>
            <span>{job.companyName}</span>
          </div>
        </td>
      )}
      {cols.includes(JobColumns.Position) && (
        <td className={selected ? bgClassSelected : bgClass}>{job.position}</td>
      )}
      {cols.includes(JobColumns.AssignedTo) && !onAssigneeClick && (
        <td className={bgClass}>
          {job?.assignedTo?.map((p) => (
            <AvatarWithText
              key={p.id}
              title={`${p.firstName} ${p.lastName}`}
              imageURL={p.pictureUri}
              size={AvatarSizeType.Small}
            />
          )) ?? ""}
        </td>
      )}
      {cols.includes(JobColumns.AssignedTo) && onAssigneeClick && (
        <td
          className={`${selected ? bgClassSelected : bgClass} ${bgClassHover}`}
        >
          <div
            className="w-full h-full flex flex-col justify-center"
            onClick={onAssigneeClick}
            onKeyPress={onAssigneeClick}
            tabIndex={0}
            role="button"
          >
            {job?.assignedTo?.map((p) => (
              <AvatarWithText
                key={p.id}
                title={`${p.firstName} ${p.lastName}`}
                imageURL={p.pictureUri}
                size={AvatarSizeType.Small}
              />
            )) ?? ""}
          </div>
        </td>
      )}
      {cols.includes(JobColumns.Type) && (
        <td className={selected ? bgClassSelected : bgClass}>
          {getWorkTypes(job.freelance, job.permanent).map((workType) => (
            <div key={workType}>
              {t
                ? t(`${translates.Classificator.WorkType}.${workType}`)
                : workType}
            </div>
          ))}
        </td>
      )}
      {cols.includes(JobColumns.JobStage) && (
        <td className={selected ? bgClassSelected : bgClass}>
          {t
            ? t(`${translates.Classificator.JobStage}.${job.jobStage}`)
            : job.jobStage}
        </td>
      )}
      {cols.includes(JobColumns.Deadline) && (
        <td className={selected ? bgClassSelected : bgClass}>
          {job.deadlineDate &&
            format(new Date(job.deadlineDate), DateFormats.Date)}
        </td>
      )}
      {cols.includes(JobColumns.CandidateStage) && (
        <td className={selected ? bgClassSelected : bgClass}>
          {t
            ? t(
                `${translates.Classificator.CandidateStage}.${job.candidateStage}`
              )
            : job.candidateStage}
        </td>
      )}
      {cols.includes(JobColumns.StartDate) && (
        <td className={selected ? bgClassSelected : bgClass}>
          {job.startDate && format(new Date(job.startDate), DateFormats.Date)}
        </td>
      )}
      {cols.includes(JobColumns.CoverLetter) && (
        <td className={selected ? bgClassSelected : bgClass}>
          {job.coverLetter && (
            <IconButton
              variant={ButtonVariantType.Text}
              color={ColorType.Info}
              onClick={handleCoverLetterClick}
              icon={<ArticleIcon color="action" fontSize="small" />}
            />
          )}
        </td>
      )}
    </tr>
  );
};

export default JobRow;
