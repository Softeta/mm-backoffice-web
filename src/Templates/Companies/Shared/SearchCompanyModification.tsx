import Button from "Components/UI/atoms/Button";
import CompanySearchSelect from "Components/Select/CompanySelect/CompanySearchSelect";
import { useState, useEffect } from "react";
import CloseIcon from "Assets/Icons/close.svg";
import ColorType from "Components/Enums/colorType";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import { TCompanySearch } from "API/Types/Companies/companySearchGet";
import TextField from "Components/UI/atoms/TextField";
import Avatar from "Components/UI/atoms/Avatar";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import { Guid } from "Utils/constants";
import AddressSingleSelect from "Components/Select/AddressSelect/AddressSingleSelect";
import { TAddress } from "API/Types/address";

interface IProps {
  onCompanyInfoChanged: (company: TCompanySearch | null) => void;
  showCompanyCreationText?: boolean;
}

const SearchCompanyModification = ({
  onCompanyInfoChanged,
  showCompanyCreationText,
}: IProps) => {
  const [selectedCompany, setSelectedCompany] = useState<TCompanySearch | null>(
    null
  );

  const [isSelectCompanyDirty, setIsSelectCompanyDirty] =
    useState<boolean>(false);
  const [isCompanyCreate, setIsCompanyCreate] = useState<boolean>(false);

  useEffect(() => {
    onCompanyInfoChanged(selectedCompany);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  const handleCompanySelect = (company: TCompanySearch | null) => {
    setSelectedCompany(company);

    if (!company || (company?.id && company.id !== Guid.Empty)) {
      setIsCompanyCreate(false);
    } else {
      setIsCompanyCreate(true);
    }
  };

  const handleClearSelection = () => {
    setIsCompanyCreate(false);
    setSelectedCompany(null);
  };

  const handleAddressSelect = (address?: TAddress) => {
    if (selectedCompany) {
      setSelectedCompany({
        ...selectedCompany,
        address,
      });
    }
  };

  const handleChange = (
    e: any,
    propName: "addressLine" | "city" | "postalCode"
  ) => {
    const value = e.target.value as string;
    setSelectedCompany((prevState) => ({
      ...prevState,
      name: prevState!.name,
      registrationNumber: prevState!.registrationNumber,
      address: {
        ...prevState?.address,
        [propName]: value,
      },
    }));
  };

  return (
    <div className="flex flex-col justify-between">
      {!selectedCompany && (
        <CompanySearchSelect
          className="mb-4"
          selectedItem={selectedCompany}
          label="Company name or reg. no."
          onItemSelect={handleCompanySelect}
          showError={isSelectCompanyDirty && !selectedCompany}
          errorMessage="Select a company from the list of companies"
          onBlur={() => setIsSelectCompanyDirty(true)}
          required
        />
      )}
      {!!selectedCompany && (
        <div className="grid gap-4">
          <div className="flex justify-between py-2">
            <div className="flex items-center">
              {selectedCompany?.logo?.uri && (
                <Avatar
                  className="mr-2"
                  imageURL={selectedCompany?.logo?.uri}
                  title={selectedCompany?.name}
                  size={AvatarSizeType.Small}
                />
              )}
              <span className="text-xs font-semibold text-grey-dark">
                {selectedCompany?.name}
              </span>
            </div>
            <div>
              <span className="text-xs font-semibold text-grey-dark">
                CVR: {selectedCompany?.registrationNumber}
              </span>
              <Button
                className="min-w-0"
                variant={ButtonVariantType.Text}
                endIcon={<img src={CloseIcon} alt="" />}
                color={ColorType.Info}
                onClick={handleClearSelection}
              />
            </div>
          </div>

          {isCompanyCreate && (
            <>
              {showCompanyCreationText && (
                <p className="p-4 bg-blue-secondary rounded text-xs mb-6">
                  This company is not in our database. We’ll create a new
                  company for you
                </p>
              )}

              <div className="grid grid-cols-1">
                <AddressSingleSelect
                  onItemSelect={handleAddressSelect}
                  label="Address"
                  required
                  selectedValue={selectedCompany?.address?.addressLine}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <TextField
                  required
                  label="Postal code"
                  InputLabelProps={{ shrink: true }}
                  value={selectedCompany?.address?.postalCode ?? ""}
                  onChange={(e) => handleChange(e, "postalCode")}
                />

                <TextField
                  label="City"
                  InputLabelProps={{ shrink: true }}
                  value={selectedCompany?.address?.city ?? ""}
                  onChange={(e) => handleChange(e, "city")}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default SearchCompanyModification;
