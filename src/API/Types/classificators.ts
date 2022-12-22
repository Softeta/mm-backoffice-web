export type TClassificatorsResponse = {
  data: TClassificators;
};

export type TClassificators = {
  workTypes: string[];
  formatTypes: string[];
  seniorityLevels: string[];
  workingHourTypes: string[];
  jobStages: string[];
};
