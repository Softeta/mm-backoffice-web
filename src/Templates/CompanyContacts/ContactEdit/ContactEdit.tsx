import { useState } from "react";
import Modal from "Components/UI/atoms/Modal";
import ContactForm, {
  FieldNames,
} from "Templates/CompanyContacts/ContactForm/ContactForm";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoaderButton from "Components/UI/atoms/LoaderButton";
import ContactPersonRoles from "Enums/contactPersonRoles";
import { TCompanyContactPerson } from "API/Types/Companies/common/companyContactPerson";
import PopupHeader from "Components/UI/molecules/PopupHeader";
import { updateContactPerson } from "API/Calls/companies";
import TCompanyContactUpdateForm from "./helpers/types";

const fields = {
  [FieldNames.firstName]: "firstName",
  [FieldNames.lastName]: "lastName",
  [FieldNames.position]: "position",
  [FieldNames.role]: "role",
  [FieldNames.picture]: "picture",
  [FieldNames.email]: "",
  [FieldNames.pictureCacheId]: "picture.cacheId",
  [FieldNames.pictureHasChanged]: "picture.hasChanged",
  [FieldNames.phoneCountryCode]: "phone.countryCode",
  [FieldNames.phoneNumber]: "phone.number",
};

interface IProps {
  companyId: string;
  contact: TCompanyContactPerson;
  hasManyAdmins: boolean;
  open: boolean;
  onContactUpdate: (contact: TCompanyContactPerson) => void;
  onClose: () => void;
}

const validationSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  })
  .required();

const ContactEdit = ({
  companyId,
  contact,
  hasManyAdmins,
  open,
  onContactUpdate,
  onClose,
}: IProps) => {
  const form = useForm<TCompanyContactUpdateForm>({
    defaultValues: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      role: contact.role,
      phone: contact.phone,
      position: contact.position,
      picture: {
        hasChanged: false,
      },
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const [isContactPersonPictureLoading, setIsContactPersonPictureLoading] =
    useState<boolean>(false);
  const [isPhoneError, setIsPhoneError] = useState<boolean>(false);
  const submitCompanyContact = async (data: TCompanyContactUpdateForm) => {
    const response = await updateContactPerson(companyId, contact.id, data);
    onContactUpdate(response.data);
    onClose();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    form.handleSubmit(submitCompanyContact)();
  };

  const handleRoleSelect = (value: ContactPersonRoles) => {
    form.setValue("role", value);
  };

  const canEditRole = hasManyAdmins || contact.role === ContactPersonRoles.User;
  const handleContactPersonPictureUpload = (cacheId?: string) => {
    form.setValue("picture", { cacheId, hasChanged: true });
  };

  return (
    <Modal
      open={open}
      header={<PopupHeader label="Edit contact" onClose={onClose} />}
    >
      <div className="px-6 py-5 flex flex-col">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit}>
            <ContactForm
              className="mb-8"
              selectedRole={form.getValues().role}
              onRoleSelect={canEditRole ? handleRoleSelect : undefined}
              fields={fields}
              onPictureLoading={setIsContactPersonPictureLoading}
              onContactPersonPictureUpload={handleContactPersonPictureUpload}
              onPhoneError={setIsPhoneError}
            />
            <div className="flex">
              <LoaderButton
                className="ml-auto"
                disabled={
                  !form.formState.isValid ||
                  form.formState.isSubmitting ||
                  isContactPersonPictureLoading ||
                  isPhoneError
                }
                loading={form.formState.isSubmitting}
                label="Apply changes"
                type="submit"
                loaderProps={{ size: 20 }}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};
export default ContactEdit;
