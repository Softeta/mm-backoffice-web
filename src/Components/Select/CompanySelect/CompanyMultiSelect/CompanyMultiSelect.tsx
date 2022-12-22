import { useEffect, useMemo, useState } from "react";
import { FormControl } from "@mui/material";
import { TCompanyBrief } from "API/Types/Companies/companyBriefGet";
import { useCompanies } from "API/Calls/companies";
import useDebounce from "Hooks/useDebounce";
import Autocomplete, {
  TOption,
} from "Components/UI/molecules/Autocomplete/Autocomplete";
import AvatarWithText from "Components/UI/molecules/AvatarWithText";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import { companiesToOptions } from "./helpers";

interface IProps {
  selectedItems?: TCompanyBrief[];
  onItemsSelect: (company?: TCompanyBrief[]) => void;
  className?: string;
  label?: string;
}

const CompanyMultiSelect = ({
  className,
  label = "Company",
  selectedItems,
  onItemsSelect,
}: IProps) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [companies, setCompanies] = useState<TCompanyBrief[]>([]);

  const { data, refetch } = useCompanies(searchInput);
  const debouncedSearchValue = useDebounce(searchInput);

  const value: TOption[] | undefined = useMemo(
    () => companiesToOptions(selectedItems || []),
    [selectedItems]
  );

  const options: TOption[] | null = useMemo(
    () =>
      companies.map((company) => ({
        id: company.id,
        code: company.registrationNumber,
        label: company.name,
        labelNode: (
          <AvatarWithText
            size={AvatarSizeType.Small}
            title={company.name}
            imageURL={company.logo?.uri}
          />
        ),
        data: { ...company },
      })),
    [companies]
  );

  const handleItemSelect = (selectedOptions?: TOption[]) => {
    onItemsSelect(selectedOptions?.map((x) => x.data));
  };

  useEffect(() => {
    if (debouncedSearchValue.length > 1) {
      refetch();
    }
  }, [debouncedSearchValue, refetch]);

  useEffect(() => {
    if (data?.data.data) setCompanies(data?.data.data);
  }, [data?.data]);

  return (
    <FormControl className={className ?? ""}>
      <Autocomplete
        multiple
        limitTags={1}
        value={value}
        label={label}
        onChange={(_, newValue) =>
          handleItemSelect(newValue as TOption[] | undefined)
        }
        inputValue={searchInput}
        onInputChange={(_, newInputValue) => setSearchInput(newInputValue)}
        options={options}
        filterOptions={(ops) => ops}
      />
    </FormControl>
  );
};
export default CompanyMultiSelect;
