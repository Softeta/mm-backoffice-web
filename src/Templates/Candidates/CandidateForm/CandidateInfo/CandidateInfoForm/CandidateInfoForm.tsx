import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import {
  TFile,
  UploadType,
} from "Components/UI/molecules/FileUpload/FileUpload";
import TextField from "Components/UI/atoms/TextField";
import { ConfigurationsContext } from "Contexts/Configurations/ConfigurationsContext";
import { TConfigurations } from "API/Types/configurations";
import { ChangeEvent, ReactNode, useContext } from "react";
import { PositionSingleSelect } from "Components/Select/PositionSelect";
import { TPosition } from "API/Types/position";
import { TSkill } from "API/Types/skills";
import { TIndustry } from "API/Types/industries";
import { FormControl, SelectChangeEvent } from "@mui/material";
import DatePicker from "Components/UI/molecules/DatePicker";
import SkillSelect from "Components/Select/SkillSelect";
import IndustrySelect from "Components/Select/IndustrySelect";
import LanguagesSelect from "Components/Select/LanguagesSelect";
import { ClassificatorsContext } from "Contexts/Classificators/ClassificatorsContext";
import MenuItem from "Components/UI/atoms/MenuItem";
import { useTranslation } from "react-i18next";
import { TLanguage } from "API/Types/languages";
import CurrencySelectWithInput, {
  IChange,
} from "Components/UI/molecules/CurrencySelectWithInput/CurrencySelectWithInput";
import WorkTypesEnum from "Enums/workType";
import DivideVariantType from "Components/UI/atoms/Divide/divideVariantType";
import Divide from "Components/UI/atoms/Divide";
import Checkbox from "Components/UI/atoms/Checkbox";
import Select from "Components/UI/atoms/Select";
import Translates from "locales/translates/translates";
import PhoneInput from "Components/UI/molecules/PhoneInput";
import { TAddress } from "API/Types/address";
import AddressSingleSelect from "Components/Select/AddressSelect/AddressSingleSelect";
import FileCacheUpload from "Components/UI/molecules/FileUpload/FileCacheUpload";
import WorkingHoursType from "Enums/workingHoursType";
import {
  addCandidatePictureCache,
  deleteCandidatePictureCache,
  updateCandidatePictureCache,
} from "API/Calls/candidatePicture";
import { THobby } from "API/Types/hobbies";
import HobbySelect from "Components/Select/HobbySelect";
import { InputNames } from "../../InputNames";

interface IProps {
  onCandidatePictureUpload: (cacheId?: string, file?: TFile) => void;
  onCandidatePictureLoading: (loading: boolean) => void;
  onPhoneError: (isError: boolean) => void;
  defaultCandidatePictureChacheId?: string;
  selectedPicture?: TFile;
  form: UseFormReturn<FieldValues, any>;
}
const CandidateInfoForm = ({
  onCandidatePictureUpload,
  onCandidatePictureLoading,
  onPhoneError,
  defaultCandidatePictureChacheId,
  selectedPicture,
  form,
}: IProps) => {
  const { t } = useTranslation();

  const { control, register, setValue, getValues, watch, getFieldState } = form;
  const { workingHourTypes, formatTypes } = useContext(ClassificatorsContext);
  const { imageSettings } = useContext<TConfigurations>(ConfigurationsContext);

  const selectedCurrency = watch(InputNames.currency);
  const workTypes = watch(InputNames.workTypes);
  const workingHoursType: string[] = watch(InputNames.workingHourTypes);

  const isFreelance = workTypes.includes(WorkTypesEnum.Freelance);
  const isPermanent = workTypes.includes(WorkTypesEnum.Permanent);

  const createList = (
    iter: string[] = [],
    translationPrefix: string | undefined = undefined
  ): ReactNode =>
    iter.map((value: string) => (
      <MenuItem key={value} value={value}>
        {translationPrefix ? t(`${translationPrefix}.${value}`) : value}
      </MenuItem>
    ));

  const onCurrencyChange = (field: Record<string, any>): IChange => ({
    currency: (c: SelectChangeEvent<unknown>) => {
      setValue("currency", c.target.value as string);
    },
    ammount: (c: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      field.onChange(c);
    },
  });

  const handleWorkTypeChanges = (
    check: boolean,
    workType: WorkTypesEnum.Freelance | WorkTypesEnum.Permanent
  ) => {
    if (!check && workTypes.length < 2) return;

    setValue(
      "workTypes",
      check
        ? [...workTypes, workType]
        : workTypes.filter((x: WorkTypesEnum) => x !== workType)
    );
  };

  const handleLanguagesChange = (data: TLanguage[]) => {
    setValue("languages", data);
  };

  const handlePositionChange = (position: TPosition | null) => {
    setValue("currentPosition", position ?? undefined);
  };

  const handleSkillsChange = (skills: TSkill[]) => {
    setValue("skills", skills);
  };

  const handleDesiredSkillsChange = (skills: TSkill[]) => {
    setValue("desiredSkills", skills);
  };

  const handleIndustriesChange = (industries: TIndustry[]) => {
    setValue("industries", industries);
  };

  const handleHobbiesChange = (hobbies: THobby[]) => {
    setValue("hobbies", hobbies);
  };

  const handleAddressSelect = (address?: TAddress) => {
    setValue("address", address);
  };

  const handlePhoneChange = (countryCode?: string, number?: string) => {
    setValue("phone.countryCode", countryCode);
    setValue("phone.number", number);
  };

  const isInvalid = (inputName: string): boolean =>
    !!getFieldState(inputName).error;

  const isInvalidEmailAndLinkedIn = (): boolean => {
    watch(InputNames.linkedInUrl);
    watch(InputNames.email);
    return isInvalid(InputNames.email) && isInvalid(InputNames.linkedInUrl);
  };

  return (
    <form>
      <input type="hidden" {...register(InputNames.currency)} />
      <p className="h4 font-semibold mb-2">Personal information</p>
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name={InputNames.firstName}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField {...field} label="First name" required error={!!error} />
          )}
        />
        <Controller
          name={InputNames.lastName}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField {...field} label="Last name" required error={!!error} />
          )}
        />
        <Controller
          control={control}
          name={InputNames.currentPosition}
          render={({ field: { value, ...rest } }) => (
            <PositionSingleSelect
              {...rest}
              selectedItem={value}
              onItemSelect={handlePositionChange}
              label="Current position"
            />
          )}
        />
        <Controller
          control={control}
          name={InputNames.birthDate}
          render={({ field }) => (
            <FormControl>
              <DatePicker label="Birth date" {...field} />
            </FormControl>
          )}
        />
        <Controller
          name={InputNames.skills}
          control={control}
          render={({ field: { value, ...rest } }) => (
            <FormControl className="col-span-2">
              <SkillSelect
                {...rest}
                onSelectedChange={handleSkillsChange}
                selected={value || []}
                jobPosition={getValues().currentPosition}
              />
            </FormControl>
          )}
        />
        <Controller
          name={InputNames.desiredSkills}
          control={control}
          render={({ field: { value, ...rest } }) => (
            <FormControl className="col-span-2">
              <SkillSelect
                {...rest}
                texts={{
                  label: "Desired skills",
                }}
                onSelectedChange={handleDesiredSkillsChange}
                selected={value || []}
                jobPosition={getValues().currentPosition}
              />
            </FormControl>
          )}
        />
        <Controller
          name={InputNames.industries}
          control={control}
          render={({ field }) => (
            <IndustrySelect
              {...field}
              className="col-span-2"
              selected={field.value}
              onSelectedChange={handleIndustriesChange}
            />
          )}
        />
        <Controller
          control={control}
          name={InputNames.languages}
          render={({ field }) => (
            <LanguagesSelect
              {...field}
              className="col-span-2"
              selected={field.value}
              onSelectedChange={handleLanguagesChange}
            />
          )}
        />
        <Controller
          control={control}
          name={InputNames.hobbies}
          render={({ field }) => (
            <HobbySelect
              {...field}
              className="col-span-2"
              selected={field.value || []}
              onSelectedChange={handleHobbiesChange}
            />
          )}
        />
        <Divide variant={DivideVariantType.Horizontal} className="col-span-2" />

        <p className="h4 font-semibold col-span-2">Contacts</p>
        <Controller
          name={InputNames.phoneCountryCode}
          control={control}
          render={({ field }) => (
            <PhoneInput
              {...field}
              countryCode={getValues().phone?.countryCode}
              number={getValues().phone?.number}
              onChange={handlePhoneChange}
              onError={onPhoneError}
              label="Phone no."
            />
          )}
        />
        <Controller
          name={InputNames.email}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Email"
              error={
                isInvalidEmailAndLinkedIn() || (!!error && getValues().email)
              }
              helperText={
                isInvalidEmailAndLinkedIn()
                  ? "Email or LinkedIn URL is required"
                  : ""
              }
            />
          )}
        />
        <Controller
          name={InputNames.address}
          control={control}
          render={({ field }) => (
            <AddressSingleSelect
              className="col-span-2"
              {...field}
              selectedValue={field.value?.addressLine || ""}
              onItemSelect={handleAddressSelect}
              label="Address"
            />
          )}
        />
        <Controller
          name={InputNames.personalWebsiteUrl}
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Personal website URL" />
          )}
        />
        <Controller
          name={InputNames.linkedInUrl}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="LinkedIn URL"
              error={isInvalidEmailAndLinkedIn()}
              helperText={
                isInvalidEmailAndLinkedIn()
                  ? "Email or LinkedIn URL is required"
                  : ""
              }
            />
          )}
        />
        <Divide variant={DivideVariantType.Horizontal} className="col-span-2" />

        <p className="h4 font-semibold col-span-2">Profile picture</p>
        <Controller
          name={InputNames.picture}
          control={control}
          render={() => (
            <FileCacheUpload
              size={imageSettings.maxSizeInKilobytes}
              label="Upload photo"
              changeLabel="Change photo"
              defaultCacheId={defaultCandidatePictureChacheId}
              selectedFile={selectedPicture}
              onDeleteFileCache={deleteCandidatePictureCache}
              onUpdateFileCache={updateCandidatePictureCache}
              onAddFileCache={addCandidatePictureCache}
              onFileCacheUpdated={onCandidatePictureUpload}
              onLoading={onCandidatePictureLoading}
              supportedExtensions={imageSettings.supportedExtensions}
              uploadType={UploadType.Image}
            />
          )}
        />
        <Divide variant={DivideVariantType.Horizontal} className="col-span-2" />

        <p className="h4 font-semibold col-span-2">Terms</p>
        <p className="col-span-2 text-2xs mt-3 -mb-1 text-grey-middle">
          Work type *
        </p>
        <div className="ml-1 col-span-1">
          <Checkbox
            label="Freelance"
            value="Freelance"
            onChange={() =>
              handleWorkTypeChanges(!isFreelance, WorkTypesEnum.Freelance)
            }
            checked={isFreelance}
          />
          <Checkbox
            label="Permanent"
            value="Permanent"
            onChange={() =>
              handleWorkTypeChanges(!isPermanent, WorkTypesEnum.Permanent)
            }
            checked={isPermanent}
          />
        </div>
        <div className="col-span-1" />
        <Controller
          name={InputNames.formats}
          control={control}
          render={({ field }) => (
            <FormControl className="w-full col-span-2">
              <Select multiple label="Format" {...field}>
                {createList(formatTypes, Translates.Classificator.FormatType)}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name={InputNames.startDate}
          render={({ field }) => (
            <FormControl className="w-full">
              <DatePicker label="Start date" {...field} />
            </FormControl>
          )}
        />
        {isFreelance && (
          <Controller
            control={control}
            name={InputNames.endDate}
            render={({ field }) => (
              <FormControl>
                <DatePicker label="End date" {...field} />
              </FormControl>
            )}
          />
        )}
        {!isFreelance && <div className="col-span-1" />}
        <Controller
          name={InputNames.workingHourTypes}
          control={control}
          render={({ field }) => (
            <FormControl>
              <Select label="Working hours" {...field} multiple>
                {createList(
                  workingHourTypes,
                  Translates.Classificator.WorkingHoursType
                )}
              </Select>
            </FormControl>
          )}
        />
        {workingHoursType?.some((x) =>
          [
            WorkingHoursType.PartTime.toString(),
            WorkingHoursType.Project.toString(),
          ].includes(x)
        ) && (
          <Controller
            name={InputNames.weeklyWorkHours}
            control={control}
            render={({ field }) => (
              <TextField {...field} type="number" label="Weekly hours" />
            )}
          />
        )}
        {isFreelance && (
          <>
            <p className="h4 font-semibold col-span-2">Freelance</p>
            <Controller
              control={control}
              name={InputNames.freelanceHourlySalary}
              render={({ field }) => (
                <FormControl>
                  <CurrencySelectWithInput
                    value={{
                      currency: selectedCurrency,
                      ammount: field.value,
                    }}
                    name={{ currency: "currency", ammount: "hour" }}
                    label="Min. per hour"
                    onChange={onCurrencyChange(field)}
                  />
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name={InputNames.freelanceMonthlySalary}
              render={({ field }) => (
                <FormControl>
                  <CurrencySelectWithInput
                    value={{
                      currency: selectedCurrency,
                      ammount: field.value,
                    }}
                    name={{ currency: "currency", ammount: "hour" }}
                    label="Min. per month"
                    onChange={onCurrencyChange(field)}
                  />
                </FormControl>
              )}
            />
          </>
        )}
        {isPermanent && (
          <>
            <p className="h4 font-semibold col-span-2">Permanent</p>
            <Controller
              control={control}
              name={InputNames.permanentMonthlySalary}
              render={({ field }) => (
                <FormControl>
                  <CurrencySelectWithInput
                    value={{
                      currency: selectedCurrency,
                      ammount: field.value,
                    }}
                    name={{ currency: "currency", ammount: "hour" }}
                    label="Min. per month"
                    onChange={onCurrencyChange(field)}
                  />
                </FormControl>
              )}
            />
          </>
        )}
      </div>
    </form>
  );
};

export default CandidateInfoForm;
