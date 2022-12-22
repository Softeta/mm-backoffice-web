import { TJobSelectedCandidate } from "API/Types/Jobs/Common/jobSelectedCandidate";
import { TJobArchivedCandidate } from "API/Types/Jobs/Common/jobArchivedCandidate";
import { useEffect, useMemo, useState } from "react";
import InteractiveAvatar from "Components/UI/molecules/InteractiveAvatar";
import { TUpdateCandidateStageRequest } from "API/Types/Jobs/jobUpdateCandidateStage";
import {
  TActivateCandidatesRequest,
  TArchiveCandidateStageRequest,
} from "API/Types/Jobs/jobArchiveCandidateStage";
import SelectedCandidateStages from "Enums/selectedCandidateStages";
import ArchivedCandidateStages from "Enums/archivedCandidateStages";
import CandidateProfile from "Templates/Candidates/CandidateProfile";
import WeavyApp from "Weavy/WeavyApp";
import { TCandidateRanking } from "API/Types/Jobs/jobUpdateCandidatesRanking";
import { TJobCandidates } from "API/Types/Jobs/jobCandidatesGet";
import { TCandidateInteractive } from "./types";
import SelectControls from "./helpers/SelectControls";
import ShortlistControls from "./helpers/ShortlistControls";
import GridToggle, { GridMode } from "./helpers/GridToggle";
import ArchiveSelectControls from "./helpers/ArchiveSelectControls";
import CandidateHireModal from "../CandidateHireModal";
import CandidateRankingModal from "../CandidateRankingModal";
import CandidateBriefModal from "../CandidateBriefModal";
import CandidateInvitationModal from "../CandidateInvitationModal";
import SendShortlistModal from "../SendShortlistModal";

interface ICandidatesGrid {
  jobId: string;
  candidateLists: (TJobSelectedCandidate | TJobArchivedCandidate)[];
  allowedToInvite: boolean;
  shortlistActivated: boolean;
  shortListActivatedAt?: Date;
  onUpdateCandidateBrief: (candidateId: string, brief?: string) => void;
  onUpdateCandidatesStage: (candidates: TUpdateCandidateStageRequest) => void;
  onRemoveCandidates: (candidates: TArchiveCandidateStageRequest) => void;
  onActivateCandidates: (candidates: TActivateCandidatesRequest) => void;
  onActivateShortList: (jobCandidates: TJobCandidates) => void;
  onRankingCandidates: (candidatesRanking: TCandidateRanking[]) => void;
  onInvitationSubmit: (jobCandidates: TJobCandidates) => void;

  disabled?: boolean;
}

const profileVisableTime = 15000; // 15s
let profileVisableTimeout: NodeJS.Timeout | undefined;

export const CandidatesGrid = ({
  jobId,
  allowedToInvite,
  candidateLists = [],
  shortlistActivated,
  shortListActivatedAt,
  onUpdateCandidateBrief,
  onUpdateCandidatesStage,
  onRemoveCandidates,
  onActivateCandidates,
  onActivateShortList,
  onRankingCandidates,
  onInvitationSubmit,
  disabled = false,
}: ICandidatesGrid) => {
  const [gridMode, setGridMode] = useState<GridMode>(GridMode.Active);
  const [candidates, setCandidates] = useState<TCandidateInteractive[]>([]);
  const [sendShortlistPopupAnchor, setSendShortlistPopupAnchor] = useState<
    HTMLButtonElement | undefined
  >(undefined);
  const [showShortlistPopup, setShowShortlistPopup] = useState<boolean>(false);
  const [hoveredCandidateId, setHoveredCandidateId] = useState<string | null>(
    null
  );
  const [openBriefModal, setOpenBriefModal] = useState<
    { id: string; content?: string } | undefined
  >();
  const [openHireModal, setOpenHireModal] = useState(false);
  const [openRankingModal, setOpenRankingModal] = useState(false);
  const [openInvitationModal, setOpenInvitationModal] = useState(false);
  const [modalAnchorEl, setModalAnchorEl] = useState<
    HTMLButtonElement | undefined
  >(undefined);
  const [needToResetSelectedItems, setNeedToResetSelectedItems] =
    useState(false);

  const setProfileVisibleTimeout = () => {
    if (profileVisableTimeout) {
      clearTimeout(profileVisableTimeout);
    }
    profileVisableTimeout = setTimeout(() => {
      setHoveredCandidateId(null);
    }, profileVisableTime);
  };

  const handleProfileHover = (isHovered: boolean): void => {
    if (isHovered && profileVisableTimeout) {
      clearTimeout(profileVisableTimeout);
    }
    if (!isHovered && hoveredCandidateId) {
      setProfileVisibleTimeout();
    }
  };

  const handleInteractiveAvatarHover = (
    candidateId: string,
    isHovered: boolean
  ): void => {
    if (hoveredCandidateId && hoveredCandidateId !== candidateId && !isHovered)
      return;
    if (isHovered && hoveredCandidateId !== candidateId) {
      setHoveredCandidateId(candidateId);
    }
    if (profileVisableTimeout && candidateId && isHovered) {
      clearTimeout(profileVisableTimeout);
    }
    if (!isHovered && hoveredCandidateId) {
      setProfileVisibleTimeout();
    }
  };

  const selectedItems = useMemo(
    () => candidates.filter((candidate) => candidate.selected),
    [candidates]
  );

  const isShortlisted = (candidate: TCandidateInteractive): boolean =>
    [
      SelectedCandidateStages.FirstInterview,
      SelectedCandidateStages.SecondInterview,
      SelectedCandidateStages.ThirdInterview,
      SelectedCandidateStages.NoInterview,
    ].includes((candidate as TJobSelectedCandidate).stage);

  const shortlistedCandidates: TJobSelectedCandidate[] = useMemo(
    () =>
      candidates
        .filter((candidate) => isShortlisted(candidate))
        .map((candidate) => candidate as TJobSelectedCandidate),
    [candidates]
  );

  const showSelectControls = useMemo(
    () => selectedItems?.length > 0,
    [selectedItems]
  );
  const showArchiveToggle = !showSelectControls;

  const isActiveMode = gridMode === GridMode.Active;
  const showActiveSelectControls = isActiveMode && showSelectControls;
  const showShortlistControls =
    isActiveMode && !showSelectControls && shortlistedCandidates.length > 0;

  const isArchiveMode = !isActiveMode;
  const showArchiveSelectControls = isArchiveMode && showSelectControls;

  const handleSelect = (id: string) => {
    setCandidates((prev) =>
      prev.map((el) => (el.id === id ? { ...el, selected: !el.selected } : el))
    );
  };

  const handleSelectCancel = () => {
    setCandidates((prev) => prev.map((el) => ({ ...el, selected: false })));
  };

  const handleInviteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setModalAnchorEl(event.currentTarget);
    setOpenInvitationModal(true);
  };

  const handleChangeStatusClick = (stage: SelectedCandidateStages) => {
    if (stage === SelectedCandidateStages.Hired) {
      setOpenHireModal(true);
      return;
    }
    onUpdateCandidatesStage({
      stage,
      candidateIds: selectedItems.map((x) => x.id),
    });
    handleSelectCancel();
  };

  const handleRemoveClick = () => {
    setNeedToResetSelectedItems(true);
    onRemoveCandidates({
      stage: ArchivedCandidateStages.NotRelevant,
      candidateIds: selectedItems.map((x) => x.id),
    });
  };

  const handleRankingClick = () => {
    setOpenRankingModal(true);
  };

  const handleSendShortListClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setSendShortlistPopupAnchor(event.currentTarget);
    setShowShortlistPopup(true);
  };

  const handlePreviewShortlist = () => {
    const selfServiceWebsiteUrl = process.env.REACT_APP_SELFSERVICE_WEBSITE;
    window.open(
      `${selfServiceWebsiteUrl}/back-office/presentation/shortlist/${jobId}`
    );
  };

  const handleActivateClick = () => {
    setNeedToResetSelectedItems(true);
    onActivateCandidates({
      candidateIds: selectedItems.map((x) => x.id),
    });
  };

  const handleGridModeChange = (mode: GridMode): void => {
    setGridMode(mode);
    setHoveredCandidateId(null);
    handleSelectCancel();
  };

  const getCandidatesByStage = (
    stage: SelectedCandidateStages | ArchivedCandidateStages
  ): JSX.Element => (
    <>
      {candidates
        .filter((candidate) => candidate.stage === stage)
        .map((candidate) => (
          <InteractiveAvatar
            isInvited={candidate.isInvited}
            disabled={disabled}
            isHired={(candidate as TJobSelectedCandidate).isHiredInOtherJob}
            key={candidate.id}
            className="mb-2"
            selected={candidate.selected}
            imageURL={candidate.picture?.uri}
            title={`${candidate.firstName} ${candidate.lastName}`}
            id={candidate.id}
            onHover={handleInteractiveAvatarHover}
            isShortlisted={
              (candidate as TJobSelectedCandidate).isShortListedInOtherJob
            }
            ranking={
              isShortlisted(candidate)
                ? (candidate as TJobSelectedCandidate).ranking
                : undefined
            }
            hasBrief={!!candidate.brief}
            hasApplied={candidate.hasApplied}
            onSelect={() => handleSelect(candidate.id)}
            onRankingClick={() => setOpenRankingModal(true)}
            onBriefClick={() =>
              setOpenBriefModal({
                id: candidate.id,
                content: candidate.brief,
              })
            }
            spaceKey={`job-${jobId}-cand-${candidate.id}`}
            appKey={`job-${jobId}-cand-${candidate.id}`}
          />
        ))}
    </>
  );

  const handleHire = () => {
    onUpdateCandidatesStage({
      stage: SelectedCandidateStages.Hired,
      candidateIds: selectedItems.map((x) => x.id),
    });
    setOpenHireModal(false);
  };

  const handleRanking = (candidatesRanking: TCandidateRanking[]) => {
    onRankingCandidates(candidatesRanking);
    setOpenRankingModal(false);
  };

  const handleBriefChange = async (candidateId: string, brief?: string) => {
    onUpdateCandidateBrief(candidateId, brief);
    setOpenBriefModal(undefined);
  };

  useEffect(() => {
    setCandidates(
      candidateLists.map((candidate) => ({
        ...candidate,
        selected:
          !!candidates.find((x) => x.id === candidate.id)?.selected &&
          !needToResetSelectedItems,
      }))
    );
    setNeedToResetSelectedItems(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateLists]);

  return (
    <div className="flex flex-col relative">
      <div className="grid grid-cols-5 gap-0 py-4  tmpUtil-slideContentHeight overflow-auto">
        {isActiveMode && (
          <>
            <div className="border-r border-alto px-4">
              <p className="text-xs text-scorpion mb-3">New</p>
              {getCandidatesByStage(SelectedCandidateStages.New)}
            </div>
            <div className="border-r border-alto px-4">
              <p className="text-xs text-scorpion mb-3">Invite pending</p>
              {getCandidatesByStage(SelectedCandidateStages.InvitePending)}
            </div>
            <div className="border-r border-alto px-4">
              <p className="text-xs text-scorpion mb-3">Interested</p>
              {getCandidatesByStage(SelectedCandidateStages.Interested)}
            </div>
            <div className="border-r border-alto px-4">
              <p className="text-xs text-scorpion mb-3">Short listed</p>
              <div className="mb-4">
                <p className="text-2xs font-semibold text-grey-middle mb-2">
                  3RD INTERVIEW
                </p>
                {getCandidatesByStage(SelectedCandidateStages.ThirdInterview)}
              </div>

              <div className="mb-4">
                <p className="text-2xs font-semibold text-grey-middle mb-2">
                  2ND INTERVIEW
                </p>
                {getCandidatesByStage(SelectedCandidateStages.SecondInterview)}
              </div>

              <div className="mb-4">
                <p className="text-2xs font-semibold text-grey-middle mb-2">
                  1ST INTERVIEW
                </p>
                {getCandidatesByStage(SelectedCandidateStages.FirstInterview)}
              </div>

              <div className="mb-4">
                <p className="text-2xs font-semibold text-grey-middle mb-2">
                  NO INTERVIEW YET
                </p>
                {getCandidatesByStage(SelectedCandidateStages.NoInterview)}
              </div>
            </div>
            <div className="px-4">
              <p className="text-xs text-scorpion mb-3">Hired</p>
              {getCandidatesByStage(SelectedCandidateStages.Hired)}
            </div>
          </>
        )}
        {isArchiveMode && (
          <>
            <div className="border-r border-alto px-4">
              <p className="text-xs text-scorpion mb-3">Not interested</p>
              {getCandidatesByStage(ArchivedCandidateStages.NotInterested)}
            </div>
            <div className="border-r border-alto px-4">
              <p className="text-xs text-scorpion mb-3">Not relevant</p>
              {getCandidatesByStage(ArchivedCandidateStages.NotRelevant)}
            </div>
          </>
        )}

        {hoveredCandidateId && (
          <div className="absolute w-[241px] top-0 right-0 p-4 bg-white shadow-[-10px_0_10px_-2px_rgba(0,0,0,0.1)] tmpUtil-slideContentHeight overflow-auto">
            <CandidateProfile
              candidateId={hoveredCandidateId}
              onHover={handleProfileHover}
            />
            <p className="h4 font-semibold col-span-2 mt-4 mb-2">Comments</p>
            <WeavyApp
              spaceKey={`job-${jobId}-cand-${hoveredCandidateId}`}
              spaceName={`job-${jobId}-cand-${hoveredCandidateId}`}
              appKey={`job-${jobId}-cand-${hoveredCandidateId}`}
              appName="Comments"
              appType="posts"
            />
          </div>
        )}
      </div>
      <div className="h-16 flex justify-between items-center p-4 border-t border-alto">
        {showArchiveToggle && (
          <GridToggle selected={gridMode} onChange={handleGridModeChange} />
        )}
        {showActiveSelectControls && (
          <SelectControls
            selectedItems={selectedItems}
            allowedToInvite={allowedToInvite}
            onCancel={handleSelectCancel}
            onInviteClick={handleInviteClick}
            onRemoveClick={handleRemoveClick}
            onChangeStatusClick={handleChangeStatusClick}
          />
        )}
        {showShortlistControls && (
          <>
            <div className="ml-auto">
              <ShortlistControls
                disabled={disabled}
                shortlistActivated={shortlistActivated}
                shortListActivatedAt={shortListActivatedAt}
                onRanking={handleRankingClick}
                onPreview={handlePreviewShortlist}
                onSend={handleSendShortListClick}
              />
            </div>
            <SendShortlistModal
              popupAnchorEl={sendShortlistPopupAnchor}
              isModalOpen={showShortlistPopup}
              jobId={jobId}
              onSetOpenModal={setShowShortlistPopup}
              onSubmit={onActivateShortList}
            />
          </>
        )}
        {showArchiveSelectControls && (
          <ArchiveSelectControls
            selectedItems={selectedItems}
            onCancel={handleSelectCancel}
            onActivateClick={handleActivateClick}
          />
        )}
      </div>
      <CandidateHireModal
        candidate={selectedItems[0]}
        open={openHireModal}
        onHire={handleHire}
        onClose={() => setOpenHireModal(false)}
      />
      <CandidateRankingModal
        candidates={shortlistedCandidates}
        open={openRankingModal}
        onSubmit={handleRanking}
        onClose={() => setOpenRankingModal(false)}
      />
      {openBriefModal && (
        <CandidateBriefModal
          open
          content={openBriefModal.content}
          onSubmit={(brief) => handleBriefChange(openBriefModal.id, brief)}
          onClose={() => setOpenBriefModal(undefined)}
        />
      )}
      <CandidateInvitationModal
        isModalOpen={openInvitationModal}
        popupAnchorEl={modalAnchorEl}
        jobId={jobId}
        candidateIds={selectedItems.map((x) => x.id)}
        onSubmit={onInvitationSubmit}
        onSetOpenModal={setOpenInvitationModal}
      />
    </div>
  );
};

export default CandidatesGrid;
