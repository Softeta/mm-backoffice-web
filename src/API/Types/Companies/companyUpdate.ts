import { TAddress } from "../address";
import { TFileUpdateRequest } from "../fileRequest";
import { TFileResponse } from "../fileResponse";
import { TIndustry } from "../industries";

export type TCompanyUpdateRequest = {
  websiteUrl?: string;
  linkedInUrl?: string;
  glassdoorUrl?: string;
  logo?: TFileUpdateRequest;
  address?: TAddress;
  industries?: TIndustry[];
};

export type TCompanyUpdateForm = TCompanyUpdateRequest & {
  attachedLogo?: TFileResponse;
};
