import JobStages from "Enums/JobStages";

export type TJobStageResponse = {
  data: TJobStage;
};

export type TJobStage = {
  jobStage: JobStages;
};
