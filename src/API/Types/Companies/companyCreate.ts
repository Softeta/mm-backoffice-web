import { TAddress } from "../address";
import { TFileAddRequest } from "../fileRequest";
import { TIndustry } from "../industries";
import { TPosition } from "../position";

export type TCompanyCreateRequest = {
  name: string;
  registrationNumber: string;
  websiteUrl?: string;
  linkedInUrl?: string;
  glassdoorUrl?: string;
  logo?: TFileAddRequest;
  address?: TAddress;
  person: TFirstPerson;
  industries?: TIndustry[];
};

type TFirstPerson = {
  firstName: string;
  lastName: string;
  position?: TPosition;
  email: string;
  phone?: {
    countryCode?: string;
    number?: string;
  };
  picture?: TFileAddRequest;
};

export type TCompanyCreateForm = TCompanyCreateRequest & {
  attachedLogoUrl?: string;
};
