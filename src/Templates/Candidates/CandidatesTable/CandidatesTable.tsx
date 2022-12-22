import { ReactNode, MouseEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import Paper from "Components/UI/atoms/Paper";
import Divide from "Components/UI/atoms/Divide";
import { TCandidateBrief } from "API/Types/Candidate/candidatesBriefGet";
import IconButton from "Components/UI/atoms/IconButton";
import InfiniteScroll from "react-infinite-scroll-component";
import CenteredLoader from "Components/UI/molecules/CenteredLoader";
import CandidateRow from "./helpers/CandidateRow";

interface ICandidatesTable {
  button?: ReactNode;
  count?: number;
  data?: TCandidateBrief[];
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isError: boolean;
  isLoading: boolean;
  selectedCandidateIds?: string[];
  toggleCandidateSelection?: (candidate: TCandidateBrief) => void;
  scrollableTargetId?: string;
  onRowClick?: (jobId: string) => void;
  disabled?: boolean;
}

const CandidatesTable = (props: ICandidatesTable) => {
  const {
    button,
    count,
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    selectedCandidateIds,
    toggleCandidateSelection,
    scrollableTargetId,
    onRowClick,
    disabled = false,
  } = props;

  const hasCandidates = !!data?.length;

  const handleCandidateSelectionClick = (
    event: MouseEvent<HTMLButtonElement>,
    candidate: TCandidateBrief
  ) => {
    event.preventDefault();
    event.stopPropagation();
    toggleCandidateSelection?.(candidate);
  };

  const createButton = (candidate: TCandidateBrief) => {
    if (!selectedCandidateIds || !toggleCandidateSelection) return null;
    const selected = selectedCandidateIds.find(
      (c: string) => c === candidate.id
    );
    return (
      <IconButton
        disabled={disabled}
        className="candidate-add p-2"
        icon={selected ? <PlaylistAddCheckIcon /> : <AddIcon />}
        onClick={(event) => handleCandidateSelectionClick(event, candidate)}
        variant={selected ? "outlined" : "contained"}
      />
    );
  };

  return (
    <Paper>
      <div className="flex justify-between">
        <p className="text-xs self-center">{count || 0} results found</p>
        {button}
      </div>
      <Divide />
      <InfiniteScroll
        className="overflow-hidden"
        dataLength={data?.length || 0}
        next={() => fetchNextPage && fetchNextPage()}
        hasMore={!!hasNextPage}
        scrollableTarget={scrollableTargetId}
        loader={<CenteredLoader />}
      >
        <table className="styled-table">
          {(isLoading || isError) && (
            <tbody className="shadow-table rounded">
              {isLoading && (
                <tr>
                  <td colSpan={6}>
                    <CenteredLoader />
                  </td>
                </tr>
              )}
              {isError && (
                <tr>
                  <td colSpan={6}>There was an error while fetching data.</td>
                </tr>
              )}
            </tbody>
          )}

          {hasCandidates && (
            <tbody className="shadow-none">
              {data.map((candidate, index) => (
                <CandidateRow
                  key={candidate.id}
                  candidate={candidate}
                  index={index}
                  button={createButton(candidate)}
                  selected={selectedCandidateIds?.includes(candidate.id)}
                  onRowClick={onRowClick}
                />
              ))}
            </tbody>
          )}
        </table>
      </InfiniteScroll>
    </Paper>
  );
};

export default CandidatesTable;
