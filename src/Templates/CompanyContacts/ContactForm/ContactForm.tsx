import { useFormContext, Controller } from "react-hook-form";
import TextField from "Components/UI/atoms/TextField";
import {
  TFile,
  UploadType,
} from "Components/UI/molecules/FileUpload/FileUpload";
import { ConfigurationsContext } from "Contexts/Configurations/ConfigurationsContext";
import { TConfigurations } from "API/Types/configurations";
import { forwardRef, useContext, Ref } from "react";
import PhoneInput from "Components/UI/molecules/PhoneInput";
import ContactPersonRoleSwitch from "Components/UI/organisms/ContactPersonRoleSwitch";
import ContactPersonRoles from "Enums/contactPersonRoles";
import { PositionSingleSelect } from "Components/Select/PositionSelect";
import { TPosition } from "API/Types/position";
import FileCacheUpload from "Components/UI/molecules/FileUpload/FileCacheUpload";
import {
  addContactPersonPictureCache,
  deleteContactPersonPictureCache,
  updateContactPersonPictureCache,
} from "API/Calls/companyContactPersonPicture";

export enum FieldNames {
  firstName = "firstName",
  lastName = "lastName",
  position = "position",
  role = "role",
  email = "email",
  picture = "picture",
  pictureCacheId = "picture.cacheId",
  pictureHasChanged = "picture.hasChanged",
  phoneCountryCode = "phone.countryCode",
  phoneNumber = "phone.number",
}

export type Fields = {
  [key in FieldNames]: string;
};

interface IProps {
  fields: Fields;
  className?: string;
  selectedRole: ContactPersonRoles;
  onRoleSelect?: (selected: ContactPersonRoles) => void;
  onPictureLoading: (loading: boolean) => void;
  onContactPersonPictureUpload: (cacheId?: string, file?: TFile) => void;
  onPhoneError: (isError: boolean) => void;
}

const ContactForm = forwardRef(
  (
    {
      fields,
      className,
      selectedRole,
      onRoleSelect,
      onPictureLoading,
      onContactPersonPictureUpload,
      onPhoneError,
    }: IProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const { imageSettings } = useContext<TConfigurations>(
      ConfigurationsContext
    );
    const { control, getValues, setValue, watch } = useFormContext();

    watch(fields[FieldNames.pictureCacheId]);

    const handlePhoneChange = (countryCode?: string, number?: string) => {
      setValue(fields[FieldNames.phoneCountryCode], countryCode);
      setValue(fields[FieldNames.phoneNumber], number);
    };

    const handlePositionChange = (value: TPosition | null) => {
      setValue(fields[FieldNames.position], value);
    };

    return (
      <div className={`grid grid-cols-2 gap-4 ${className}`} ref={ref}>
        <Controller
          name={fields.firstName}
          defaultValue=""
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="First name"
              error={!!error}
              helperText={error?.message}
              required
            />
          )}
        />

        <Controller
          name={fields.lastName}
          defaultValue=""
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Last name"
              error={!!error}
              helperText={error?.message}
              required
            />
          )}
        />

        <Controller
          name={fields.position}
          control={control}
          render={({ field: { value, ...rest } }) => (
            <PositionSingleSelect
              className="col-span-2"
              {...rest}
              selectedItem={value}
              onItemSelect={handlePositionChange}
            />
          )}
        />

        <Controller
          name={fields.role}
          defaultValue=""
          control={control}
          render={({ field }) => (
            <ContactPersonRoleSwitch
              {...field}
              className="col-span-2"
              selected={selectedRole}
              onChange={onRoleSelect}
              disabled={!onRoleSelect}
            />
          )}
        />

        {fields.email && (
          <Controller
            name={fields.email}
            defaultValue=""
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Email"
                className="col-span-2"
                error={!!error}
                helperText={error?.message}
                required
              />
            )}
          />
        )}

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              {...field}
              label="Phone no."
              className="col-span-2"
              countryCode={getValues().phone?.countryCode}
              number={getValues().phone?.number}
              onChange={handlePhoneChange}
              onError={onPhoneError}
            />
          )}
        />

        <div className="col-span-2">
          <Controller
            name={fields.picture}
            control={control}
            render={() => (
              <FileCacheUpload
                size={imageSettings.maxSizeInKilobytes}
                label="Upload photo"
                changeLabel="Change photo"
                defaultCacheId={getValues().picture?.cacheId}
                onDeleteFileCache={deleteContactPersonPictureCache}
                onUpdateFileCache={updateContactPersonPictureCache}
                onAddFileCache={addContactPersonPictureCache}
                onFileCacheUpdated={onContactPersonPictureUpload}
                onLoading={onPictureLoading}
                supportedExtensions={imageSettings.supportedExtensions}
                uploadType={UploadType.Image}
              />
            )}
          />
        </div>
      </div>
    );
  }
);

export default ContactForm;
