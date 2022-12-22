import { TAddress } from "../address";
import { TIndustry } from "../industries";
import { TPagedResponse } from "../pagedResponse";
import { TFileResponse } from "../fileResponse";

export type TCompaniesBriefResponse = {
  data: TPagedResponse<TCompanyBrief>;
};

export type TCompanyBrief = {
  id: string;
  name: string;
  registrationNumber: string;
  address?: TAddress;
  logo?: TFileResponse;
  industries?: TIndustry[];
  createdAt: Date;
};
