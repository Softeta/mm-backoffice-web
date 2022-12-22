export type TCandidateTestsResponse = {
  data: TCandidateTests;
};

export type TCandidateTests = {
  logicalAssessment?: TAssessment<TLogicalScores>;
  personalityAssessment?: TAssessment<TPersonalityScores>;
  papiDynamicWheel?: TRaport;
  papiGeneralFeedback?: TRaport;
  lgiGeneralFeedback?: TRaport;
};

export type TAssessment<T> = {
  packageInstanceId?: string;
  url?: string;
  status?: string;
  scores?: T;
};

export type TLogicalScores = {
  total?: number;
  speed?: number;
  accuracy?: number;
  verbal?: number;
  numerical?: number;
  abstract?: number;
};

export type TPersonalityScores = {
  a1?: number;
  a2?: number;
  w1?: number;
  w2?: number;
  r1?: number;
  r2?: number;
  s1?: number;
  s2?: number;
  y1?: number;
  y2?: number;
  sd?: number;
  aq?: number;
};

export type TRaport = {
  url: string;
};
