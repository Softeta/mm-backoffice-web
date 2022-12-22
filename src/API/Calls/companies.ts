import { backOfficeHttpClient } from "API/clients";
import { TCompaniesBriefResponse } from "API/Types/Companies/companyBriefGet";
import { TCompaniesSearchResponse } from "API/Types/Companies/companySearchGet";
import { TCompanyContactPersonResponse } from "API/Types/Companies/companyContactPersonGet";
import { TCompanyResponse } from "API/Types/Companies/companyGet";
import { useInfiniteQuery, useQuery } from "react-query";
import { TCompanyContactPersonUpdateRequest } from "API/Types/Companies/companyContactPersonUpdate";
import { TCompanyContactPersonCreateRequest } from "API/Types/Companies/companyContactPersonCreate";
import { TCompanyCreateRequest } from "API/Types/Companies/companyCreate";
import { TCompanyUpdateRequest } from "API/Types/Companies/companyUpdate";
import CompaniesInputNames from "API/Types/Companies/companiesFilterParameters";

export enum CompaniesQueryKeys {
  Companies = "companies",
  PagedCompanies = "paged-companies",
  CompaniesSearch = "companies-search",
  Company = "company",
}

export const fetchCompanies = async (
  search?: string,
  pageParam?: string
): Promise<TCompaniesBriefResponse> => {
  const searchQuery = search ? `?${search}` : "";
  return backOfficeHttpClient.get(
    pageParam || `/api/v1/companies${searchQuery}`
  );
};

export const fetchCompaniesSearch = async (
  search?: string
): Promise<TCompaniesSearchResponse> => {
  const searchQuery = search ? `?search=${search}` : "";
  return backOfficeHttpClient.get(`/api/v1/companies/search${searchQuery}`);
};

export const fetchCompany = async (
  companyId: string
): Promise<TCompanyResponse> =>
  backOfficeHttpClient.get(`/api/v1/companies/${companyId}`);

export const useCompanies = (search: string = "") =>
  useQuery(
    CompaniesQueryKeys.Companies,
    () => fetchCompanies(`search=${search}`),
    {
      enabled: false,
    }
  );

export const usePagedCompanies = (
  queryParams = new URLSearchParams(),
  enabled = true
) =>
  useInfiniteQuery<TCompaniesBriefResponse, string>(
    [
      CompaniesQueryKeys.PagedCompanies,
      queryParams.get(CompaniesInputNames.Statuses),
    ],
    ({ pageParam }) => fetchCompanies(queryParams.toString(), pageParam),
    {
      getNextPageParam: (last) => last.data.nextPagePath || undefined,
      enabled,
    }
  );

export const useCompaniesSearch = (search: string = "") =>
  useQuery(CompaniesQueryKeys.CompaniesSearch, () =>
    fetchCompaniesSearch(search)
  );

export const useCompany = (companyId?: string) =>
  useQuery<TCompanyResponse, string>(
    [CompaniesQueryKeys.Company, companyId],
    () => fetchCompany(companyId!),
    { enabled: !!companyId }
  );

export const updateCompany = async (
  id: string,
  payload: TCompanyUpdateRequest
): Promise<TCompanyResponse> =>
  backOfficeHttpClient.put(`/api/v1/companies/${id}`, payload);

export const createCompany = async (
  payload: TCompanyCreateRequest
): Promise<TCompanyResponse> =>
  backOfficeHttpClient.post(`/api/v1/companies`, payload);

export const createContactPerson = async (
  companyId: string,
  payload: TCompanyContactPersonCreateRequest
): Promise<TCompanyContactPersonResponse> =>
  backOfficeHttpClient.post(
    `/api/v1/companies/${companyId}/contact-persons`,
    payload
  );

export const updateContactPerson = async (
  companyId: string,
  contactId: string,
  payload: TCompanyContactPersonUpdateRequest
): Promise<TCompanyContactPersonResponse> =>
  backOfficeHttpClient.put(
    `/api/v1/companies/${companyId}/contact-persons/${contactId}`,
    payload
  );

export const rejectContactPerson = async (
  companyId: string,
  contactId: string
): Promise<void> =>
  backOfficeHttpClient.put(
    `/api/v1/companies/${companyId}/contact-persons/${contactId}/rejected`
  );
