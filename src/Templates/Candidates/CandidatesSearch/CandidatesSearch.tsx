import { useManualCandidates } from "API/Calls/candidates";
import Sidebar from "Components/Sidebar";
import AddIcon from "@mui/icons-material/Add";
import Button from "Components/UI/atoms/Button";
import Modal from "Components/UI/atoms/Modal";
import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import {
  TCandidateBrief,
  TCandidatesResponse,
} from "API/Types/Candidate/candidatesBriefGet";
import {
  TSavedCandidatesFilters,
  TSelectedCandidatesSearchFilters,
} from "API/Types/Candidate/candidatesFilterParameters";
import CandidatesSearchFiltersContext from "Contexts/SelectedFilters/CandidatesSearch/CandidatesSearchFiltersContext";
import { defaultFilters } from "Contexts/SelectedFilters/CandidatesSearch/CandidatesSearchFiltersProvider";
import { useNavigate } from "react-router-dom";
import routes from "Routes/routes";
import ColorType from "Components/Enums/colorType";
import PencilIcon from "Assets/Icons/pencil.svg";
import BinIcon from "Assets/Icons/bin.svg";
import CheckSuccessIcon from "Assets/Icons/check-success.svg";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import CandidateModalActiveTabContext, {
  CandidateModalActiveTab,
} from "Contexts/ActiveTabs/CandidateModalActiveTab/CandidateModalActiveTabContext";
import { CandidateModalTabSections } from "Contexts/ActiveTabs/CandidateModalActiveTab/CandidateModalTabSections";
import { InfiniteData, UseInfiniteQueryResult } from "react-query";
import { TextField } from "@mui/material";
import {
  deleteJobCandidatesFilter,
  getJobCandidatesFilters,
  saveJobCandidatesFilter,
  updateTitleJobCandidatesFilter,
} from "API/Calls/jobCandidatesFilters";
import CandidatesTable from "../CandidatesTable";
import CandidateCreate from "../CandidateCreate";
import CandidatesFilter from "../CandidatesFilter";
import queryParamsBuilder from "../CandidatesFilter/queryParamsBuilder";

type TCandidateSearch = {
  jobId: string;
  selectedCandidateIds: string[];
  toggleCandidateSelection: (candidate: TCandidateBrief) => void;
  scrollableTargetId: string;
  disabled?: boolean;
  suggestedCandidatesQuery: UseInfiniteQueryResult<
    TCandidatesResponse,
    unknown
  >;
};

const CandidatesSearch = ({
  jobId,
  selectedCandidateIds,
  toggleCandidateSelection,
  scrollableTargetId,
  disabled = false,
  suggestedCandidatesQuery,
}: TCandidateSearch) => {
  const { params, areParamsSelected, setParams, clearParams } =
    useContext<TSelectedCandidatesSearchFilters>(
      CandidatesSearchFiltersContext
    );
  const { setActiveTab } = useContext<CandidateModalActiveTab>(
    CandidateModalActiveTabContext
  );
  const navigate = useNavigate();
  const [filterQueryString, setFilterQueryString] = useState<URLSearchParams>(
    queryParamsBuilder(areParamsSelected ? { ...params, JobId: jobId } : params)
  );
  const [isManualFiltering, setManualFiltering] =
    useState<boolean>(areParamsSelected);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedFilters, setSavedFilters] = useState<TSavedCandidatesFilters[]>(
    []
  );
  const [savedFilterEditIndex, setSavedFilterEditIndex] = useState<number>();
  const [newlyAddedCandidates, setNewlyAddedCandidates] = useState<
    TCandidateBrief[]
  >([]);
  const manualCandidatesQuery = useManualCandidates(filterQueryString);
  const candidatesQuery = isManualFiltering
    ? manualCandidatesQuery
    : suggestedCandidatesQuery;

  const maxSavedSearches = 3;
  const defaultIndexes = Array.from({ length: maxSavedSearches }, (v, i) => i);
  const savedSearchTitles = ["First", "Second", "Third"];

  const mapCandidatesResponse = (
    candidateData: InfiniteData<TCandidatesResponse> | undefined,
    newlyAdded: TCandidateBrief[]
  ) =>
    newlyAdded.concat(
      (
        candidateData?.pages
          .map((page) => page.data)
          .map((row) => row.data)
          .flat() || []
      ).filter((x) => !newlyAdded.map((y) => y.id).includes(x.id))
    );

  const candidates = useMemo(() => {
    if (isManualFiltering) {
      return mapCandidatesResponse(
        manualCandidatesQuery.data,
        newlyAddedCandidates
      );
    }
    return mapCandidatesResponse(
      suggestedCandidatesQuery.data,
      newlyAddedCandidates
    );
  }, [
    suggestedCandidatesQuery.data,
    manualCandidatesQuery.data,
    isManualFiltering,
    newlyAddedCandidates,
  ]);

  useEffect(() => {
    getJobCandidatesFilters(jobId).then((filters) => {
      const savedCandidatesFilters = [] as TSavedCandidatesFilters[];
      filters.data.forEach((v) => {
        const item = {
          title: v.title,
          params: JSON.parse(v.filterParams),
          index: v.index,
        } as TSavedCandidatesFilters;
        savedCandidatesFilters.splice(v.index, 0, item);
      });
      setSavedFilters(savedCandidatesFilters);
    });
  }, [jobId]);

  const handleClearFilters = () => {
    setManualFiltering(false);
    setFilterQueryString(queryParamsBuilder(defaultFilters));
  };

  const handleRowClick = (candidateId: string) => {
    setActiveTab(CandidateModalTabSections.Info);
    navigate(`${routes.candidates.url}/${candidateId}`);
  };

  const handleApplyFilters = () => {
    if (!areParamsSelected) {
      handleClearFilters();
      return;
    }
    setManualFiltering(true);
    setFilterQueryString(queryParamsBuilder({ ...params, JobId: jobId }));
  };

  const handleNewlyCreatedCandidate = (candidate?: TCandidateBrief) => {
    if (candidate) {
      const newCandidate = {
        ...candidate,
        isNewlyAdded: true,
      };
      setNewlyAddedCandidates([newCandidate, ...newlyAddedCandidates]);
    }
  };

  const saveCurrentFilter = () => {
    const existingIndexes = savedFilters.map((d) => d.index);
    const missingIndexes = defaultIndexes.filter(
      (item) => !existingIndexes.includes(item)
    );
    const index = missingIndexes[0];
    const filterTitle = `${savedSearchTitles[index]} saved search`;

    saveJobCandidatesFilter(
      {
        title: filterTitle,
        filterParams: JSON.stringify(params),
        index,
      },
      jobId
    ).then(() => {
      setSavedFilters([...savedFilters, { params, title: filterTitle, index }]);
    });

    setSavedFilterEditIndex(undefined);
  };

  const deleteSavedFilter = (index: number) => {
    let filters = [...savedFilters];
    deleteJobCandidatesFilter(jobId, index).then(() => {
      filters = filters.filter((f) => f.index !== index);
      setSavedFilters(filters);
      setSavedFilterEditIndex(undefined);
    });
  };

  const applySavedFilter = (index: number) => {
    const filterToApply = savedFilters.find((f) => f.index === index);
    if (filterToApply === undefined) {
      return;
    }

    setParams(filterToApply.params);
    setManualFiltering(true);
    setFilterQueryString(
      queryParamsBuilder({ ...filterToApply.params, JobId: jobId })
    );
  };

  const renameFilter = (index: number) => {
    setSavedFilterEditIndex(index);
  };

  const changeSavedFilterTitle = (event: ChangeEvent<HTMLInputElement>) => {
    if (savedFilterEditIndex !== undefined) {
      const filters = [...savedFilters];
      const filterToEdit = filters.find(
        (f) => f.index === savedFilterEditIndex
      );
      if (filterToEdit === undefined) {
        return;
      }

      filterToEdit.title = event.target.value;
      setSavedFilters(filters);
    }
  };

  const saveFilterTitle = () => {
    if (savedFilterEditIndex !== undefined) {
      const filter = savedFilters.find((f) => f.index === savedFilterEditIndex);
      if (filter === undefined) {
        return;
      }

      updateTitleJobCandidatesFilter(jobId, savedFilterEditIndex, {
        title: filter?.title,
      });
    }
    setSavedFilterEditIndex(undefined);
  };

  return (
    <div className="flex bg-blue-light">
      <Sidebar>
        <CandidatesFilter
          params={params}
          setParams={setParams}
          clearParams={clearParams}
          onApplyFilters={handleApplyFilters}
          onClearFilter={handleClearFilters}
        />
        {savedFilters.map((savedFilter) => (
          <div className="relative">
            <div className="w-full contact-person-card flex gap-2 rounded-lg p-2 mb-0.5 break-all relative">
              <div className="mb-1 flex flex-col">
                {savedFilterEditIndex === savedFilter.index ? (
                  <TextField
                    value={savedFilter.title}
                    onChange={changeSavedFilterTitle}
                  />
                ) : (
                  <Button
                    className="text-xs font-semibold text-grey-dark border-1"
                    label={savedFilter.title}
                    variant={ButtonVariantType.Text}
                    color={ColorType.Info}
                    onClick={() => applySavedFilter(savedFilter.index)}
                  />
                )}
              </div>
            </div>
            <div className="absolute top-3.5 right-1 h-full flex justify-end">
              {savedFilterEditIndex === savedFilter.index ? (
                <Button
                  className="min-w-0 h-min p-0 mr-2"
                  variant={ButtonVariantType.Text}
                  color={ColorType.Info}
                  onClick={() => saveFilterTitle()}
                  startIcon={
                    <img
                      className="relative left-1"
                      src={CheckSuccessIcon}
                      alt=""
                    />
                  }
                />
              ) : (
                <Button
                  className="min-w-0 h-min p-0 mr-2"
                  variant={ButtonVariantType.Text}
                  color={ColorType.Info}
                  onClick={() => renameFilter(savedFilter.index)}
                  startIcon={
                    <img className="relative left-1" src={PencilIcon} alt="" />
                  }
                />
              )}
              <Button
                className="min-w-0 h-min p-0"
                variant={ButtonVariantType.Text}
                color={ColorType.Info}
                onClick={() => deleteSavedFilter(savedFilter.index)}
                startIcon={
                  <img className="relative left-1" src={BinIcon} alt="" />
                }
              />
            </div>
          </div>
        ))}
        {savedFilters.length < maxSavedSearches && (
          <Button
            className="ml-auto"
            onClick={saveCurrentFilter}
            label="Save current search"
            variant={ButtonVariantType.Text}
            color={ColorType.Info}
          />
        )}
      </Sidebar>
      <div className="p-6 w-[85%]">
        <CandidatesTable
          disabled={disabled}
          selectedCandidateIds={selectedCandidateIds}
          toggleCandidateSelection={toggleCandidateSelection}
          isLoading={candidatesQuery.isLoading}
          isError={candidatesQuery.isError}
          data={candidates}
          count={candidatesQuery.data?.pages[0].data.count}
          hasNextPage={candidatesQuery.hasNextPage}
          fetchNextPage={candidatesQuery.fetchNextPage}
          scrollableTargetId={scrollableTargetId}
          onRowClick={handleRowClick}
          button={
            <Button
              disabled={disabled}
              label="Create a candidate"
              onClick={() => setIsModalOpen(true)}
              startIcon={<AddIcon />}
            />
          }
        />
      </div>
      <Modal
        open={isModalOpen}
        disableEscapeKeyDown
        enableSlideAnimation
        onClose={() => setIsModalOpen(false)}
      >
        {(props: { onClose: (candidate?: TCandidateBrief) => void }) => (
          <CandidateCreate
            onClose={props.onClose}
            onCreate={handleNewlyCreatedCandidate}
          />
        )}
      </Modal>
    </div>
  );
};
export default CandidatesSearch;
