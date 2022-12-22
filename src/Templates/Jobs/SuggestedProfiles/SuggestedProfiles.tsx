import { TCandidatesResponse } from "API/Types/Candidate/candidatesBriefGet";
import { useEffect, useState } from "react";
import CandidateLink, {
  TCandidateLink,
} from "Components/UI/molecules/CandidateLink/CandidateLink";
import { UseInfiniteQueryResult } from "react-query";

export interface ISuggestedProfiles {
  suggestedCandidatesQuery: UseInfiniteQueryResult<
    TCandidatesResponse,
    unknown
  >;
}

const SUGGESTED_PROFILE_DEFAULT_PAGE = 4;

const SuggestedProfiles = ({
  suggestedCandidatesQuery,
}: ISuggestedProfiles) => {
  const [profiles, setProfiles] = useState<TCandidateLink[]>();

  useEffect(() => {
    if (!suggestedCandidatesQuery.data) return;
    setProfiles(
      suggestedCandidatesQuery.data?.pages
        .map((page) => page.data)
        .map((row) => row.data)
        .flat()
        .map((x) => ({
          id: x.id,
          firstName: x.firstName,
          lastName: x.lastName,
          picture: x.picture,
          position: x.currentPosition?.code,
        }))
        .slice(0, SUGGESTED_PROFILE_DEFAULT_PAGE) || []
    );
  }, [suggestedCandidatesQuery.data]);

  if (
    !suggestedCandidatesQuery.isFetching &&
    (!profiles || profiles.length === 0)
  )
    return <p className="text-xs mt-3 mb-3">No recommended profiles</p>;

  if (profiles)
    return (
      <>
        <p className="text-xs mt-3 mb-3">Recommended by system</p>
        <div className="grid grid-cols-2 gap-2">
          {profiles?.map((candidate) => (
            <CandidateLink key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </>
    );

  return null;
};

export default SuggestedProfiles;
