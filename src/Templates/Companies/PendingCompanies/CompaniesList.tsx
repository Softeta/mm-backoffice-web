import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import InfiniteScroll from "react-infinite-scroll-component";
import CloseIcon from "Assets/Icons/close.svg";
import ColorType from "Components/Enums/colorType";
import IconButton from "Components/UI/atoms/IconButton";
import CenteredLoader from "Components/UI/molecules/CenteredLoader";
import { TCompanyBrief } from "API/Types/Companies/companyBriefGet";
import CompanyRow from "./CompanyRow";

interface ICompaniesList {
  data?: TCompanyBrief[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  selectedCompanyId?: string;
  onCompanySelect: (id: string) => void;
  onClose: () => void;
}

const scrollableTargetId = "PendingCompaniesParentDiv";

export const CompaniesList = ({
  data,
  fetchNextPage,
  hasNextPage,
  isLoading,
  selectedCompanyId,
  onCompanySelect,
  onClose,
}: ICompaniesList) => (
  <div className="w-[15vw] min-w-[240px] p-4 pt-0 border-r border-alto">
    <div className="tmpUtil-headerHeight flex items-center text-base font-semibold">
      <IconButton
        className="w-6 h-6 mr-4"
        variant={ButtonVariantType.Text}
        icon={<img src={CloseIcon} alt="" />}
        color={ColorType.Info}
        onClick={onClose}
      />
      Pending companies
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
          data?.map((company) => (
            <CompanyRow
              key={company.id}
              company={company}
              selected={company.id === selectedCompanyId}
              onSelect={() => onCompanySelect(company.id)}
            />
          ))
        )}
      </InfiniteScroll>
    </div>
  </div>
);

export default CompaniesList;
