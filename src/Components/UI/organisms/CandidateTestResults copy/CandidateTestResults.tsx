import { CircularProgress } from "@mui/material";
import { TCandidateTestsResponse } from "API/Types/Candidate/candidateTestsGet";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import { Chart } from "Components/UI/atoms/Chart";
import { InfoContainer } from "Components/UI/atoms/InfoContainer";
import { PapiWheel } from "Components/UI/atoms/PapiWheel";
import { TGradeScore } from "Components/UI/molecules/GradeScore/GradeScore";
import { PapiGradeTable } from "../PapiGradeTable";

type TProps = {
  data?: TCandidateTestsResponse;
  isLoading: boolean;
};

type TGradeScoreType = TGradeScore | undefined;

export const CandidateTestResults = ({ data, isLoading }: TProps) => {
  const papiScores = data?.data.personalityAssessment?.scores;
  const logicalScores = data?.data.logicalAssessment?.scores;

  const openReport = (url?: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <div className="grid overflow-auto">
          <InfoContainer>
            <div className="flex flex-wrap justify-center gap-2 pb-4">
              {data?.data.papiDynamicWheel?.url && (
                <Button
                  label="Fetch PAPI-N profile (HTML)"
                  variant={ButtonVariantType.Contained}
                  onClick={() => openReport(data?.data.papiDynamicWheel?.url)}
                />
              )}
              {data?.data.papiGeneralFeedback?.url && (
                <Button
                  label="Fetch PAPI-N Feedback report (PDF)"
                  variant={ButtonVariantType.Contained}
                  onClick={() =>
                    openReport(data?.data.papiGeneralFeedback?.url)
                  }
                />
              )}
              {data?.data.lgiGeneralFeedback?.url && (
                <Button
                  label="Fetch LGI Feedback report (PDF)"
                  variant={ButtonVariantType.Contained}
                  onClick={() => openReport(data?.data.lgiGeneralFeedback?.url)}
                />
              )}
            </div>
            {data?.data.papiDynamicWheel?.url && (
              <PapiWheel htmlUrl={data?.data.papiDynamicWheel?.url} />
            )}
          </InfoContainer>
          {papiScores && (
            <PapiGradeTable
              grades={{
                a1: papiScores?.a1 as TGradeScoreType,
                a2: papiScores?.a2 as TGradeScoreType,
                w1: papiScores?.w1 as TGradeScoreType,
                w2: papiScores?.w2 as TGradeScoreType,
                r1: papiScores?.r1 as TGradeScoreType,
                r2: papiScores?.r2 as TGradeScoreType,
                s1: papiScores?.s1 as TGradeScoreType,
                s2: papiScores?.s2 as TGradeScoreType,
                y1: papiScores?.y1 as TGradeScoreType,
                y2: papiScores?.y2 as TGradeScoreType,
                sd: papiScores?.sd as TGradeScoreType,
                aq: papiScores?.aq as TGradeScoreType,
              }}
            />
          )}
          {logicalScores && (
            <>
              <InfoContainer label="Cognitive capacity - overall">
                <div className="grid gap-16">
                  This report is based on the responses given by Inga Testing
                  cubics to the PAPI 3 N SL questionnaire. The questionnaire
                  asked him to describe his typical preferences and behaviour in
                  a working environment. He was presented with a series of
                  statements for which he indicated on a seven-point scale the
                  degree to which the statement described him (ranging from
                  Strongly Disagree to Strongly Agree)
                  <div className="grid justify-items-center">
                    <div className="grid grid-cols-2 gap-20 md:grid-cols-3">
                      <Chart
                        label="Speed"
                        progressPercentage={logicalScores?.speed}
                      />
                      <Chart
                        label="Overall score"
                        progressPercentage={logicalScores?.total}
                      />
                      <Chart
                        label="Accuracy"
                        progressPercentage={logicalScores?.accuracy}
                      />
                    </div>
                  </div>
                </div>
              </InfoContainer>
              <InfoContainer label="Cognitive capacity - elaborated">
                <div className="grid gap-16">
                  It is important to note that the results described here are
                  based solely on the responses Inga Testing cubics gave to the
                  questionnaire. The responses given therefore represent how
                  Inga Testing cubics sees his own behaviour, rather than how
                  others might describe him. The accuracy of the report will
                  depend on the honesty and frankness with which he completed
                  the questionnaire, along with his level of self-awareness. The
                  descriptions of his personality presented here should be taken
                  as hypotheses rather than concrete facts. However, the results
                  from this questionnaire should provide useful indicators of
                  the way that Inga Testing cubics is likely to behave at work
                  and in different situations.
                  <div className="grid justify-items-center">
                    <div className="grid grid-cols-2 gap-20 md:grid-cols-3">
                      <Chart
                        label="Verbal"
                        progressPercentage={logicalScores?.verbal}
                      />
                      <Chart
                        label="Numerical"
                        progressPercentage={logicalScores?.numerical}
                      />
                      <Chart
                        label="Abstract"
                        progressPercentage={logicalScores?.abstract}
                      />
                    </div>
                  </div>
                </div>
              </InfoContainer>
            </>
          )}
        </div>
      )}
    </>
  );
};
