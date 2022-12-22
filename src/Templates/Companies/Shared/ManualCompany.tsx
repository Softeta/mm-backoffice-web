import TextField from "Components/UI/atoms/TextField";
import { TAddress } from "API/Types/address";
import AddressSingleSelect from "Components/Select/AddressSelect/AddressSingleSelect";
import { useEffect, useState } from "react";
import { TCompanySearch } from "API/Types/Companies/companySearchGet";

interface IProps {
  onCompanyInfoChanged: (company: TCompanySearch | null) => void;
}

const ManualCompany = ({ onCompanyInfoChanged }: IProps) => {
  const [selectedCompany, setSelectedCompany] = useState<TCompanySearch>(
    {} as TCompanySearch
  );

  const handleAddressSelect = (address?: TAddress) => {
    setSelectedCompany({
      ...selectedCompany,
      address,
    });
  };

  const handleNameChange = (e: any) => {
    const value = e.target.value as string;
    setSelectedCompany({
      ...selectedCompany,
      name: value,
    });
  };

  const handleRegistrationNumberChange = (e: any) => {
    const value = e.target.value as string;
    setSelectedCompany({
      ...selectedCompany,
      registrationNumber: value,
    });
  };

  const handleChange = (
    e: any,
    propName: "addressLine" | "city" | "postalCode"
  ) => {
    const value = e.target.value as string;
    setSelectedCompany((prevState) => ({
      ...prevState,
      address: {
        ...prevState?.address,
        [propName]: value,
      },
    }));
  };

  useEffect(() => {
    onCompanyInfoChanged(selectedCompany);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  return (
    <div className="flex flex-col justify-between">
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Company name"
            required
            value={selectedCompany?.name}
            onChange={(e) => handleNameChange(e)}
          />
          <TextField
            required
            label="CVR"
            value={selectedCompany?.registrationNumber}
            onChange={(e) => handleRegistrationNumberChange(e)}
          />
        </div>
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
            value={selectedCompany?.address?.postalCode ?? ""}
            onChange={(e) => handleChange(e, "postalCode")}
          />

          <TextField
            label="City"
            value={selectedCompany?.address?.city ?? ""}
            onChange={(e) => handleChange(e, "city")}
          />
        </div>
      </div>
    </div>
  );
};

export default ManualCompany;
