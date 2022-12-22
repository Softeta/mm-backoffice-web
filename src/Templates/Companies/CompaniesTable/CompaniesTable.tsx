import { ReactNode } from "react";
import Paper from "Components/UI/atoms/Paper";
import Sidebar from "Components/Sidebar";
import SectionHeading from "Components/UI/atoms/SectionHeading";
import Divide from "Components/UI/atoms/Divide";
import InfiniteScroll from "react-infinite-scroll-component";
import { TCompanyBrief } from "API/Types/Companies/companyBriefGet";
import CenteredLoader from "Components/UI/molecules/CenteredLoader";
import CompanyRow from "./helpers/CompanyRow";

const cols = (
  <tr>
    <th>Name</th>
    <th>Industries</th>
    <th>Location</th>
  </tr>
);

interface IProps {
  count?: number;
  headingControls?: ReactNode;
  data?: TCompanyBrief[];
  fetchNextPage: () => void;
  filter?: ReactNode;
  hasNextPage?: boolean;
  isError: boolean;
  isLoading: boolean;
  onRowClick?: (jobId: string) => void;
  title: string;
}

const CompaniesTable = (props: IProps) => {
  const {
    count = 0,
    headingControls,
    data,
    fetchNextPage,
    filter,
    hasNextPage,
    isError,
    isLoading,
    onRowClick,
    title,
  } = props;

  return (
    <div className="grid grid-cols-[252px_1fr] gap-8">
      <Sidebar>{filter}</Sidebar>
      <div className="pr-7">
        <SectionHeading title={title} button={headingControls} />
        <Paper>
          <p className="text-xs">{count} results found</p>
          <Divide />
          <InfiniteScroll
            className="overflow-hidden"
            dataLength={data?.length || 0}
            next={() => fetchNextPage()}
            hasMore={!!hasNextPage}
            loader={<CenteredLoader />}
          >
            <table className="styled-table">
              <thead>{cols}</thead>
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
                      <td colSpan={6}>
                        There was an error while fetching data.
                      </td>
                    </tr>
                  )}
                </tbody>
              )}

              {data && (
                <tbody>
                  {data.map((company: TCompanyBrief) => (
                    <CompanyRow
                      key={company.id}
                      company={company}
                      onRowClick={onRowClick}
                    />
                  ))}
                </tbody>
              )}
            </table>
          </InfiniteScroll>
        </Paper>
      </div>
    </div>
  );
};

export default CompaniesTable;
