export type TCandidateRanking = {
  id: string;
  ranking: number;
};

export type TUpdateCandidatesRankingRequest = {
  candidatesRanking?: TCandidateRanking[];
};
