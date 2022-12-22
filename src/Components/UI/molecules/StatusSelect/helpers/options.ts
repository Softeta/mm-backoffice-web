import SelectedCandidateStages from "Enums/selectedCandidateStages";

type TStatusOptions = {
  value?: SelectedCandidateStages;
  label: string;
  subOption?: boolean;
  divider?: boolean;
  disabled?: boolean;
};

const options = (selectedCandidatesCount: number): TStatusOptions[] => [
  {
    value: SelectedCandidateStages.New,
    label: "New",
    divider: true,
  },
  {
    value: SelectedCandidateStages.InvitePending,
    label: "Invite pending",
    divider: true,
  },
  {
    value: SelectedCandidateStages.Interested,
    label: "Interested",
    divider: true,
  },
  {
    value: undefined,
    label: "Shortlisted",
    disabled: true,
  },
  {
    value: SelectedCandidateStages.NoInterview,
    label: "No interviewed yet",
    subOption: true,
  },
  {
    value: SelectedCandidateStages.FirstInterview,
    label: "1st interview",
    subOption: true,
  },
  {
    value: SelectedCandidateStages.SecondInterview,
    label: "2nd interview",
    subOption: true,
  },
  {
    value: SelectedCandidateStages.ThirdInterview,
    label: "3rd interview",
    subOption: true,
    divider: true,
  },
  {
    value: SelectedCandidateStages.Hired,
    label: "Hired",
    disabled: selectedCandidatesCount !== 1,
  },
];

export default options;
