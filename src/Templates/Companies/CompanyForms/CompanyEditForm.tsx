import FormControl from "@mui/material/FormControl";
import TextField from "Components/UI/atoms/TextField";
import { Controller, FormProvider, UseFormReturn } from "react-hook-form";
import { TAddress } from "API/Types/address";
import { TCompanyUpdateForm } from "API/Types/Companies/companyUpdate";
import { TCompany } from "API/Types/Companies/companyGet";
import IndustrySelect from "Components/Select/IndustrySelect";
import { TIndustry } from "API/Types/industries";
import Avatar from "Components/UI/atoms/Avatar";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import AddressSingleSelect from "Components/Select/AddressSelect/AddressSingleSelect";
import {
  TFile,
  UploadType,
} from "Components/UI/molecules/FileUpload/FileUpload";
import { useContext } from "react";
import { ConfigurationsContext } from "Contexts/Configurations/ConfigurationsContext";
import { TConfigurations } from "API/Types/configurations";
import FileCacheUpload from "Components/UI/molecules/FileUpload/FileCacheUpload";
import {
  addLogoCache,
  deleteLogoCache,
  updateLogoCache,
} from "API/Calls/companyLogo";
import { TFileResponse } from "API/Types/fileResponse";

interface IProps {
  company: TCompany;
  form: UseFormReturn<TCompanyUpdateForm, any>;
  onLogoLoading: (isLoading: boolean) => void;
}

export const CompanyEditForm = ({ company, form, onLogoLoading }: IProps) => {
  const { imageSettings } = useContext<TConfigurations>(ConfigurationsContext);

  const handleAddressSelect = (address?: TAddress) => {
    if (address) {
      form.setValue("address.addressLine", address.addressLine);
      form.setValue("address.country", address.country);
      form.setValue("address.city", address.city);
      form.setValue("address.postalCode", address.postalCode);
      form.setValue("address.longitude", address.longitude);
      form.setValue("address.latitude", address.latitude);
    }
  };

  const handleIndustriesChange = (value: TIndustry[]) => {
    form.setValue("industries", value);
  };

  const handleLogoUpload = (cacheId?: string, file?: TFile) => {
    form.setValue("logo", { cacheId, hasChanged: true });
    form.setValue("attachedLogo", file as TFileResponse);
  };

  return (
    <FormProvider {...form}>
      <form>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col justify-between">
            <div className="grid gap-4">
              <div className="flex justify-between py-2.5">
                <div className="flex items-center">
                  {company.logo?.uri && (
                    <Avatar
                      className="mr-2"
                      imageURL={form.getValues().attachedLogo?.uri}
                      title={company.name}
                      size={AvatarSizeType.Small}
                    />
                  )}
                  <span className="text-xs font-semibold text-grey-dark">
                    {company.name}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-grey-dark">
                    CVR: {company.registrationNumber}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <Controller
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormControl className="col-span-2">
                      <AddressSingleSelect
                        {...field}
                        required
                        onItemSelect={handleAddressSelect}
                        label="Address"
                        selectedValue={
                          form.getValues()?.address?.addressLine || ""
                        }
                      />
                    </FormControl>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Controller
                  control={form.control}
                  name="address.postalCode"
                  render={({ field }) => (
                    <FormControl>
                      <TextField {...field} label="Postal code" />
                    </FormControl>
                  )}
                />

                <Controller
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormControl>
                      <TextField {...field} label="City" />
                    </FormControl>
                  )}
                />
              </div>

              <div>
                <Controller
                  name="logo"
                  control={form.control}
                  render={() => (
                    <FormControl>
                      <FileCacheUpload
                        size={imageSettings.maxSizeInKilobytes}
                        label="Upload logo"
                        changeLabel="Change logo"
                        uploadType={UploadType.Image}
                        supportedExtensions={imageSettings.supportedExtensions}
                        onDeleteFileCache={deleteLogoCache}
                        onUpdateFileCache={updateLogoCache}
                        onAddFileCache={addLogoCache}
                        onFileCacheUpdated={handleLogoUpload}
                        selectedFile={
                          !form.getValues().logo?.hasChanged
                            ? (company.logo as TFile)
                            : undefined
                        }
                        onLoading={onLogoLoading}
                      />
                    </FormControl>
                  )}
                />
              </div>
            </div>
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
      </form>
    </FormProvider>
  );
};

export default CompanyEditForm;
