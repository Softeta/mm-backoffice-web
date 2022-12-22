import { InfoContainer } from "Components/UI/atoms/InfoContainer";
import { TGradeScore } from "Components/UI/molecules/GradeScore/GradeScore";
import { GradeTable } from "../GradeTable";

type TGrades = {
  a1?: TGradeScore;
  a2?: TGradeScore;
  w1?: TGradeScore;
  w2?: TGradeScore;
  r1?: TGradeScore;
  r2?: TGradeScore;
  s1?: TGradeScore;
  s2?: TGradeScore;
  y1?: TGradeScore;
  y2?: TGradeScore;
  sd?: TGradeScore;
  aq?: TGradeScore;
};

interface IProps {
  grades: TGrades;
}

export const PapiGradeTable = ({ grades }: IProps) => (
  <InfoContainer label="PAPI-N Profile">
    <GradeTable
      header={{ indicator: "A", title: "Need to perform" }}
      grades={[
        {
          label: { indicator: "A1", title: "Competitive orientation" },
          grade: grades.a1,
        },
        {
          label: { indicator: "A2", title: "Personal success" },
          grade: grades.a2,
        },
      ]}
    />
    <div className="py-6">
      <hr className="border-dashed border-list-separator" />
    </div>
    <GradeTable
      header={{ indicator: "W", title: "Need for rules and guidelines" }}
      grades={[
        {
          label: { indicator: "W1", title: "Need for rules" },
          grade: grades.w1,
        },
        {
          label: { indicator: "W2", title: "Need for guidelines" },
          grade: grades.w2,
        },
      ]}
    />
    <div className="py-6">
      <hr className="border-dashed border-list-separator" />
    </div>
    <GradeTable
      header={{ indicator: "R", title: "Abstract thinking" }}
      grades={[
        {
          label: { indicator: "R1", title: "Creative" },
          grade: grades.r1,
        },
        {
          label: { indicator: "R2", title: "Conceptual" },
          grade: grades.r2,
        },
      ]}
    />
    <div className="py-6">
      <hr className="border-dashed border-list-separator" />
    </div>
    <GradeTable
      header={{ indicator: "S", title: "Social attention" }}
      grades={[
        {
          label: { indicator: "S1", title: "Sociable" },
          grade: grades.s1,
        },
        {
          label: { indicator: "S2", title: "Harmonious" },
          grade: grades.s2,
        },
      ]}
    />
    <div className="py-6">
      <hr className="border-dashed border-list-separator" />
    </div>
    <GradeTable
      header={{ indicator: "Y", title: "Robustness" }}
      grades={[
        {
          label: { indicator: "Y1", title: "Calm" },
          grade: grades.y1,
        },
        {
          label: { indicator: "Y2", title: "Tolerance of criticism" },
          grade: grades.y2,
        },
        {
          label: { indicator: "SD", title: "Social desirability" },
          grade: grades.sd,
        },
        {
          label: { indicator: "AQ", title: "Consensus" },
          grade: grades.aq,
        },
      ]}
    />
  </InfoContainer>
);
