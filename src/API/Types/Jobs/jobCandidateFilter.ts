export type TJobCandidateFilter = {
  title: string;
  filterParams: string;
  index: number;
};

export type TJobCandidateFilterRequest = {
  title: string;
  filterParams: string;
  index: number;
};

export type TJobCandidateFilterTitleRequest = {
  title: string;
};

export type TJobCandidateFiltersResponse = {
  data: TJobCandidateFilter[];
};

export type TJobCandidateFilterResponse = {
  data: TJobCandidateFilter;
};
