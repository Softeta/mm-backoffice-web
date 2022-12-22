import { backOfficeHttpClient } from "API/clients";
import CompanyStatus from "Enums/companyStatus";
import { usePagedCompanies } from "./companies";

export const usePendingCompanies = () =>
  usePagedCompanies(new URLSearchParams({ statuses: CompanyStatus.Pending }));

export const approveCompany = async (companyId: string) =>
  backOfficeHttpClient.put(`/api/v1/companies/${companyId}/approved`);

export const rejectCompany = async (companyId: string) =>
  backOfficeHttpClient.put(`/api/v1/companies/${companyId}/rejected`);
