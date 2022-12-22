import DateFormats from "Enums/dateFormats";
import { format } from "date-fns";
import AvatarWithTypes from "Components/UI/molecules/AvatarWithTypes";
import { TPosition } from "API/Types/position";
import LinkedInIcon from "Assets/Icons/linkedin.svg";
import WebsiteIcon from "Assets/Icons/website.svg";

export interface ICandidateHeader {
  firstName: string;
  lastName: string;
  imageURL?: string;
  currentPosition?: TPosition;
  freelance: boolean;
  permanent: boolean;
  startDate?: Date;
  linkedInUrl?: string;
  personalWebsiteUrl?: string;
  className?: string;
}

const buildUrl = (url?: string) => {
  if (!url) return url;

  return url?.includes("//") ? url : `//${url}`;
};

const CandidateHeader = ({
  firstName,
  lastName,
  imageURL,
  currentPosition,
  freelance,
  permanent,
  startDate,
  linkedInUrl,
  personalWebsiteUrl,
  className = "",
}: ICandidateHeader) => {
  const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();
  return (
    <div className={`flex gap-4 ${className}`}>
      {(firstName || lastName) && (
        <>
          <AvatarWithTypes
            className="mr-4"
            imageURL={imageURL}
            title={fullName}
            leftTop={freelance ? "F" : undefined}
            rightTop={permanent ? "P" : undefined}
          />
          <div className="text-xs">
            <p className=" text-black font-medium mb-1">{fullName}</p>
            <p className="font-normal text-scorpion">{currentPosition?.code}</p>
          </div>
        </>
      )}

      {startDate && (
        <div className="text-xs">
          <p className=" text-black font-medium mb-1">Available from</p>
          <p className="text-scorpion">
            {format(new Date(startDate), DateFormats.Date)}
          </p>
        </div>
      )}
      {linkedInUrl && (
        <a href={buildUrl(linkedInUrl)} target="_blank" rel="noreferrer">
          <img className="h-8" src={LinkedInIcon} alt="" />
        </a>
      )}
      {personalWebsiteUrl && (
        <a href={buildUrl(personalWebsiteUrl)} target="_blank" rel="noreferrer">
          <img className="h-8" src={WebsiteIcon} alt="" />
        </a>
      )}
    </div>
  );
};

export default CandidateHeader;
