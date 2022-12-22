export enum SuggestedProfilesParamKeys {
  Position = "Position",
  Skills = "Skills",
  Seniorities = "Seniorities",
  WorkTypes = "WorkTypes",
  WorkingHourTypes = "WorkingHourTypes",
  WorkingFormats = "WorkingFormats",
  Industries = "Industries",
  Languages = "Languages",
  Location = "Location",
}

const {
  Position,
  Skills,
  Seniorities,
  WorkTypes,
  WorkingHourTypes,
  WorkingFormats,
  Industries,
  Languages,
  Location,
} = SuggestedProfilesParamKeys;

export type TJobSuggestedProfilesParams = {
  [Position]: string;
  [Location]: string;
  [WorkTypes]: string[];
  [Skills]?: string[];
  [Seniorities]?: string[];
  [WorkingHourTypes]?: string[];
  [WorkingFormats]?: string[];
  [Industries]?: string[];
  [Languages]?: string[];
};
