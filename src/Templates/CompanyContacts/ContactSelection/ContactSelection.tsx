import ColorType from "Components/Enums/colorType";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import ContactSelect, {
  TFilterItem,
} from "Components/Select/ContactSelect/ContactSelect";

import { useEffect, useMemo, useState } from "react";
import ContactCreate from "Templates/CompanyContacts/ContactCreate";
import AddIcon from "@mui/icons-material/Add";
import { TJobCompanyContactPersonResponse } from "API/Types/Jobs/Common/jobCompanyContactPersonResponse";
import { fetchCompany } from "API/Calls/companies";
import { useQuery } from "react-query";
import { TCompanyContactPerson } from "API/Types/Companies/common/companyContactPerson";

interface IContactSelection {
  companyId: string;
  hiddenContacts: TJobCompanyContactPersonResponse[];
  onContactSelect: (contact: TCompanyContactPerson) => void;
}
const ContactSelection = ({
  companyId,
  hiddenContacts,
  onContactSelect,
}: IContactSelection) => {
  const { refetch, data: companyData } = useQuery(
    "company",
    () => fetchCompany(companyId),
    { refetchOnMount: true }
  );

  const [openModal, setOpenModal] = useState(false);
  const [companyContacts, setCompanyContacts] = useState<
    TCompanyContactPerson[]
  >([]);
  const visibleContacts: TFilterItem[] = useMemo(
    () =>
      companyContacts
        .filter((el) => !hiddenContacts.some(({ id }) => id === el.id))
        .map((el) => ({
          id: el.id,
          label: `${el.firstName} ${el.lastName}`.trim(),
          pictureUri: el.picture?.uri,
        })),
    [companyContacts, hiddenContacts]
  );

  useEffect(() => {
    if (companyData?.data?.contactPersons)
      setCompanyContacts(companyData.data.contactPersons);
  }, [companyData]);

  const handleContactSelect = (id: string) => {
    const contact = companyContacts.find((el) => el.id === id);
    if (contact) onContactSelect(contact);
  };

  const handleNewContactAdd = (contact: TCompanyContactPerson) => {
    refetch();
    setOpenModal(false);
    onContactSelect(contact);
  };
  return (
    <>
      <ContactSelect
        className="ml-auto"
        button={
          <Button
            variant={ButtonVariantType.Text}
            color={ColorType.Info}
            label="Add a new contact"
            startIcon={<AddIcon />}
          />
        }
        dataSource={visibleContacts}
        onSelect={handleContactSelect}
        onNewContactAdd={() => setOpenModal(true)}
      />
      <ContactCreate
        companyId={companyId}
        open={openModal}
        onContactAdd={handleNewContactAdd}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
};

export default ContactSelection;
