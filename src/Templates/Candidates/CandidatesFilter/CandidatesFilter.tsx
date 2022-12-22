import { FormControl, SelectChangeEvent } from "@mui/material";
import { useJobPositions } from "API/Calls/jobPositions";
import CandidatesInputNames, {
  TCandidatesFilterParams,
} from "API/Types/Candidate/candidatesFilterParameters";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import Checkbox from "Components/UI/atoms/Checkbox";
import TextField from "Components/UI/atoms/TextField";
import CurrencySelectWithInput from "Components/UI/molecules/CurrencySelectWithInput";
import { IChange } from "Components/UI/molecules/CurrencySelectWithInput/CurrencySelectWithInput";
import DatePicker from "Components/UI/molecules/DatePicker";
import { ChangeEvent, useEffect, useState } from "react";
import PositionMultiSelect from "Components/Select/PositionSelect/PositionMultiSelect";
import { TPosition } from "API/Types/position";
import SearchField from "Components/UI/atoms/SearchField";
import AddressForSearchSelect from "Components/Select/AddressSelect/AddressForSearchSelect";
import { TLocation } from "API/Types/location";
import { DefaultRadiusInKm } from "Utils/constants";

interface ICandidatesFilter {
  params: TCandidatesFilterParams;
  onApplyFilters: () => void;
  onClearFilter: () => void;
  setParams: (params: TCandidatesFilterParams) => void;
  clearParams: () => void;
}
const {
  Name,
  Positions,
  Location,
  RadiusInKm,
  OpenForOpportunities,
  IsFreelance,
  IsPermanent,
  AvailableFrom,
  HourlyBudgetTo,
  MonthlyBudgetTo,
  Search,
} = CandidatesInputNames;

const CandidatesFilter = ({
  params,
  onApplyFilters,
  onClearFilter,
  setParams,
  clearParams,
}: ICandidatesFilter) => {
  const [resetValues, setResetValues] = useState<boolean>(false);
  const [selectedPositions, setSelectedPositions] = useState<TPosition[]>([]);
  const jobPositions = useJobPositions();

  useEffect(() => {
    if (resetValues) {
      setResetValues(false);
    }
  }, [resetValues]);

  const clearFilter = () => {
    clearParams();
    setSelectedPositions([]);
    setResetValues(true);
    onClearFilter();
  };

  const handleCurrencyChange = (
    ammountInputName:
      | CandidatesInputNames.HourlyBudgetTo
      | CandidatesInputNames.MonthlyBudgetTo
  ): IChange => ({
    currency: (c: SelectChangeEvent<unknown>) => {
      const state = {
        ...params,
        Currency: c.target.value as string | undefined,
      };
      setParams(state);
    },
    ammount: (c: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const state = {
        ...params,
        [ammountInputName]: c.target.value as unknown as number | undefined,
      };
      setParams(state);
    },
  });

  const handleCheckbox = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const { name } = event.target;
    const state = { ...params, [name]: checked };

    const isFreelanceUnchecked = name === IsFreelance && !checked;

    if (isFreelanceUnchecked) {
      state[HourlyBudgetTo] = undefined;
    }

    setParams(state);
  };

  const handleAvailableFrom = (date: Date) => {
    const state = { ...params, [AvailableFrom]: date };
    setParams(state);
  };

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

  const handlePositionsSelect = (positions: TPosition[]) => {
    const state = {
      ...params,
      [Positions]: positions.map((position) => position.id),
    };
    setParams(state);
    setSelectedPositions(positions || []);
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

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const state = {
      ...params,
      [Search]: event.target.value,
    };
    setParams(state);
  };

  useEffect(() => {
    const selectedIds = params.Positions ?? [];
    if (selectedIds.length > 0) {
      if (!jobPositions.data) return;

      const filtered = jobPositions.data.data.data.filter((position) =>
        selectedIds.some((id) => position.id === id)
      );

      setSelectedPositions(filtered);
    }
  }, [params.Positions, jobPositions.data]);

  useEffect(() => {
    const selectedIds = params.Positions ?? [];
    if (selectedIds.length === 0 && selectedPositions.length !== 0) {
      setSelectedPositions([]);
    }
  }, [params.Positions, selectedPositions.length]);

  if (!jobPositions) return null;

  return (
    <div>
      <form className="flex flex-col">
        <SearchField
          className="pb-3.5"
          label="Search"
          value={params.Search}
          onChange={handleSearchChange}
        />
        <p className="text-xs pb-3.5">Filter</p>
        <TextField
          className="pb-3.5"
          label="Name"
          name={Name}
          value={params.Name ?? ""}
          onChange={(e) => handleTextFieldChange(e)}
        />
        <FormControl>
          <PositionMultiSelect
            className="pb-3.5"
            selected={selectedPositions}
            onSelectedChange={handlePositionsSelect}
          />
        </FormControl>

        <AddressForSearchSelect
          onItemSelect={handleSelectedLocation}
          className="pb-3.5"
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
        <Checkbox
          className="pb-3.5 pl-1"
          label="Open for opportunities"
          onChange={handleCheckbox}
          name={OpenForOpportunities}
          checked={!!params.OpenForOpportunities}
        />
        <p className="text-xs">Type</p>
        <Checkbox
          className="pl-1"
          label="Freelance"
          name={IsFreelance}
          onChange={handleCheckbox}
          checked={!!params.IsFreelance}
        />
        <Checkbox
          className="pl-1 pb-3.5"
          label="Permanent"
          name={IsPermanent}
          onChange={handleCheckbox}
          checked={!!params.IsPermanent}
        />

        <div className="pb-3.5">
          <DatePicker
            className="w-40"
            label="Available from"
            value={params.AvailableFrom}
            onChange={(date) => handleAvailableFrom(date as Date)}
          />
        </div>
        <CurrencySelectWithInput
          className="pb-3.5"
          value={{
            currency: params.Currency ?? "",
            ammount: params.MonthlyBudgetTo,
          }}
          name={{ currency: "currency", ammount: "ammount" }}
          label="Monthly budget to"
          onChange={handleCurrencyChange(MonthlyBudgetTo)}
        />
        {params.IsFreelance && (
          <CurrencySelectWithInput
            className="pb-3.5"
            value={{
              currency: params.Currency ?? "",
              ammount: params.HourlyBudgetTo,
            }}
            name={{ currency: "currency", ammount: "ammount" }}
            label="Hourly budget to"
            onChange={handleCurrencyChange(HourlyBudgetTo)}
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

export default CandidatesFilter;
