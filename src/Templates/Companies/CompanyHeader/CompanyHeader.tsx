import Tag from "Components/UI/atoms/Tag";
import LinkedInIcon from "Assets/Icons/linkedin.svg";
import GlassdoorIcon from "Assets/Icons/glassdoor.svg";
import WebsiteIcon from "Assets/Icons/website.svg";

export interface ICompanyHeader {
  logoUri?: string;
  name?: string;
  registrationNumber?: string;
  industries?: string[];
  websiteUrl?: string;
  linkedInUrl?: string;
  glassdoorUrl?: string;
}

const buildUrl = (url?: string) => {
  if (!url) return url;

  return url?.includes("//") ? url : `//${url}`;
};

const CompanyHeader = ({
  logoUri,
  name,
  registrationNumber,
  industries = [],
  websiteUrl,
  linkedInUrl,
  glassdoorUrl,
}: ICompanyHeader) => (
  <div className="flex justify-between flex-auto">
    <div className="flex">
      {logoUri && <img className="max-h-9" src={logoUri} alt={name} />}
      <div className="flex flex-col mx-4 gap-1">
        <span className="text-xs font-semibold text-grey-dark">{name}</span>
        {registrationNumber && (
          <span className="text-xs font-semibold text-grey-middle">
            CVR: {registrationNumber}
          </span>
        )}
      </div>

      <div className="flex self-center ml-10">
        <div className="text-xs font-semibold text-grey-dark mr-2">
          Industries:
        </div>
        <div className="flex gap-1 items-start">
          {industries.map((industry) => (
            <Tag key={industry} text={industry} />
          ))}
        </div>
      </div>
    </div>

    <div className="flex mr-12">
      {glassdoorUrl && (
        <a
          className="self-center ml-5"
          href={buildUrl(glassdoorUrl)}
          target="_blank"
          rel="noreferrer"
        >
          <img className="h-8" src={GlassdoorIcon} alt="" />
        </a>
      )}
      {linkedInUrl && (
        <a
          className="self-center ml-5"
          href={buildUrl(linkedInUrl)}
          target="_blank"
          rel="noreferrer"
        >
          <img className="h-8" src={LinkedInIcon} alt="" />
        </a>
      )}
      {websiteUrl && (
        <a
          className="self-center ml-5"
          href={buildUrl(websiteUrl)}
          target="_blank"
          rel="noreferrer"
        >
          <img className="h-8" src={WebsiteIcon} alt="" />
        </a>
      )}
    </div>
  </div>
);

export default CompanyHeader;
