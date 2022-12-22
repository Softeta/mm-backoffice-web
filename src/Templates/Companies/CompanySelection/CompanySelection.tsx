import Modal from "Components/UI/atoms/Modal";
import { useState } from "react";
import { Guid } from "Utils/constants";
import { TCompanyContactPerson } from "API/Types/Companies/common/companyContactPerson";
import { TCompanySearch } from "API/Types/Companies/companySearchGet";
import PopupHeader from "Components/UI/molecules/PopupHeader";
import SearchCompanyModification from "../Shared";
import CompanyCreationForm from "./helpers/CompanyCreationForm";
import ContactAddForm from "./helpers/ContactAddForm";

interface IProps {
  isModalOpen: boolean;
  onSetOpenModal: (isOpen: boolean) => void;
  onCompanySelect: (
    company: TCompanySearch,
    contact: TCompanyContactPerson
  ) => void;
}

const CompanySelection = ({
  isModalOpen,
  onSetOpenModal,
  onCompanySelect,
}: IProps) => {
  const [selectedCompany, setSelectedCompany] = useState<TCompanySearch | null>(
    null
  );

  const handleClose = () => {
    onSetOpenModal(false);
  };

  return (
    <Modal
      open={isModalOpen}
      header={
        <PopupHeader label="Create or select company" onClose={handleClose} />
      }
    >
      <div className="py-5 px-6 max-h-[80vh] overflow-auto">
        <div className="flex flex-col justify-between mb-5 w-[460px]">
          <SearchCompanyModification
            showCompanyCreationText
            onCompanyInfoChanged={setSelectedCompany}
          />
          {selectedCompany && selectedCompany.id === Guid.Empty && (
            <CompanyCreationForm
              company={selectedCompany}
              onCompanyCreate={onCompanySelect}
            />
          )}

          {selectedCompany?.id && selectedCompany.id !== Guid.Empty && (
            <ContactAddForm
              company={selectedCompany}
              onCompanySelect={onCompanySelect}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};
export default CompanySelection;
