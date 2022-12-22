import { TPosition } from "API/Types/position";
import { TOption } from "Components/UI/molecules/Autocomplete/Autocomplete";

export const positionsToOptions = (positions: TPosition[]): TOption[] =>
  positions.map((position) => ({
    id: position.id,
    label: position.code,
  }));

export const optionsToPositions = (options: TOption[]): TPosition[] =>
  options.map((option) => ({
    id: option.id!,
    code: option.label,
  }));

export const optionToPosition = (option: TOption): TPosition => ({
  id: option.id!,
  code: option.label,
});

export const positionToOption = (position: TPosition): TOption => ({
  id: position.id,
  label: position.code,
});
