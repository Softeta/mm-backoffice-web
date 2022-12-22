import { TJobSelectedCandidate } from "API/Types/Jobs/Common/jobSelectedCandidate";
import { TCandidateRanking } from "API/Types/Jobs/jobUpdateCandidatesRanking";
import ColorType from "Components/Enums/colorType";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import Modal from "Components/UI/atoms/Modal";
import PopupHeader from "Components/UI/molecules/PopupHeader";
import { useEffect, useMemo, useState } from "react";
import { CandidateRow } from "./CandidateRow";

interface ICandidateRankingModal {
  open: boolean;
  candidates: TJobSelectedCandidate[];
  onSubmit: (candidatesRanking: TCandidateRanking[]) => void;
  onClose: () => void;
}

const initialOptions = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

const CandidateRankingModal = ({
  open,
  candidates: propsCandidates,
  onSubmit,
  onClose,
}: ICandidateRankingModal) => {
  const [candidates, setCandidates] =
    useState<TJobSelectedCandidate[]>(propsCandidates);
  const [selectedCandidateId, setSelectedCandidateId] = useState<
    string | undefined
  >();

  const usedRankings: number[] = useMemo(
    () => candidates.map(({ ranking }) => ranking),
    [candidates]
  );

  const options: number[] = useMemo(
    () =>
      initialOptions.reduce(
        (prevArr: number[], option: number) =>
          usedRankings.includes(option) ? prevArr : [...prevArr, option],
        []
      ),
    [usedRankings]
  );

  const handleRankingChange = (candidateId: string, ranking?: number) => {
    if (!ranking) return;
    setCandidates((prevState) =>
      prevState.map((candidate) =>
        candidate.id === candidateId ? { ...candidate, ranking } : candidate
      )
    );
  };

  const handleSubmit = () => {
    onSubmit(
      candidates.map((candidate) => ({
        id: candidate.id,
        ranking: candidate.ranking,
      }))
    );
  };

  const reset = () => {
    setSelectedCandidateId(undefined);
    setCandidates(propsCandidates);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    if (propsCandidates) {
      setCandidates(propsCandidates);
    }
  }, [propsCandidates]);

  return (
    <Modal
      open={open}
      header={<PopupHeader label="Rank candidates" onClose={handleClose} />}
    >
      <div className="w-[392px] p-4">
        <div className="col-span-2 text-right flex flex-col">
          <div className="flex flex-col max-h-[50vh] overflow-auto ">
            {candidates.map((candidate) => (
              <CandidateRow
                candidate={candidate}
                selected={candidate.id === selectedCandidateId}
                options={options}
                onSelect={() => setSelectedCandidateId(candidate.id)}
                onRankingChange={(value) =>
                  handleRankingChange(candidate.id, value)
                }
                onBlur={() => setSelectedCandidateId(undefined)}
              />
            ))}
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant={ButtonVariantType.Outlined}
              color={ColorType.Info}
              label="Cancel"
              className="mt-1"
              onClick={handleClose}
            />
            <Button label="Save" className="mt-1" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CandidateRankingModal;
