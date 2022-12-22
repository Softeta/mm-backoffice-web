import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FormControl, FormGroup } from "@mui/material";
import DatePicker from "Components/UI/molecules/DatePicker";
import DropDown from "Components/UI/organisms/DropDown";
import Checkbox from "Components/UI/atoms/Checkbox";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import UserSingleSelect from "Components/Select/UserSelect/UserSingleSelect";
import Button from "Components/UI/atoms/Button";
import { TClassificators } from "API/Types/classificators";
import { ClassificatorsContext } from "Contexts/Classificators/ClassificatorsContext";
import BackOfficeUsersContext from "Contexts/BackOfficeUsers/BackOfficeUsersContext";
import { TBackOfficeUser } from "API/Types/backOfficeUsers";
import PositionMultiSelect from "Components/Select/PositionSelect/PositionMultiSelect";
import { useTranslation } from "react-i18next";
import JobFilterInputNames, {
  defaultFilters,
  TJobFilterParams,
} from "API/Types/Jobs/jobFilterParameters";
import Translates from "locales/translates/translates";
import CompanyMultiSelect from "Components/Select/CompanySelect/CompanyMultiSelect";
import UserMultiSelect from "Components/Select/UserSelect/UserMultiSelect";
import { TPosition } from "API/Types/position";
import { TLocation } from "API/Types/location";
import { TCompanyBrief } from "API/Types/Companies/companyBriefGet";
import SearchField from "Components/UI/atoms/SearchField";
import AddressForSearchSelect from "Components/Select/AddressSelect/AddressForSearchSelect";
import { DefaultRadiusInKm } from "Utils/constants";
import TextField from "Components/UI/atoms/TextField";
import { activeJobStages } from "./insertActiveJobStages";
import { stringsToSItems } from "./helpers";

interface IJobsFilter {
  params: TJobFilterParams;
  fields: string[];
  setParams: (params: TJobFilterParams) => void;
  onApplyFilters: () => void;
  onClearFilter: () => void;
  activeStages?: boolean;
}

const {
  Companies,
  Positions,
  DeadLineDate,
  WorkTypes,
  JobStages,
  Location,
  RadiusInKm,
  Owner,
  AssignedEmployees,
  Search,
} = JobFilterInputNames;

const JobsFilter = ({
  params,
  fields,
  setParams,
  onApplyFilters,
  onClearFilter,
  activeStages,
}: IJobsFilter) => {
  const { t } = useTranslation();
  const { workTypes, jobStages } = useContext<TClassificators>(
    ClassificatorsContext
  );
  const backOfficeUsers = useContext<TBackOfficeUser[]>(BackOfficeUsersContext);

  const [resetValues, setResetValues] = useState<boolean>(false);
  const [selectedCompanies, setSelectedCompanies] = useState<TCompanyBrief[]>(
    []
  );
  const [selectedPositions, setSelectedPositions] = useState<TPosition[]>([]);
  const [selectedAssignedEmployees, setSelectedAssignedEmployees] = useState<
    TBackOfficeUser[]
  >([]);

  const handleTextFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.value.trim()) {
      const state = { ...params, [event.target.name]: event.target.value };
      setParams(state);
    } else {
      const state = { ...params, [event.target.name]: undefined };
      setParams(state);
    }
  };

  const handleDropDownChange = (key: string, values: string[]) => {
    const state = { ...params, [key]: values };
    setParams(state);
  };

  const handleAssignedEmployeeSelect = (employees?: TBackOfficeUser[]) => {
    const state = {
      ...params,
      [AssignedEmployees]: employees?.map((employee) => employee.id),
    };

    setSelectedAssignedEmployees(employees || []);
    setParams(state);
  };

  const handlePositionsSelect = (positions: TPosition[]) => {
    const state = {
      ...params,
      [Positions]: positions.map((position) => position.id),
    };
    setParams(state);
    setSelectedPositions(positions || []);
  };

  const handleCompanySelect = (companies?: TCompanyBrief[]) => {
    const state = {
      ...params,
      [Companies]: companies?.map((company) => company.id!),
    };
    setParams(state);
    setSelectedCompanies(companies || []);
  };

  const handleDeadline = (date: Date) => {
    const state = { ...params, [DeadLineDate]: date };
    setParams(state);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    const state = { ...params, [Search]: search };
    setParams(state);
  };

  const handleSelectOwnerChange = (ownerId?: string) => {
    const state = { ...params, [Owner]: ownerId };
    setParams(state);
  };

  const handleSelectedLocation = (location?: TLocation) => {
    const state = {
      ...params,
      [Location]: location
        ? {
            latitude: location?.latitude,
            longitude: location?.longitude,
            addressLine: location?.addressLine,
          }
        : undefined,
      [RadiusInKm]:
        location && !params.RadiusInKm ? DefaultRadiusInKm : params.RadiusInKm,
    };
    setParams(state);
  };

  const handleCheckbox = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const { value } = event.target;
    let newWorkTypes: string[] = [];

    if (checked) {
      newWorkTypes = params.WorkTypes?.concat(value) || [value];
    } else {
      newWorkTypes = params.WorkTypes?.filter((x) => x !== value) || [];
    }

    const state = { ...params, [WorkTypes]: newWorkTypes };
    setParams(state);
  };

  const clearFilter = () => {
    setParams(defaultFilters);
    setSelectedPositions([]);
    setSelectedCompanies([]);
    setSelectedAssignedEmployees([]);
    setResetValues(true);
    onClearFilter();
  };

  const shouldShowComponent = (field: string): boolean =>
    fields.some((x) => x === field);

  useEffect(() => {
    if (resetValues) {
      setResetValues(false);
    }
  }, [resetValues]);

  return (
    <div>
      <form className="flex flex-col">
        <FormControl>
          <SearchField
            className="pb-3.5"
            label="Search"
            value={params.Search}
            onChange={handleSearch}
          />
        </FormControl>

        <p className="text-xs pb-3.5">Filter</p>

        {shouldShowComponent(Companies) && (
          <CompanyMultiSelect
            className="pb-3.5"
            label="Company"
            selectedItems={selectedCompanies}
            onItemsSelect={handleCompanySelect}
          />
        )}

        {shouldShowComponent(Positions) && (
          <FormControl>
            <PositionMultiSelect
              className="pb-3.5"
              selected={selectedPositions}
              onSelectedChange={handlePositionsSelect}
            />
          </FormControl>
        )}

        {shouldShowComponent(DeadLineDate) && (
          <FormControl className="pb-3.5">
            <DatePicker
              className="w-40"
              label="Deadline before"
              value={params.DeadLineDate}
              onChange={(date) => handleDeadline(date as Date)}
            />
          </FormControl>
        )}

        {shouldShowComponent(WorkTypes) && (
          <>
            <p className="text-xs pb-3.5">Type</p>
            <FormGroup className="pb-3.5">
              {workTypes &&
                workTypes.map((x) => (
                  <Checkbox
                    key={x}
                    label={t(`${Translates.Classificator.WorkType}.${x}`)}
                    value={x}
                    onChange={handleCheckbox}
                    checked={!!params.WorkTypes?.some((w) => w === x)}
                  />
                ))}
            </FormGroup>
          </>
        )}

        {shouldShowComponent(JobStages) && (
          <DropDown
            className="pb-3.5"
            label="Job stage"
            itemName="job stages"
            resetValues={resetValues}
            dataSource={stringsToSItems(
              activeStages ? activeJobStages : jobStages,
              Translates.Classificator.JobStage,
              t
            )}
            selected={params.JobStages}
            onConfirmedSelections={(values) =>
              handleDropDownChange(JobStages, values)
            }
          />
        )}

        {shouldShowComponent(Location) && (
          <>
            <AddressForSearchSelect
              className="pb-3.5"
              onItemSelect={handleSelectedLocation}
              label="Location"
              selectedValue={params.Location?.addressLine}
            />
            {params.Location && (
              <TextField
                type="number"
                label="Radius in kilometers"
                className="pb-3.5"
                name={RadiusInKm}
                value={params.RadiusInKm ?? ""}
                onChange={(e) => handleTextFieldChange(e)}
              />
            )}
          </>
        )}

        {shouldShowComponent(Owner) && (
          <UserSingleSelect
            className="pb-3.5"
            onSelect={handleSelectOwnerChange}
            label="Job owner"
            selectedPersonId={params.Owner}
            persons={backOfficeUsers.map((user) => ({
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              pictureUri: user.pictureUri,
            }))}
          />
        )}

        {shouldShowComponent(AssignedEmployees) && (
          <UserMultiSelect
            className="pb-3.5"
            label="Assigned to"
            selectedItems={selectedAssignedEmployees}
            onItemsSelect={handleAssignedEmployeeSelect}
          />
        )}

        <div className="pb-4 flex justify-between">
          <Button
            variant={ButtonVariantType.Text}
            onClick={clearFilter}
            label="Clear filter"
          />
          <Button
            variant={ButtonVariantType.Contained}
            onClick={onApplyFilters}
            label="Apply filter"
          />
        </div>
      </form>
    </div>
  );
};
export default JobsFilter;
