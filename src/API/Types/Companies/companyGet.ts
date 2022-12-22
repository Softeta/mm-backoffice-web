import CompanyStatus from "Enums/companyStatus";
import { TCompanyContactPerson } from "./common/companyContactPerson";
import { TCompanyBrief } from "./companyBriefGet";

export type TCompanyResponse = {
  data: TCompany;
};

export type TCompany = TCompanyBrief & {
  status: CompanyStatus;
  websiteUrl?: string;
  linkedInUrl?: string;
  glassdoorUrl?: string;
  contactPersons?: TCompanyContactPerson[];
};
