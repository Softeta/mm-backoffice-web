/* eslint-disable react/no-array-index-key */
import { format as formatDate } from "date-fns";
import DateFormats from "Enums/dateFormats";
import { useCandidate } from "API/Calls/candidates";
import AvatarWithTypes from "Components/UI/molecules/AvatarWithTypes";
import Tag from "Components/UI/atoms/Tag";
import { CircularProgress } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import routes from "Routes/routes";

type TCandidateProfile = {
  candidateId: string;
  onHover: (isHovered: boolean) => void;
};

const CandidateProfile = ({ candidateId, onHover }: TCandidateProfile) => {
  const candidate = useCandidate(candidateId);

  const handleClick = () => {
    window.open(`${routes.candidates.url}/${candidateId}`);
  };

  if (candidate.isError) return <p>Error</p>;
  if (candidate.isLoading) return <CircularProgress />;

  const data = candidate.data?.data;

  return (
    <div onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}>
      <div
        className="flex mb-4 cursor-pointer"
        onClick={handleClick}
        onKeyPress={handleClick}
        tabIndex={0}
        role="link"
      >
        <p className="mr-4">
          <AvatarWithTypes
            imageURL={data?.picture?.uri}
            title={data?.fullName ?? ""}
          />
        </p>
        <div className="text-sm">
          <p className=" text-black font-medium mb-1">{data?.fullName}</p>
          <p className="font-normal text-scorpion">
            {data?.currentPosition?.code}
          </p>
        </div>
      </div>
      <div className="border-y border-alto text-sm py-2 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <LinkedInIcon className="text-linkedin-blue" />
          <span>Linkedin profile</span>
        </div>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {!!data?.linkedInUrl && (
          <a href={data.linkedInUrl} target="_blank" rel="noreferrer">
            <OpenInNewIcon className="text-scorpion" />
          </a>
        )}
      </div>
      <p className="text-xs text-scorpion mb-2">Key skills:</p>
      <p className="flex gap-1 flex-wrap mb-4">
        {data?.skills.map((skill, i) => (
          <Tag text={skill.code} key={i} />
        ))}
      </p>
      <p className="text-xs text-scorpion mb-4">
        Years of experience:{" "}
        <span className="font-semibold text-black">
          {data?.yearsOfExperience}
        </span>
      </p>
      <p className="text-xs text-scorpion mb-4">
        Location:{" "}
        <span className="font-semibold text-black">
          {data?.address?.addressLine}
        </span>
      </p>
      <p className="text-xs text-scorpion mb-2">Format:</p>
      <p className="flex gap-1 flex-wrap mb-4">
        {data?.formats?.map((format) => (
          <Tag text={format} />
        ))}
      </p>
      <p className="text-xs text-scorpion mb-2">Industry experience:</p>
      <p className="flex gap-1 flex-wrap mb-4">
        {data?.industries.map((industry, i) => (
          <Tag text={industry.code} key={i} />
        ))}
      </p>
      <p className="text-xs text-scorpion mb-2">Type:</p>
      <p className="flex gap-1 flex-wrap mb-4">
        {data?.workTypes?.map((worktype) => (
          <Tag text={worktype} />
        ))}
      </p>
      {data?.freelance?.hourlySalary && (
        <p className="text-xs text-scorpion mb-2">
          Freelance min/h:{" "}
          <span className="font-semibold text-black">
            {data.freelance.hourlySalary} {data.currency}
          </span>
        </p>
      )}
      {data?.freelance?.monthlySalary && (
        <p className="text-xs text-scorpion mb-2">
          Freelance min/month:{" "}
          <span className="font-semibold text-black">
            {data.freelance.monthlySalary} {data.currency}
          </span>
        </p>
      )}
      {data?.permanent?.monthlySalary && (
        <p className="text-xs text-scorpion mb-2">
          Permanent min/month:{" "}
          <span className="font-semibold text-black">
            {data.permanent.monthlySalary} {data.currency}
          </span>
        </p>
      )}
      <p className="text-xs text-scorpion">
        Available from:{" "}
        <span className="font-semibold text-black">
          {data?.startDate
            ? formatDate(new Date(data.startDate), DateFormats.Date)
            : ""}
        </span>
      </p>
    </div>
  );
};

export default CandidateProfile;
