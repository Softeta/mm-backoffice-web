import IJobForm from "Templates/Jobs/JobForm/IJobForm";

export type TJobSuggestedCandidatesRequest = {
  jobId?: string;
  position?: string;
  location?: string;
  skills?: string[];
  seniorities?: string[];
  workTypes?: string[];
  workingHourTypes?: string[];
  workingFormats?: string[];
  industries?: string[];
  languages?: string[];
};

export const GetJobSugestedCandidatesRequestFromForm = (
  formData: IJobForm,
  location: string,
  jobId?: string
) => ({
  jobId,
  position: formData?.position?.code,
  location,
  skills: formData.skills?.map((x) => x.code),
  seniorities: formData.seniorities,
  workTypes: formData.workTypes,
  workingHourTypes: formData.workingHourTypes,
  industries: formData.industries?.map((x) => x.code),
  languages: formData.languages?.map((x) => x.code),
});
