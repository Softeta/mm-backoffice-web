import FormControl from "@mui/material/FormControl";
import TextField from "Components/UI/atoms/TextField";
import { useContext, useEffect, useState } from "react";
import { Controller, FormProvider, UseFormReturn } from "react-hook-form";
import { Guid } from "Utils/constants";
import { TCompanyCreateForm } from "API/Types/Companies/companyCreate";
import { TCompanySearch } from "API/Types/Companies/companySearchGet";
import { TConfigurations } from "API/Types/configurations";
import { ConfigurationsContext } from "Contexts/Configurations/ConfigurationsContext";
import IndustrySelect from "Components/Select/IndustrySelect";
import { TIndustry } from "API/Types/industries";
import {
  TFile,
  UploadType,
} from "Components/UI/molecules/FileUpload/FileUpload";
import ContactPersonRoles from "Enums/contactPersonRoles";
import { FieldNames } from "Templates/CompanyContacts/ContactForm/ContactForm";
import ContactForm from "Templates/CompanyContacts/ContactForm";
import FileCacheUpload from "Components/UI/molecules/FileUpload/FileCacheUpload";
import {
  addLogoCache,
  deleteLogoCache,
  updateLogoCache,
} from "API/Calls/companyLogo";
import CompanyCreationType from "Enums/companyCreationType";
import ToggleSwitch from "Components/UI/molecules/ToggleSwitch/ToggleSwitch";
import SearchCompanyModification from "../Shared";
import ManualCompany from "../Shared/ManualCompany";

const PersonFields = {
  [FieldNames.firstName]: "person.firstName",
  [FieldNames.lastName]: "person.lastName",
  [FieldNames.position]: "person.position",
  [FieldNames.role]: "person.role",
  [FieldNames.email]: "person.email",
  [FieldNames.picture]: "person.picture",
  [FieldNames.pictureCacheId]: "person.picture.cacheId",
  [FieldNames.pictureHasChanged]: "person.picture.hasChanged",
  [FieldNames.phoneCountryCode]: "person.phone.countryCode",
  [FieldNames.phoneNumber]: "person.phone.number",
};

interface IProps {
  form: UseFormReturn<TCompanyCreateForm, any>;
  onCompanyValidate: (isValid: boolean) => void;
  onLogoLoading: (isLoading: boolean) => void;
  onContactPersonPictureUpload: (cacheId?: string) => void;
  onContactPersonPictureLoading: (loading: boolean) => void;
  onPhoneError: (isError: boolean) => void;
}

export const CompanyCreateForm = ({
  form,
  onCompanyValidate,
  onLogoLoading,
  onContactPersonPictureUpload,
  onContactPersonPictureLoading,
  onPhoneError,
}: IProps) => {
  const [selectedCompany, setSelectedCompany] = useState<TCompanySearch | null>(
    null
  );
  const [isManual, setIsManual] = useState(0);

  const { imageSettings } = useContext<TConfigurations>(ConfigurationsContext);

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

  const isExistingCompany = () =>
    selectedCompany &&
    selectedCompany.id !== undefined &&
    selectedCompany.id !== Guid.Empty;

  useEffect(() => {
    setCompanyInfoValues(selectedCompany);

    if (isExistingCompany()) {
      onCompanyValidate(false);
      return;
    }

    if (
      selectedCompany?.address?.addressLine &&
      selectedCompany.address.postalCode
    ) {
      onCompanyValidate(true);
    } else {
      onCompanyValidate(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  const handleIndustriesChange = (value: TIndustry[]) => {
    form.setValue("industries", value);
  };

  const handleLogoUpload = (cacheId?: string, file?: TFile) => {
    form.setValue("logo.cacheId", cacheId);
    form.setValue("attachedLogoUrl", file?.uri);
  };

  const handleChange = (value: number) => {
    setIsManual(value);
  };

  return (
    <FormProvider {...form}>
      <form>
        <div className=" grid grid-cols-2 gap-4">
          <div>
            {isManual ? (
              <ManualCompany onCompanyInfoChanged={setSelectedCompany} />
            ) : (
              <SearchCompanyModification
                onCompanyInfoChanged={setSelectedCompany}
              />
            )}
            {isExistingCompany() && (
              <p className="p-4 bg-blue-secondary rounded text-xs mb-6">
                {`This company already exist. Please, check in Company's page`}
              </p>
            )}

            <ToggleSwitch
              className="col-span-2 mt-4"
              selected={isManual}
              options={[
                { label: CompanyCreationType.Auto },
                { label: CompanyCreationType.Manual },
              ]}
              onChange={handleChange}
            />

            <Controller
              name="logo"
              control={form.control}
              render={() => (
                <FileCacheUpload
                  className="mt-3"
                  size={imageSettings.maxSizeInKilobytes}
                  label="Upload logo"
                  changeLabel="Change logo"
                  uploadType={UploadType.Image}
                  supportedExtensions={imageSettings.supportedExtensions}
                  onDeleteFileCache={deleteLogoCache}
                  onUpdateFileCache={updateLogoCache}
                  onAddFileCache={addLogoCache}
                  onFileCacheUpdated={handleLogoUpload}
                  onLoading={onLogoLoading}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Controller
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormControl>
                  <TextField label="Website" {...field} />
                </FormControl>
              )}
            />

            <Controller
              control={form.control}
              name="linkedInUrl"
              render={({ field }) => (
                <FormControl>
                  <TextField label="LinkedIn" {...field} />
                </FormControl>
              )}
            />

            <Controller
              control={form.control}
              name="glassdoorUrl"
              render={({ field }) => (
                <FormControl>
                  <TextField label="Glassdoor" {...field} />
                </FormControl>
              )}
            />

            <Controller
              name="industries"
              control={form.control}
              render={({ field }) => (
                <IndustrySelect
                  {...field}
                  className="mt-1.5"
                  selected={form.getValues().industries ?? []}
                  onSelectedChange={handleIndustriesChange}
                />
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div>
            <p className="h3 mt-6 mb-2">Contact person</p>
            <Controller
              name="person"
              control={form.control}
              render={({ field }) => (
                <ContactForm
                  {...field}
                  fields={PersonFields}
                  selectedRole={ContactPersonRoles.Admin}
                  onContactPersonPictureUpload={onContactPersonPictureUpload}
                  onPictureLoading={onContactPersonPictureLoading}
                  onPhoneError={onPhoneError}
                />
              )}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CompanyCreateForm;
