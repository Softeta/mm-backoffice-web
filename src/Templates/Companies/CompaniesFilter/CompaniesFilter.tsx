import CompaniesInputNames, {
  TCompaniesFilterParams,
} from "API/Types/Companies/companiesFilterParameters";
import { TCompanyBrief } from "API/Types/Companies/companyBriefGet";
import { TIndustry } from "API/Types/industries";
import { TLocation } from "API/Types/location";
import AddressForSearchSelect from "Components/Select/AddressSelect/AddressForSearchSelect";
import { CompanyMultiSelect } from "Components/Select/CompanySelect";
import IndustrySelect from "Components/Select/IndustrySelect";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import TextField from "Components/UI/atoms/TextField";
import { ChangeEvent, useEffect, useState } from "react";
import { DefaultRadiusInKm } from "Utils/constants";

interface ICompaniesFilter {
  params: TCompaniesFilterParams;
  onApplyFilters: () => void;
  onClearFilter: () => void;
  setParams: (params: TCompaniesFilterParams) => void;
  clearParams: () => void;
}
const { Companies, Industries, Location, RadiusInKm } = CompaniesInputNames;

const CompaniesFilter = ({
  params,
  onApplyFilters,
  onClearFilter,
  setParams,
  clearParams,
}: ICompaniesFilter) => {
  const [resetValues, setResetValues] = useState<boolean>(false);
  const [selectedIndustries, setSelectedIndustries] = useState<TIndustry[]>(
    params.Industries ?? []
  );
  const [selectedCompanies, setSelectedCompanies] = useState<TCompanyBrief[]>(
    params.Companies ?? []
  );

  useEffect(() => {
    if (resetValues) {
      setResetValues(false);
    }
  }, [resetValues]);

  const clearFilter = () => {
    clearParams();
    setSelectedIndustries([]);
    setSelectedCompanies([]);
    setResetValues(true);
    onClearFilter();
  };

  const handleTextFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.value.trim()) {
      const state = { ...params, [event.target.name]: event.target.value };
      setParams(state);
    } else {
      const state = { ...params, [event.target.name]: undefined };
      setParams(state);
    }
  };

  const handleSelectedLocation = (location?: TLocation) => {
    const state = {
      ...params,
      [Location]: location
        ? {
            latitude: location?.latitude,
            longitude: location?.longitude,
            addressLine: location?.addressLine,
          }
        : undefined,
      [RadiusInKm]:
        location && !params.RadiusInKm ? DefaultRadiusInKm : params.RadiusInKm,
    };
    setParams(state);
  };

  const handleIndustrySelect = (industries: TIndustry[]) => {
    const state = {
      ...params,
      [Industries]: industries,
    };
    setParams(state);
    setSelectedIndustries(industries || []);
  };

  const handleCompanySelect = (companies?: TCompanyBrief[]) => {
    const state = {
      ...params,
      [Companies]: companies,
    };
    setParams(state);
    setSelectedCompanies(companies || []);
  };

  return (
    <div>
      <form className="flex flex-col">
        <p className="text-xs pb-3.5">Filter</p>
        <CompanyMultiSelect
          className="pb-3.5"
          label="Company"
          selectedItems={selectedCompanies}
          onItemsSelect={handleCompanySelect}
        />
        <IndustrySelect
          className="pb-3.5"
          selected={selectedIndustries}
          onSelectedChange={handleIndustrySelect}
        />
        <AddressForSearchSelect
          className="pb-3.5"
          onItemSelect={handleSelectedLocation}
          label="Location"
          selectedValue={params.Location?.addressLine}
        />
        {params.Location && (
          <TextField
            type="number"
            label="Radius in kilometers"
            className="pb-3.5"
            name={RadiusInKm}
            value={params.RadiusInKm ?? ""}
            onChange={(e) => handleTextFieldChange(e)}
          />
        )}
        <div className="pb-4 flex justify-between">
          <Button
            variant={ButtonVariantType.Text}
            onClick={clearFilter}
            label="Clear filter"
          />
          <Button
            variant={ButtonVariantType.Contained}
            onClick={onApplyFilters}
            label="Apply filter"
          />
        </div>
      </form>
    </div>
  );
};

export default CompaniesFilter;
