import { TCandidateBrief } from "API/Types/Candidate/candidatesBriefGet";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import InfiniteScroll from "react-infinite-scroll-component";
import CloseIcon from "Assets/Icons/close.svg";
import ColorType from "Components/Enums/colorType";
import IconButton from "Components/UI/atoms/IconButton";
import CenteredLoader from "Components/UI/molecules/CenteredLoader";
import CandidateRow from "./CandidateRow";

interface ICandidatesList {
  data?: TCandidateBrief[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  selectedCandidateId?: string;
  onCandidateSelect: (id: string) => void;
  onClose: () => void;
}

const scrollableTargetId = "PendingCandidatesParentDiv";

export const CandidatesList = ({
  data,
  fetchNextPage,
  hasNextPage,
  isLoading,
  selectedCandidateId,
  onCandidateSelect,
  onClose,
}: ICandidatesList) => (
  <div className="w-[15vw] min-w-[240px] p-4 pt-0 border-r border-alto">
    <div className="tmpUtil-headerHeight flex items-center text-base font-semibold">
      <IconButton
        className="w-6 h-6 mr-4"
        variant={ButtonVariantType.Text}
        icon={<img src={CloseIcon} alt="" />}
        color={ColorType.Info}
        onClick={onClose}
      />
      Pending candidates
    </div>
    <div
      id={scrollableTargetId}
      className="tmpUtil-pendingListHeight overflow-y-auto"
    >
      <InfiniteScroll
        dataLength={data?.length || 0}
        next={() => fetchNextPage && fetchNextPage()}
        hasMore={!!hasNextPage}
        scrollableTarget={scrollableTargetId}
        loader={<CenteredLoader />}
      >
        {isLoading ? (
          <CenteredLoader />
        ) : (
          data?.map((candidate) => (
            <CandidateRow
              key={candidate.id}
              candidate={candidate}
              selected={candidate.id === selectedCandidateId}
              onSelect={() => onCandidateSelect(candidate.id)}
            />
          ))
        )}
      </InfiniteScroll>
    </div>
  </div>
);

export default CandidatesList;
