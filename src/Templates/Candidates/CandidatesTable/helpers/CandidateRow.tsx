import { format } from "date-fns";
import DateFormats from "Enums/dateFormats";
import { TCandidateBrief } from "API/Types/Candidate/candidatesBriefGet";
import AvatarWithTypes from "Components/UI/molecules/AvatarWithTypes";
import Divide from "Components/UI/atoms/Divide";
import LinkedInIcon from "Assets/Icons/linkedin.svg";
import LocationIcon from "Assets/Icons/location.svg";
import Tag from "Components/UI/atoms/Tag";
import TagColor from "Components/UI/atoms/Tag/TagColorVariant";
import { ReactNode } from "react";
import StatusNote from "Components/UI/molecules/StatusNote";

interface ICandidateRow {
  candidate: TCandidateBrief;
  index: number;
  button?: ReactNode;
  selected?: boolean;
  onRowClick?: (jobId: string) => void;
}
const CandidateRow = ({
  candidate,
  index,
  button,
  selected,
  onRowClick,
}: ICandidateRow) => (
  <tr
    key={candidate.id}
    onClick={() => (onRowClick ? onRowClick(candidate.id) : null)}
  >
    <td className="p-0 border-none h-auto">
      {index > 0 && <Divide />}
      <div className="flex justify-between gap-2 px-4">
        <div className="flex">
          <AvatarWithTypes
            className={`mr-3 self-center ${selected ? "opacity-50" : ""}`}
            imageURL={candidate.picture?.uri}
            title={candidate.fullName!}
            leftTop={candidate.freelance ? "F" : undefined}
            rightTop={candidate.permanent ? "P" : undefined}
          />
          <div
            className={`text-grey-dark ${selected ? "text-opacity-50" : ""}`}
          >
            <div className="flex text-sm mb-2">
              {candidate.isNewlyAdded && (
                <Tag
                  className="mr-5 font-semibold"
                  color={TagColor.Orange}
                  text="New"
                />
              )}

              <div className="font-semibold mr-5">{candidate.fullName}</div>

              {candidate.linkedInUrl && (
                <a
                  className="mr-5"
                  href={candidate.linkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={LinkedInIcon} alt="" />
                </a>
              )}

              {candidate.currentPosition && (
                <div className="mr-5">{candidate.currentPosition.code}</div>
              )}

              {candidate.address?.location && (
                <div className="mr-5">
                  <img
                    className="inline mr-1.5 align-top"
                    src={LocationIcon}
                    alt=""
                  />
                  {candidate.address.location}
                </div>
              )}

              {candidate.openForOpportunities && (
                <Tag
                  color={TagColor.Green}
                  className="mr-5"
                  text="Open for opportunities"
                />
              )}

              {candidate.isShortlisted && (
                <Tag
                  color={TagColor.Orange}
                  className="mr-5"
                  text="Shortlisted"
                />
              )}

              {candidate.isHired && (
                <Tag className={TagColor.Red} text="Hired" />
              )}
            </div>
            <div className="flex text-xs gap-2">
              {candidate.startDate && (
                <Tag
                  color={TagColor.NoColor}
                  text={`Available from ${format(
                    new Date(candidate.startDate),
                    DateFormats.Date
                  )}`}
                />
              )}

              {candidate.permanent?.monthlySalary && (
                <Tag
                  text={`Min salary ${candidate.permanent.monthlySalary} ${candidate.currency}/m`}
                />
              )}

              {candidate.freelance?.hourlySalary && (
                <Tag
                  color={TagColor.Red}
                  text={`Min fee ${candidate.freelance.hourlySalary} ${candidate.currency}/h`}
                />
              )}

              {candidate.freelance?.monthlySalary && (
                <Tag
                  color={TagColor.Red}
                  text={`Min fee ${candidate.freelance.monthlySalary} ${candidate.currency}/m`}
                />
              )}
            </div>
          </div>
        </div>
        {candidate.note && (
          <StatusNote className="ml-auto" note={candidate.note} readonly />
        )}
        {button && <div className="self-center">{button}</div>}
      </div>
    </td>
  </tr>
);

export default CandidateRow;
