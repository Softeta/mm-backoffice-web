import DateFormats from "Enums/dateFormats";
import { format } from "date-fns";
import AvatarWithText from "Components/UI/molecules/AvatarWithText";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import Avatar from "Components/UI/atoms/Avatar";
import Tag from "Components/UI/atoms/Tag";
import { TJobEmployee } from "API/Types/Jobs/Common/jobEmployee";
import { useTranslation } from "react-i18next";
import Translates from "locales/translates/translates";

export interface IJobHeader {
  companyLogo?: string;
  companyName?: string;
  position?: string;
  deadLineDate?: Date;
  workTypes?: string[];
  stage?: string;
  owner?: TJobEmployee;
  assignedEmployees?: TJobEmployee[];
}

const getFullName = (firstName: string, lastName: string) =>
  `${firstName ?? ""} ${lastName ?? ""}`.trim();

const JobHeader = ({
  companyLogo,
  companyName,
  position,
  deadLineDate,
  workTypes = [],
  stage,
  owner,
  assignedEmployees = [],
}: IJobHeader) => {
  const { t } = useTranslation();

  return (
    <>
      {companyLogo && (
        <img className="max-h-9" src={companyLogo} alt={companyName} />
      )}
      <div className="flex flex-col mx-4 gap-1">
        <span className="text-xs font-semibold text-grey-dark">
          {companyName}
        </span>
        <span className="text-xs font-semibold text-grey-middle">
          {position}
        </span>
      </div>

      <table className="styled-table compact ml-auto max-w-[65%]">
        <thead>
          <tr className="text-grey-middle">
            <th>Deadline</th>
            <th>Work type</th>
            <th>Job stage</th>
            <th>Job owner</th>
            <th>Assigned to</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-grey-dark">
            <td>
              {deadLineDate && (
                <Tag
                  text={format(new Date(deadLineDate), DateFormats.Date)}
                  nowrap
                />
              )}
            </td>
            <td>
              <div className="flex flex-col gap-1 items-start">
                {workTypes.map((workType) => (
                  <Tag
                    key={workType}
                    text={t(`${Translates.Classificator.WorkType}.${workType}`)}
                  />
                ))}
              </div>
            </td>
            <td>
              {stage && (
                <Tag
                  text={t(`${Translates.Classificator.JobStage}.${stage}`)}
                />
              )}
            </td>
            <td>
              {owner && (
                <AvatarWithText
                  imageURL={owner.pictureUri}
                  size={AvatarSizeType.Medium}
                  title={getFullName(owner.firstName, owner.lastName)}
                />
              )}
            </td>
            <td>
              <div className="flex gap-2">
                {assignedEmployees.map((assignee) => (
                  <Avatar
                    key={assignee.id}
                    imageURL={assignee.pictureUri}
                    size={AvatarSizeType.Medium}
                    title={getFullName(assignee.firstName, assignee.lastName)}
                  />
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default JobHeader;
