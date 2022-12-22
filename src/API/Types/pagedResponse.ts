export type TPagedResponse<T> = {
  count: number;
  data: T[];
  currentPage: number;
  pageSize: number;
  nextPagePath?: string;
  previousPagePath?: string;
};
