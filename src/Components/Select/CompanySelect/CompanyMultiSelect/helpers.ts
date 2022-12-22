import { TCompanyBrief } from "API/Types/Companies/companyBriefGet";
import { TOption } from "Components/UI/molecules/Autocomplete/Autocomplete";

// eslint-disable-next-line import/prefer-default-export
export const companiesToOptions = (items: TCompanyBrief[]): TOption[] =>
  items.map((company) => ({
    id: company.id,
    label: company.name,
    data: { ...company },
  }));
