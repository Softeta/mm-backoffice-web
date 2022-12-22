import { TAddress } from "API/Types/address";
import { TJobCompanyContactPersonRequest } from "./jobCompanyContactPersonRequest";

export type TJobCompanyRequest = {
  id: string;
  address?: TAddress;
  description?: string;
  contactPersons: TJobCompanyContactPersonRequest[];
};
