import { TAddress } from "../address";
import { TJobCompanyContactPersonRequest } from "./Common/jobCompanyContactPersonRequest";
import { TJobCompanyResponse } from "./Common/jobCompanyResponse";

export type TJobCalibrateCompanyRequest = {
  id: string;
  address?: TAddress;
  description?: string;
  contactPersons: TJobCompanyContactPersonRequest[];
};

export type TJobCalibrateCompanyResponse = {
  data: {
    jobId: string;
    company: TJobCompanyResponse;
  };
};
