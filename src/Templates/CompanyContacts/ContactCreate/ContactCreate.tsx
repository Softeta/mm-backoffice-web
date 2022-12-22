import Modal from "Components/UI/atoms/Modal";
import ContactForm, {
  FieldNames,
} from "Templates/CompanyContacts/ContactForm/ContactForm";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "Components/UI/molecules/Snackbar/snackbarState";
import { AlertType } from "Components/UI/molecules/Snackbar";
import LoaderButton from "Components/UI/atoms/LoaderButton";
import ContactPersonRoles from "Enums/contactPersonRoles";
import { TCompanyContactPerson } from "API/Types/Companies/common/companyContactPerson";
import PopupHeader from "Components/UI/molecules/PopupHeader";
import { useState } from "react";
import { createContactPerson } from "API/Calls/companies";
import TCompanyContactCreateForm from "./helpers/types";

const fields = {
  [FieldNames.firstName]: "firstName",
  [FieldNames.lastName]: "lastName",
  [FieldNames.position]: "position",
  [FieldNames.role]: "role",
  [FieldNames.email]: "email",
  [FieldNames.picture]: "picture",
  [FieldNames.pictureCacheId]: "picture.cacheId",
  [FieldNames.pictureHasChanged]: "picture.hasChanged",
  [FieldNames.phoneCountryCode]: "phone.countryCode",
  [FieldNames.phoneNumber]: "phone.number",
};

interface IProps {
  companyId: string;
  open: boolean;
  onContactAdd: (contact: TCompanyContactPerson) => void;
  onClose: () => void;
}

const validationSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

const ContactCreate = ({ companyId, open, onContactAdd, onClose }: IProps) => {
  const form = useForm<TCompanyContactCreateForm>({
    defaultValues: {
      role: ContactPersonRoles.User,
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const [isContactPersonPictureLoading, setIsContactPersonPictureLoading] =
    useState<boolean>(false);
  const [isPhoneError, setIsPhoneError] = useState<boolean>(false);

  const setSnackbar = useSetRecoilState(snackbarState);

  const submitNewCompanyContact = async (data: TCompanyContactCreateForm) => {
    if (isPhoneError) return;
    const response = await createContactPerson(companyId, data);
    setSnackbar({
      open: true,
      message: "New contact added",
      severity: AlertType.success,
    });

    onContactAdd(response.data);
    form.reset();
    onClose();
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    form.handleSubmit(submitNewCompanyContact)();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleRoleSelect = (value: ContactPersonRoles) => {
    form.setValue("role", value);
  };

  const handleContactPersonPictureUpload = (cacheId?: string) => {
    form.setValue("picture", { cacheId });
  };

  return (
    <Modal
      open={open}
      header={
        <PopupHeader label="Create a new contact" onClose={handleClose} />
      }
    >
      <div className="px-6 py-5 flex flex-col">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit}>
            <ContactForm
              className="mb-8"
              selectedRole={form.getValues().role}
              onRoleSelect={handleRoleSelect}
              fields={fields}
              onPictureLoading={setIsContactPersonPictureLoading}
              onContactPersonPictureUpload={handleContactPersonPictureUpload}
              onPhoneError={setIsPhoneError}
            />
            <div className="flex">
              <LoaderButton
                className="ml-auto"
                disabled={
                  form.formState.isSubmitting || isContactPersonPictureLoading
                }
                loading={form.formState.isSubmitting}
                label="Create a new contact"
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
export default ContactCreate;
