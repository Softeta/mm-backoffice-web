import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import InfiniteScroll from "react-infinite-scroll-component";
import CloseIcon from "Assets/Icons/close.svg";
import ColorType from "Components/Enums/colorType";
import IconButton from "Components/UI/atoms/IconButton";
import CenteredLoader from "Components/UI/molecules/CenteredLoader";
import { TJobBriefResponse } from "API/Types/Jobs/jobGet";
import JobRow from "./JobRow";

interface IJobsList {
  data?: TJobBriefResponse[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  selectedJobId: string | null;
  onJobSelect: (id: string) => void;
  onClose: () => void;
}

const scrollableTargetId = "PendingJobsParentDiv";

export const JobsList = ({
  data,
  fetchNextPage,
  hasNextPage,
  isLoading,
  selectedJobId,
  onJobSelect,
  onClose,
}: IJobsList) => (
  <div className="w-[15vw] min-w-[240px] p-4 pt-0 border-r border-alto">
    <div className="tmpUtil-headerHeight flex items-center text-base font-semibold">
      <IconButton
        className="w-6 h-6 mr-4"
        variant={ButtonVariantType.Text}
        icon={<img src={CloseIcon} alt="" />}
        color={ColorType.Info}
        onClick={onClose}
      />
      Pending jobs
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
          data?.map((job) => (
            <JobRow
              key={job.jobId}
              job={job}
              selected={job.jobId === selectedJobId}
              onSelect={() => onJobSelect(job.jobId)}
            />
          ))
        )}
      </InfiniteScroll>
    </div>
  </div>
);

export default JobsList;
