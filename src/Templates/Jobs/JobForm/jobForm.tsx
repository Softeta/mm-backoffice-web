import FormControl from "@mui/material/FormControl";
import { useJobPositions } from "API/Calls/jobPositions";
import { useSkills } from "API/Calls/skills";
import { SelectChangeEvent } from "@mui/material/Select";
import { TLanguage } from "API/Types/languages";
import MenuItem from "Components/UI/atoms/MenuItem";
import getDateWithoutTime from "Helpers/getDateWithoutTime";
import Switch from "Components/UI/atoms/Switch";
import Select from "Components/UI/atoms/Select";
import TextField from "Components/UI/atoms/TextField";
import CurrencySelectWithInput from "Components/UI/molecules/CurrencySelectWithInput";
import DatePicker from "Components/UI/molecules/DatePicker";
import BackOfficeUsersContext from "Contexts/BackOfficeUsers/BackOfficeUsersContext";
import { ClassificatorsContext } from "Contexts/Classificators/ClassificatorsContext";
import { ChangeEvent, ReactNode, useContext, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { IChange } from "Components/UI/molecules/CurrencySelectWithInput/CurrencySelectWithInput";
import WorkingHoursType from "Enums/workingHoursType";
import Checkbox from "Components/UI/atoms/Checkbox";
import WorkTypes from "Enums/workType";
import SkillSelect from "Components/Select/SkillSelect";
import UserSingleSelect from "Components/Select/UserSelect/UserSingleSelect";
import IndustrySelect from "Components/Select/IndustrySelect";
import { useTranslation } from "react-i18next";
import Translates from "locales/translates/translates";
import PositionSingleSelect from "Components/Select/PositionSelect/PositionSingleSelect";
import { TPosition } from "API/Types/position";
import { TSkill } from "API/Types/skills";
import { TIndustry } from "API/Types/industries";
import UserMultiSelect from "Components/Select/UserSelect/UserMultiSelect";
import { TBackOfficeUser } from "API/Types/backOfficeUsers";
import LanguagesSelect from "Components/Select/LanguagesSelect";
import IJobForm from "./IJobForm";
import InputNames from "./inputNames";

interface IProps {
  form: UseFormReturn<IJobForm, any>;
  location: string;
  disabled?: boolean;
}

export const JobForm = ({ form, location, disabled }: IProps) => {
  const { t } = useTranslation();
  const [isStartDateDisabled, setIsStartDateDisabled] = useState<boolean>(
    form.getValues().isUrgent
  );
  const [isFreelance, setIsFreelance] = useState(
    form.getValues().workTypes.includes(WorkTypes.Freelance)
  );
  const [isPermanent, setIsPermanent] = useState(
    form.getValues().workTypes.includes(WorkTypes.Permanent)
  );

  const users = useContext(BackOfficeUsersContext);
  const { seniorityLevels, workingHourTypes, formatTypes } = useContext(
    ClassificatorsContext
  );

  const positionsQuery = useJobPositions();
  const skillsQuery = useSkills();

  const createList = (
    iter: string[] = [],
    translationPrefix: string | undefined = undefined
  ): ReactNode =>
    iter.map((value: string) => (
      <MenuItem key={value} value={value}>
        {translationPrefix ? t(`${translationPrefix}.${value}`) : value}
      </MenuItem>
    ));

  const handlePositionChange = (value: TPosition | null) => {
    if (value) {
      form.setValue("position", value);
      form.clearErrors(InputNames.position);
    }
  };

  const handleLanguagesChange = (value: TLanguage[]) => {
    form.setValue("languages", value);
  };

  const handleIsUrgentChange = (check: boolean) => {
    if (check) {
      form.setValue("startDate", getDateWithoutTime(new Date()));
    }
    form.setValue("isUrgent", check);
    setIsStartDateDisabled(check);
  };
  const handleWorkTypeChanges = (
    check: boolean,
    workType: WorkTypes.Freelance | WorkTypes.Permanent
  ) => {
    const { workTypes } = form.getValues();

    if (!check && workTypes.length === 1) return;

    form.setValue(
      "workTypes",
      check ? [...workTypes, workType] : workTypes.filter((x) => x !== workType)
    );

    switch (workType) {
      case WorkTypes.Freelance:
        setIsFreelance(check);
        break;
      case WorkTypes.Permanent:
        setIsPermanent(check);
        break;
      default:
        break;
    }
  };

  const handleIsPriority = (value: boolean) => {
    form.setValue("isPriority", value);
  };

  const handleAssignedEmployeeSelect = (employees: TBackOfficeUser[] = []) => {
    form.setValue("assignedEmployees", employees);
  };

  const handleJobOwnerSelectChange = (value?: string) => {
    if (value) {
      form.setValue("ownerId", value);
      form.clearErrors(InputNames.ownerId);
    } else {
      form.setValue("ownerId", "");
    }
  };

  const handleSkillsChange = (value: TSkill[]) => {
    form.setValue("skills", value);
  };

  const handleIndustriesChange = (value: TIndustry[]) => {
    form.setValue("industries", value);
  };

  const handleCurrencyChange = (field: Record<string, any>): IChange => ({
    currency: (c: SelectChangeEvent<unknown>) => {
      form.setValue("currency", c.target.value as string);
    },
    ammount: (c: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!c.target.value) {
        form.setValue(field.name, undefined);
      } else {
        field.onChange(c);
      }
    },
  });

  const handleWorkingHourTypesChange = () => {
    const isPartTimeSelected = form
      .getValues()
      .workingHourTypes.includes(WorkingHoursType.PartTime);

    if (!isPartTimeSelected) {
      form.setValue("weeklyWorkHours", undefined);
    }
  };

  const handleInputChange = (
    field: Record<string, any>,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!event.target.value) {
      form.setValue(field.name, undefined);
    } else {
      field.onChange(event);
    }
  };

  const handleDateChange = (
    newValue: Date | unknown,
    inputName:
      | InputNames.startDate
      | InputNames.endDate
      | InputNames.deadLineDate
  ) => {
    const newDate =
      newValue instanceof Date ? getDateWithoutTime(newValue) : undefined;
    switch (inputName) {
      case InputNames.startDate:
        form.setValue("startDate", newDate);
        break;
      case InputNames.endDate:
        form.setValue("endDate", newDate);
        break;
      case InputNames.deadLineDate:
        form.setValue("deadLineDate", newDate);
        break;
      default:
        break;
    }
  };

  const selectedCurrency = form.watch(InputNames.currency);

  form.watch(InputNames.workingHourTypes);
  form.watch(InputNames.isUrgent);

  if (positionsQuery.isLoading || positionsQuery.isError) return null;
  if (skillsQuery.isLoading || skillsQuery.isError) return null;

  const salaryInput = (
    ammountName: string,
    label: string,
    fieldInputName:
      | InputNames.freelanceHourlyBudgetFrom
      | InputNames.freelanceHourlyBudgetTo
      | InputNames.freelanceMonthlyBudgetFrom
      | InputNames.freelanceMonthlyBudgetTo
      | InputNames.permanentMonthlyBudgetFrom
      | InputNames.permanentMonthlyBudgetTo,
    currency: string
  ): ReactNode => (
    <Controller
      control={form.control}
      name={fieldInputName}
      render={({ field }) => (
        <FormControl>
          <CurrencySelectWithInput
            disabled={disabled}
            value={{
              currency,
              ammount: field.value,
            }}
            name={{ currency: "currency", ammount: ammountName }}
            label={label}
            onChange={handleCurrencyChange(field)}
          />
        </FormControl>
      )}
    />
  );

  return (
    <>
      <div className="col-span-2">
        <Controller
          name={InputNames.isPriority}
          control={form.control}
          render={({ field }) => (
            <Switch
              className="ml-auto mr-10 self-center"
              checked={field.value}
              disabled={disabled}
              text="Job priority"
              onChange={(_, checked) => handleIsPriority(checked)}
            />
          )}
        />
      </div>
      <input type="hidden" {...form.register(InputNames.currency)} />
      <Controller
        control={form.control}
        name={InputNames.position}
        render={({ field: { value, ...rest }, fieldState: { error } }) => (
          <PositionSingleSelect
            disabled={disabled}
            {...rest}
            selectedItem={value}
            required
            error={!!error}
            helperText={error?.message}
            onItemSelect={handlePositionChange}
          />
        )}
      />
      <p className="col-span-2 text-xs mt-3 -mb-1">Work type *</p>
      <div className="ml-1 col-span-2">
        <Checkbox
          label="Freelance"
          value={InputNames.freelance}
          onChange={() =>
            handleWorkTypeChanges(
              !form.getValues().workTypes.includes(WorkTypes.Freelance),
              WorkTypes.Freelance
            )
          }
          checked={isFreelance}
          disabled={disabled}
        />
        <Checkbox
          label="Permanent"
          value={InputNames.permanent}
          onChange={() =>
            handleWorkTypeChanges(
              !form.getValues().workTypes.includes(WorkTypes.Permanent),
              WorkTypes.Permanent
            )
          }
          checked={isPermanent}
          disabled={disabled}
        />
      </div>
      <Controller
        name={InputNames.ownerId}
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <UserSingleSelect
            {...field}
            required
            disabled={disabled}
            onSelect={handleJobOwnerSelectChange}
            label="Job owner"
            selectedPersonId={field.value}
            persons={users.map((user) => ({
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              pictureUri: user.pictureUri,
            }))}
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <UserMultiSelect
        label="Assigned to"
        disabled={disabled}
        selectedItems={form.getValues().assignedEmployees as TBackOfficeUser[]}
        onItemsSelect={handleAssignedEmployeeSelect}
      />

      <Controller
        name={InputNames.skills}
        control={form.control}
        render={({ field }) => (
          <div className="col-span-2">
            <SkillSelect
              disabled={disabled}
              {...field}
              selected={form.getValues().skills}
              onSelectedChange={handleSkillsChange}
              jobPosition={form.getValues().position}
            />
          </div>
        )}
      />
      <div className="col-span-2 grid grid-cols-4 gap-4">
        <p className="col-start-1 col-span-2 text-xs mt-3 -mb-1">Seniority</p>
        <div className="col-start-1 col-span-2 grid grid-cols-1 gap-4">
          <Controller
            name={InputNames.seniorities}
            control={form.control}
            render={({ field }) => (
              <FormControl>
                <Select disabled={disabled} label="Level" {...field} multiple>
                  {createList(
                    seniorityLevels,
                    Translates.Classificator.SeniorityLevel
                  )}
                </Select>
              </FormControl>
            )}
          />
        </div>
        <p className="col-start-3 col-span-2 row-start-1 text-xs mt-3 -mb-1">
          Experience
        </p>
        <div className="col-start-3 col-span-2 row-start-2 grid grid-cols-2 gap-4">
          <Controller
            control={form.control}
            name={InputNames.yearExperienceFrom}
            render={({ field }) => (
              <FormControl>
                <TextField
                  type="number"
                  disabled={disabled}
                  label="From"
                  {...field}
                  onChange={(event) => handleInputChange(field, event)}
                />
              </FormControl>
            )}
          />
          <Controller
            control={form.control}
            name={InputNames.yearExperienceTo}
            render={({ field }) => (
              <FormControl>
                <TextField
                  type="number"
                  disabled={disabled}
                  label="To"
                  {...field}
                  onChange={(event) => handleInputChange(field, event)}
                />
              </FormControl>
            )}
          />
        </div>
      </div>
      <Controller
        name={InputNames.workingHourTypes}
        control={form.control}
        render={({ field }) => (
          <FormControl>
            <Select
              disabled={disabled}
              label="Working hours"
              {...field}
              multiple
              onClose={handleWorkingHourTypesChange}
            >
              {createList(
                workingHourTypes,
                Translates.Classificator.WorkingHoursType
              )}
            </Select>
          </FormControl>
        )}
      />
      <div>
        {form.getValues().workingHourTypes &&
          form
            .getValues()
            .workingHourTypes.find(
              (type: string) =>
                type === WorkingHoursType.PartTime ||
                type === WorkingHoursType.Project
            ) && (
            <Controller
              name={InputNames.weeklyWorkHours}
              control={form.control}
              render={({ field }) => (
                <TextField
                  disabled={disabled}
                  label="Weekly hours"
                  {...field}
                  type="number"
                  onChange={(event) => handleInputChange(field, event)}
                />
              )}
            />
          )}
      </div>
      {isFreelance && (
        <Controller
          name={InputNames.freelanceHoursPerProject}
          control={form.control}
          render={({ field }) => (
            <TextField
              disabled={disabled}
              label="Hours per project"
              {...field}
              type="number"
              onChange={(event) => handleInputChange(field, event)}
            />
          )}
        />
      )}
      <div />
      {isFreelance && (
        <>
          <p className="col-span-2 mt-3 h4 font-semibold mb-2">Freelance</p>
          <div className="col-span-2 grid grid-cols-4 gap-4">
            <p className="col-start-1 col-span-2 text-xs mt-3 -mb-1">
              Salary budget per hour
            </p>
            <div className="col-start-1 col-span-2 grid grid-cols-2 gap-4">
              {salaryInput(
                "from",
                "From",
                InputNames.freelanceHourlyBudgetFrom,
                selectedCurrency
              )}
              {salaryInput(
                "to",
                "To",
                InputNames.freelanceHourlyBudgetTo,
                selectedCurrency
              )}
            </div>
            <p className="col-start-3 col-span-2 row-start-1 text-xs mt-3 -mb-1">
              Salary budget per month
            </p>
            <div className="col-start-3 col-span-2 row-start-2 grid grid-cols-2 gap-4">
              {salaryInput(
                "from",
                "From",
                InputNames.freelanceMonthlyBudgetFrom,
                selectedCurrency
              )}
              {salaryInput(
                "to",
                "To",
                InputNames.freelanceMonthlyBudgetTo,
                selectedCurrency
              )}
            </div>
          </div>
        </>
      )}
      {isPermanent && (
        <>
          <p className="col-span-2 mt-3 h4 font-semibold mb-2">Permanent</p>
          <div className="col-span-2 grid grid-cols-4 gap-4">
            <p className="col-start-1 col-span-2 text-xs -mb-1">
              Salary budget per month
            </p>
            <div className="col-span-2 row-start-2 grid grid-cols-2 gap-4">
              {salaryInput(
                "from",
                "From",
                InputNames.permanentMonthlyBudgetFrom,
                selectedCurrency
              )}
              {salaryInput(
                "to",
                "To",
                InputNames.permanentMonthlyBudgetTo,
                selectedCurrency
              )}
            </div>
          </div>
        </>
      )}
      <div className="ml-1 col-span-2">
        <Checkbox
          label="As soon as possible"
          disabled={disabled}
          value={InputNames.isUrgent}
          onChange={(_, checked) => handleIsUrgentChange(checked)}
          checked={form.getValues().isUrgent}
        />
      </div>
      <Controller
        control={form.control}
        name={InputNames.startDate}
        render={({ field }) => (
          <FormControl>
            <DatePicker
              disabled={disabled || isStartDateDisabled}
              label="Start date for hired person"
              {...field}
              onChange={(newValue) =>
                handleDateChange(newValue, InputNames.startDate)
              }
            />
          </FormControl>
        )}
      />
      <Controller
        control={form.control}
        name={InputNames.endDate}
        render={({ field }) => (
          <FormControl>
            <DatePicker
              disabled={disabled}
              label="End date for hired person"
              {...field}
              onChange={(newValue) =>
                handleDateChange(newValue, InputNames.endDate)
              }
            />
          </FormControl>
        )}
      />
      <Controller
        name={InputNames.industries}
        control={form.control}
        render={({ field }) => (
          <div className="col-span-2">
            <IndustrySelect
              disabled={disabled}
              {...field}
              selected={form.getValues().industries}
              onSelectedChange={handleIndustriesChange}
            />
          </div>
        )}
      />
      <Controller
        name={InputNames.formats}
        control={form.control}
        render={({ field }) => (
          <FormControl>
            <Select disabled={disabled} multiple label="Format" {...field}>
              {createList(formatTypes, Translates.Classificator.FormatType)}
            </Select>
          </FormControl>
        )}
      />
      <TextField disabled value={location} />
      <Controller
        control={form.control}
        name={InputNames.languages}
        render={({ field }) => (
          <LanguagesSelect
            {...field}
            className="col-span-2"
            disabled={disabled}
            selected={form.getValues().languages}
            onSelectedChange={handleLanguagesChange}
          />
        )}
      />
      <p className="col-span-2 mt-3 h4 font-semibold mb-2">Timings</p>
      <Controller
        control={form.control}
        name={InputNames.deadLineDate}
        render={({ field }) => (
          <FormControl>
            <DatePicker
              disabled={disabled}
              label="Deadline for shortlist presentation"
              {...field}
              onChange={(newValue) =>
                handleDateChange(newValue, InputNames.deadLineDate)
              }
            />
          </FormControl>
        )}
      />
      <Controller
        control={form.control}
        name={InputNames.description}
        render={({ field }) => (
          <FormControl className="col-span-2">
            <TextField
              disabled={disabled}
              multiline
              label="Job description"
              {...field}
              minRows={3}
            />
          </FormControl>
        )}
      />
    </>
  );
};

export default JobForm;
