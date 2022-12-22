import { useEffect, useMemo, useState } from "react";
import { FormControl } from "@mui/material";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import { useCompaniesSearch } from "API/Calls/companies";
import { TCompanySearch } from "API/Types/Companies/companySearchGet";
import Autocomplete, {
  TOption,
} from "Components/UI/molecules/Autocomplete/Autocomplete";
import AvatarWithText from "Components/UI/molecules/AvatarWithText";
import TextField from "Components/UI/atoms/TextField";
import { TPagedResponse } from "API/Types/pagedResponse";
import useDebounce from "Hooks/useDebounce";
import { TAddress } from "API/Types/address";
import { fetchLocation } from "API/Calls/location";

interface IProps {
  selectedItem: TCompanySearch | null;
  onItemSelect: (company: TCompanySearch | null) => void;
  onBlur?: () => void;
  required?: boolean;
  showError?: boolean;
  errorMessage?: string;
  className?: string;
  label: string;
}

const CompanySearchSelect = ({
  className,
  label,
  selectedItem,
  required,
  showError = false,
  errorMessage,
  onItemSelect,
  onBlur,
}: IProps) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [companies, setCompanies] = useState<TPagedResponse<TCompanySearch>>();

  const { data, refetch } = useCompaniesSearch(searchInput);
  const debouncedSearchValue = useDebounce(searchInput);

  const buildAddress = (address?: TAddress) => {
    if (!address) return undefined;
    const elements = [address.addressLine, address.city, address.country];
    return elements.filter((x) => !!x).join(", ");
  };

  const handleItemSelect = async (item: TOption) => {
    if (!item) {
      onItemSelect(null);
      return;
    }

    if (!item?.code) return;

    const company = companies?.data.find(
      (c) => c.registrationNumber === item.code
    );

    if (!company) return;

    const address = await fetchLocation(buildAddress(company?.address));
    onItemSelect({
      ...company,
      address: {
        ...(company.address || {
          addressLine: "",
        }),
        postalCode: address.data.postalCode,
        city: address.data.city,
      },
    });
  };

  useEffect(() => {
    if (debouncedSearchValue.length > 1) {
      refetch();
    }
  }, [debouncedSearchValue, refetch]);

  useEffect(() => {
    if (data?.data.data) setCompanies(data?.data);
  }, [data?.data]);

  const value: TOption | null = useMemo(
    () =>
      selectedItem === null
        ? null
        : {
            id: selectedItem.id,
            code: selectedItem.registrationNumber,
            label: selectedItem.name,
          },
    [selectedItem]
  );

  const options: TOption[] = useMemo(
    () =>
      (companies?.data || []).map((company) => ({
        id: company.id,
        code: company.registrationNumber,
        label: company.name,
        labelNode: (
          <AvatarWithText
            key={company.id}
            size={AvatarSizeType.Small}
            title={
              company.address?.country
                ? `${company.name}, ${company.address?.country}`
                : company.name
            }
            imageURL={company.logo?.uri}
          />
        ),
      })),
    [companies]
  );

  const hasLogo: boolean = useMemo(
    () => !!(selectedItem?.name === searchInput && selectedItem?.logo?.uri),
    [selectedItem, searchInput]
  );

  return (
    <FormControl className={className ?? ""}>
      <Autocomplete
        value={value}
        onChange={(_, newValue) => handleItemSelect(newValue as TOption)}
        inputValue={searchInput}
        onInputChange={(_, newInputValue) => setSearchInput(newInputValue)}
        options={options}
        filterOptions={(ops) => ops}
        onBlur={onBlur}
        renderInput={(props) => (
          <TextField
            {...props}
            error={showError}
            required={required}
            helperText={showError ? errorMessage : ""}
            InputProps={{
              // eslint-disable-next-line react/prop-types
              ...props.InputProps,
              startAdornment: hasLogo ? (
                <img src={selectedItem?.logo?.uri} className="h-4" alt="" />
              ) : null,
            }}
            label={label}
          />
        )}
        freeSolo
      />
    </FormControl>
  );
};
export default CompanySearchSelect;
