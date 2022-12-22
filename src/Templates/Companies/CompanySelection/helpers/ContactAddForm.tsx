import { useEffect, useState } from "react";
import Button from "Components/UI/atoms/Button";
import { createContactPerson } from "API/Calls/companies";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TCompanyContactPersonCreateRequest } from "API/Types/Companies/companyContactPersonCreate";
import { TCompanyContactPersonResponse } from "API/Types/Companies/companyContactPersonGet";
import { TCompanyContactPerson } from "API/Types/Companies/common/companyContactPerson";
import { TCompanySearch } from "API/Types/Companies/companySearchGet";
import ContactPersonRoles from "Enums/contactPersonRoles";
import CompanyContacts from "./CompanyContacts";

const validationSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

interface IProps {
  company: TCompanySearch;
  onCompanySelect: (
    company: TCompanySearch,
    contact: TCompanyContactPerson
  ) => void;
}

const ContactAddForm = ({ company, onCompanySelect }: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isValidCompany, setIsValidCompany] = useState<boolean>(false);
  const [isPictureLoading, setIsPictureLoading] = useState<boolean>(false);
  const [isPhoneError, setIsPhoneError] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] =
    useState<TCompanyContactPerson | null>(null);

  const form = useForm<TCompanyContactPersonCreateRequest>({
    defaultValues: {
      role: ContactPersonRoles.Admin,
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  form.watch("picture");

  useEffect(() => {
    if (company?.address?.addressLine && company.address.postalCode) {
      setIsValidCompany(true);
    } else {
      setIsValidCompany(false);
    }
  }, [company]);

  const handleRoleSelect = (value: ContactPersonRoles) => {
    form.setValue("role", value);
  };

  const handleClearForm = () => {
    form.reset();
  };

  const handleResponse = (response: TCompanyContactPersonResponse) => {
    setSelectedContact(response.data);
    onCompanySelect(company, response.data!);
  };

  const handleContactPersonAdd = (data: TCompanyContactPersonCreateRequest) => {
    setLoading(true);

    createContactPerson(company!.id!, data)
      .then((response) => handleResponse(response))
      .catch(() => setLoading(false));
  };

  const handleCompanyConfirmation = async () => {
    await form.trigger();
    if (isPhoneError) return;
    if (!isValidCompany) return;
    if (selectedContact?.id) {
      onCompanySelect(company, selectedContact!);
      return;
    }

    form.handleSubmit(handleContactPersonAdd)();
  };

  const isPersonChosen = (): boolean =>
    !!selectedContact?.id || form.formState.isValid;

  const handleContactPersonPictureUpload = (cacheId?: string) => {
    form.setValue("picture.cacheId", cacheId);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleCompanyConfirmation}>
        <div className="flex flex-col justify-between mb-5 w-[460px]">
          <CompanyContacts
            isNewCompany={false}
            selectedContact={selectedContact}
            contactPersons={company?.contactPersons || []}
            onPersonSelect={setSelectedContact}
            onCancelChanges={handleClearForm}
            selectedRole={form.getValues().role}
            onRoleSelect={handleRoleSelect}
            onContactPersonPictureUpload={handleContactPersonPictureUpload}
            onPictureLoading={setIsPictureLoading}
            onPhoneError={setIsPhoneError}
          />
        </div>
        <div className="flex flex-row-reverse mt-8">
          <Button
            className={`${
              !isPersonChosen() || !isValidCompany
                ? "bg-grey-lightest text-white shadow-none"
                : ""
            }`}
            label="Next step"
            disabled={!isPersonChosen() || loading || isPictureLoading}
            onClick={handleCompanyConfirmation}
          />
        </div>
      </form>
    </FormProvider>
  );
};
export default ContactAddForm;
