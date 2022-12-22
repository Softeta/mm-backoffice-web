import { TAddress } from "../address";
import { TPagedResponse } from "../pagedResponse";
import { TCompanyContactPerson } from "./common/companyContactPerson";
import { TFileResponse } from "../fileResponse";

export type TCompaniesSearchResponse = {
  data: TPagedResponse<TCompanySearch>;
};

export type TCompanySearch = {
  id?: string;
  name: string;
  registrationNumber: string;
  address?: TAddress;
  logo?: TFileResponse;
  contactPersons?: TCompanyContactPerson[];
};
