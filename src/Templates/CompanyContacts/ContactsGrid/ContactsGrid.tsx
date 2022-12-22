import { ContactPerson } from "Components/UI/organisms/ContactPerson";
import { useEffect, useState } from "react";
import { rejectContactPerson } from "API/Calls/companies";
import ColorType from "Components/Enums/colorType";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import Button from "Components/UI/atoms/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { TCompanyContactPerson } from "API/Types/Companies/common/companyContactPerson";
import { TContactPerson } from "Components/Types/TContactPerson";
import ContactPersonRoles from "Enums/contactPersonRoles";
import ContactCreate from "../ContactCreate";
import ContactEdit from "../ContactEdit";

interface IProps {
  contacts: TCompanyContactPerson[];
  companyId: string;
  hideAddNew?: boolean;
  onContactsChange?: (update: TCompanyContactPerson[]) => void;
}

const ContactsGrid = ({
  companyId,
  contacts,
  hideAddNew,
  onContactsChange,
}: IProps) => {
  const hasMoreThanOneAdmin = (persons: TCompanyContactPerson[]): boolean =>
    persons.filter((x) => x.role === ContactPersonRoles.Admin).length > 1;

  const [key, setKey] = useState<number>(1);
  const [hasManyAdmins, setHasManyAdmins] = useState(
    hasMoreThanOneAdmin(contacts)
  );
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [contactPersons, setContactPersons] = useState(contacts);
  const [selectedContact, setSelectedContact] = useState<
    TCompanyContactPerson | undefined
  >();

  useEffect(() => {
    const hasMoreAdmins = hasMoreThanOneAdmin(contactPersons);
    setHasManyAdmins(hasMoreAdmins);
  }, [contactPersons]);

  const handleSelectContact = (id: string) => {
    setKey(key + 1);
    const contact = contactPersons.find((x) => x.id === id);
    setSelectedContact(contact);
    setOpenEditModal(true);
  };

  const handleDeleteContact = async (contactId: string) => {
    const updatedContacts = contactPersons.filter((x) => x.id !== contactId);
    setContactPersons(updatedContacts);
    try {
      await rejectContactPerson(companyId, contactId);
      onContactsChange?.(updatedContacts);
    } catch (error) {
      setContactPersons([...contactPersons]);
    }
  };

  const handleContactEdit = (contact: TCompanyContactPerson) => {
    const filteredContact = contactPersons.filter((x) => x.id !== contact.id);

    const updatedContacts = [...filteredContact, contact];

    setContactPersons(updatedContacts);
    setSelectedContact(undefined);
    onContactsChange?.(updatedContacts);
  };

  const handleContactCreate = (contact: TCompanyContactPerson) => {
    setContactPersons([...contactPersons, contact]);
    onContactsChange?.([...contactPersons, contact]);
  };

  const handleOpenCreate = () => {
    setKey(key + 1);
    setOpenCreateModal(true);
  };

  return (
    <>
      <div className="flex">
        <div className="font-semibold mb-4 pt-1.5">Admins</div>
        {!hideAddNew && (
          <>
            <Button
              className="ml-auto"
              variant={ButtonVariantType.Text}
              label="Create a new contact"
              color={ColorType.Info}
              startIcon={<PersonAddIcon />}
              onClick={handleOpenCreate}
            />
            <ContactCreate
              key={key}
              companyId={companyId}
              open={openCreateModal}
              onContactAdd={handleContactCreate}
              onClose={() => setOpenCreateModal(false)}
            />
          </>
        )}
      </div>
      <div className="grid grid-cols-3 text-xs gap-4">
        {contactPersons.map(
          (contact) =>
            contact.role === ContactPersonRoles.Admin && (
              <div key={contact.id}>
                <ContactPerson
                  onDelete={handleDeleteContact}
                  onEdit={handleSelectContact}
                  person={contact as TContactPerson}
                  className="contact-person-card-hover"
                />
              </div>
            )
        )}
      </div>

      <div className="font-semibold my-4 pt-1.5">Users</div>
      <div className="grid grid-cols-3 text-xs gap-4">
        {contactPersons.map(
          (contact) =>
            contact.role === ContactPersonRoles.User && (
              <div key={contact.id}>
                <ContactPerson
                  onDelete={handleDeleteContact}
                  onEdit={handleSelectContact}
                  person={contact as TContactPerson}
                  className="contact-person-card-hover"
                />
              </div>
            )
        )}
      </div>
      {selectedContact && (
        <ContactEdit
          key={key}
          companyId={companyId}
          contact={selectedContact}
          hasManyAdmins={hasManyAdmins}
          open={openEditModal}
          onContactUpdate={handleContactEdit}
          onClose={() => setOpenEditModal(false)}
        />
      )}
    </>
  );
};

export default ContactsGrid;
