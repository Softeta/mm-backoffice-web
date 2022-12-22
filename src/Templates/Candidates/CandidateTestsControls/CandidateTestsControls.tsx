import {
  deleteLgiTest,
  deletePapiTest,
  forceSyncLgiTestResults,
  forceSyncPapiTestResults,
} from "API/Calls/candidatesTests";
import { TCandidateTestsResponse } from "API/Types/Candidate/candidateTestsGet";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import LoaderButton from "Components/UI/atoms/LoaderButton";
import { useMutation } from "react-query";

interface IPendingControls {
  data?: TCandidateTestsResponse;
  isLoading: boolean;
  candidateId: string;
  onForceSyncLgi: () => void;
  onForceSyncPapi: () => void;
  onDeleteLgi: () => void;
  onDeletePapi: () => void;
}
const CandidateTestsControls = ({
  data,
  isLoading,
  candidateId,
  onForceSyncLgi,
  onForceSyncPapi,
  onDeleteLgi,
  onDeletePapi,
}: IPendingControls) => {
  const lgiPackageInstanceId = data?.data?.logicalAssessment?.packageInstanceId;
  const papiPackageInstanceId =
    data?.data?.personalityAssessment?.packageInstanceId;

  const lgiIsCompleted = !!data?.data?.logicalAssessment?.scores;
  const papiIsCompleted = !!data?.data?.personalityAssessment?.scores;

  const { mutateAsync: mutateSyncLgiTest, isLoading: isLgiSyncLoading } =
    useMutation(async () =>
      forceSyncLgiTestResults(candidateId, lgiPackageInstanceId!)
    );

  const { mutateAsync: mutateSyncPapiTest, isLoading: isPapiSyncLoading } =
    useMutation(async () =>
      forceSyncPapiTestResults(candidateId, lgiPackageInstanceId!)
    );

  const { mutateAsync: mutateDeleteLgiTest, isLoading: isLgiDeleteLoading } =
    useMutation(async () => deleteLgiTest(candidateId, lgiPackageInstanceId!));

  const { mutateAsync: mutateDeletePapiTest, isLoading: isPapiDeleteLoading } =
    useMutation(async () => deletePapiTest(candidateId, lgiPackageInstanceId!));

  const deleteLgiResults = async () => {
    await mutateDeleteLgiTest();
    onDeleteLgi();
  };

  const deletePapiResults = async () => {
    await mutateDeletePapiTest();
    onDeletePapi();
  };

  const forceSynchronizeLgi = async () => {
    await mutateSyncLgiTest();
    onForceSyncLgi();
  };

  const forceSynchronizePapi = async () => {
    await mutateSyncPapiTest();
    onForceSyncPapi();
  };

  return (
    <div className="flex justify-between w-full">
      <div>
        {lgiPackageInstanceId && !lgiIsCompleted && (
          <LoaderButton
            label="Force synchronize LGI results"
            variant={ButtonVariantType.Outlined}
            className="mx-3"
            onClick={forceSynchronizeLgi}
            loading={isLgiSyncLoading}
            disabled={isLoading || isLgiSyncLoading}
          />
        )}
        {papiPackageInstanceId && !papiIsCompleted && (
          <LoaderButton
            label="Force synchronize PAPI results"
            variant={ButtonVariantType.Outlined}
            onClick={forceSynchronizePapi}
            loading={isPapiSyncLoading}
            disabled={isLoading || isPapiSyncLoading}
          />
        )}
      </div>
      <div>
        {lgiPackageInstanceId && (
          <LoaderButton
            label="Delete LGI test results"
            variant={ButtonVariantType.Contained}
            onClick={deleteLgiResults}
            loading={isLgiDeleteLoading}
            disabled={isLoading || isLgiDeleteLoading}
          />
        )}
        {papiPackageInstanceId && (
          <LoaderButton
            label="Delete PAPI test results"
            variant={ButtonVariantType.Contained}
            className="mx-3"
            onClick={deletePapiResults}
            loading={isPapiDeleteLoading}
            disabled={isLoading || isPapiDeleteLoading}
          />
        )}
      </div>
    </div>
  );
};

export default CandidateTestsControls;
