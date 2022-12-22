import { useContext, useEffect, useState } from "react";
import { createCompany } from "API/Calls/companies";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TCompanyContactPerson } from "API/Types/Companies/common/companyContactPerson";
import { TCompanyResponse } from "API/Types/Companies/companyGet";
import { TCompanySearch } from "API/Types/Companies/companySearchGet";
import ContactPersonRoles from "Enums/contactPersonRoles";
import { UploadType } from "Components/UI/molecules/FileUpload/FileUpload";
import { TConfigurations } from "API/Types/configurations";
import { ConfigurationsContext } from "Contexts/Configurations/ConfigurationsContext";
import ContactForm from "Templates/CompanyContacts/ContactForm";
import { FieldNames } from "Templates/CompanyContacts/ContactForm/ContactForm";
import Button from "Components/UI/atoms/Button";
import { TCompanyCreateRequest } from "API/Types/Companies/companyCreate";
import FileCacheUpload from "Components/UI/molecules/FileUpload/FileCacheUpload";
import {
  addLogoCache,
  deleteLogoCache,
  updateLogoCache,
} from "API/Calls/companyLogo";
import CenteredLoader from "Components/UI/molecules/CenteredLoader";

const PersonFields = {
  [FieldNames.firstName]: "person.firstName",
  [FieldNames.lastName]: "person.lastName",
  [FieldNames.position]: "person.position",
  [FieldNames.role]: "person.role",
  [FieldNames.email]: "person.email",
  [FieldNames.picture]: "person.picture",
  [FieldNames.pictureCacheId]: "person.picture.cacheId",
  [FieldNames.pictureHasChanged]: "person.picture.pictureHasChanged",
  [FieldNames.phoneCountryCode]: "person.phone.countryCode",
  [FieldNames.phoneNumber]: "person.phone.number",
};

const validationSchema = yup.object({
  person: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
  }),
});

interface IProps {
  company: TCompanySearch;
  onCompanyCreate: (
    company: TCompanySearch,
    contact: TCompanyContactPerson
  ) => void;
}

const CompanyCreation = ({ onCompanyCreate, company }: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<TCompanySearch | null>(
    company
  );
  const [isValidCompany, setIsValidCompany] = useState<boolean>(false);
  const [isContactPersonPictureLoading, setIsContactPersonPictureLoading] =
    useState<boolean>(false);
  const [isCompanyLogoLoading, setIsCompanyLogoLoading] =
    useState<boolean>(false);
  const [isPhoneError, setIsPhoneError] = useState<boolean>(false);

  const { imageSettings } = useContext<TConfigurations>(ConfigurationsContext);

  const form = useForm<TCompanyCreateRequest>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: company.name,
      registrationNumber: company.registrationNumber,
      address: company.address,
    },
    mode: "onChange",
  });

  form.watch("logo");
  form.watch("person.picture");

  const setCompanyInfoValues = (payload: TCompanySearch | null) => {
    if (!payload) return;

    form.setValue("name", payload.name);
    form.setValue("registrationNumber", payload.registrationNumber);
    form.setValue("address.addressLine", payload.address?.addressLine);
    form.setValue("address.location", payload.address?.location);
    form.setValue("address.city", payload.address?.city);
    form.setValue("address.country", payload.address?.country);
    form.setValue("address.postalCode", payload.address?.postalCode);
    form.setValue("address.latitude", payload.address?.latitude);
    form.setValue("address.longitude", payload.address?.longitude);
  };

  useEffect(() => {
    setSelectedCompany(company);
  }, [company]);

  useEffect(() => {
    setCompanyInfoValues(selectedCompany);
    if (
      selectedCompany?.address?.addressLine &&
      selectedCompany.address.postalCode
    ) {
      setIsValidCompany(true);
    } else {
      setIsValidCompany(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  const handleResponse = (response: TCompanyResponse, email: string) => {
    const contact = response.data.contactPersons?.find(
      (x) => x.email === email
    );

    onCompanyCreate(response.data, contact!);
  };

  const handleCompanyCreate = (data: TCompanyCreateRequest) => {
    setLoading(true);

    createCompany(data)
      .then((response) => handleResponse(response, data.person.email))
      .catch(() => setLoading(false));
  };

  const handleCompanyConfirmation = async () => {
    await form.trigger();
    if (isPhoneError) return;
    if (!isValidCompany) return;
    form.handleSubmit(handleCompanyCreate)();
  };

  const handleContactPersonPictureUpload = (cacheId?: string) => {
    form.setValue("person.picture.cacheId", cacheId);
  };

  const handleCompanyLogoUpload = (cacheId?: string) => {
    form.setValue("logo.cacheId", cacheId);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleCompanyConfirmation}>
        <div className="flex flex-col justify-between mb-5 w-[460px]">
          <div className="mb-4">
            <p className="h3 my-4">Company logo</p>
            <Controller
              name="logo"
              control={form.control}
              render={() => (
                <FileCacheUpload
                  size={imageSettings.maxSizeInKilobytes}
                  label="Upload logo"
                  changeLabel="Change logo"
                  defaultCacheId={form.getValues().logo?.cacheId}
                  onDeleteFileCache={deleteLogoCache}
                  onUpdateFileCache={updateLogoCache}
                  onAddFileCache={addLogoCache}
                  onFileCacheUpdated={handleCompanyLogoUpload}
                  onLoading={setIsCompanyLogoLoading}
                  supportedExtensions={imageSettings.supportedExtensions}
                  uploadType={UploadType.Image}
                />
              )}
            />
          </div>
          <ContactForm
            className="mt-4"
            fields={PersonFields}
            selectedRole={ContactPersonRoles.Admin}
            onContactPersonPictureUpload={handleContactPersonPictureUpload}
            onPictureLoading={setIsContactPersonPictureLoading}
            onPhoneError={setIsPhoneError}
          />
        </div>
        <div className="flex flex-row-reverse mt-8">
          {loading && <CenteredLoader />}
          {!loading && (
            <Button
              label="Next step"
              disabled={isContactPersonPictureLoading || isCompanyLogoLoading}
              onClick={handleCompanyConfirmation}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
};
export default CompanyCreation;
