import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import ContactPersonCard from "Components/UI/molecules/ContactPersonCard";
import AddIcon from "Assets/Icons/add.svg";
import CloseIcon from "Assets/Icons/close.svg";
import { useEffect, useState } from "react";
import MenuItem from "Components/UI/atoms/MenuItem";
import ContactForm, {
  FieldNames,
} from "Templates/CompanyContacts/ContactForm/ContactForm";
import { TCompanyContactPerson } from "API/Types/Companies/common/companyContactPerson";
import ContactPersonRoles from "Enums/contactPersonRoles";

const PersonFields = {
  [FieldNames.firstName]: "firstName",
  [FieldNames.lastName]: "lastName",
  [FieldNames.position]: "position",
  [FieldNames.role]: "role",
  [FieldNames.email]: "email",
  [FieldNames.picture]: "picture",
  [FieldNames.pictureCacheId]: "person.picture.cacheId",
  [FieldNames.pictureHasChanged]: "person.picture.pictureHasChanged",
  [FieldNames.phoneCountryCode]: "phone.countryCode",
  [FieldNames.phoneNumber]: "phone.number",
};

interface IProps {
  isNewCompany: boolean;
  contactPersons: TCompanyContactPerson[];
  selectedContact: TCompanyContactPerson | null;
  onPersonSelect: (person: TCompanyContactPerson | null) => void;
  onCancelChanges: () => void;
  selectedRole: ContactPersonRoles;
  onRoleSelect: (value: ContactPersonRoles) => void;
  onContactPersonPictureUpload: (cacheId?: string) => void;
  onPictureLoading: (loading: boolean) => void;
  onPhoneError: (isError: boolean) => void;
}

const CompanyContacts = ({
  selectedContact,
  isNewCompany,
  contactPersons,
  onPersonSelect,
  onCancelChanges,
  selectedRole,
  onRoleSelect,
  onContactPersonPictureUpload,
  onPictureLoading,
  onPhoneError,
}: IProps) => {
  const [showContactCreation, setShowContactCreation] = useState(isNewCompany);

  const handleAddNewContact = () => {
    setShowContactCreation(true);
    onPersonSelect(null);
  };

  const handleCancel = () => {
    setShowContactCreation(false);
    onCancelChanges();
  };

  useEffect(() => {
    setShowContactCreation(isNewCompany);
  }, [isNewCompany]);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="h3">Main contact</div>

        {!showContactCreation && (
          <Button
            className="text-grey-middle text-xs"
            label="Add a new contact"
            onClick={handleAddNewContact}
            variant={ButtonVariantType.Text}
            startIcon={<img src={AddIcon} alt="" />}
          />
        )}

        {showContactCreation && (
          <Button
            className="text-grey-middle text-xs"
            label="Cancel"
            onClick={handleCancel}
            variant={ButtonVariantType.Text}
            startIcon={<img src={CloseIcon} alt="" />}
          />
        )}
      </div>

      {!showContactCreation && (
        <div className="max-h-[300px] overflow-auto">
          {contactPersons.map((person) => (
            <MenuItem
              className="p-0"
              key={person.id}
              onClick={() => onPersonSelect(person)}
            >
              <ContactPersonCard
                className={`${
                  selectedContact?.id === person.id
                    ? "bg-blue-secondary-hover"
                    : ""
                } contact-person-card-hover`}
                person={{
                  id: person.id,
                  email: person.email,
                  firstName: person.firstName,
                  lastName: person.lastName,
                  position: {
                    id: person.position?.id ?? "",
                    code: person.position?.code ?? "",
                  },
                  phone: person.phone?.phoneNumber,
                  picture: person.picture,
                }}
              />
            </MenuItem>
          ))}
        </div>
      )}

      {showContactCreation && (
        <ContactForm
          className="mt-4"
          selectedRole={selectedRole}
          onRoleSelect={onRoleSelect}
          fields={PersonFields}
          onContactPersonPictureUpload={onContactPersonPictureUpload}
          onPictureLoading={onPictureLoading}
          onPhoneError={onPhoneError}
        />
      )}
    </div>
  );
};
export default CompanyContacts;
