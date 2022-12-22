import { TAddCandidateCourseRequest } from "./Common/candidateCourse";
import { TAddCandidateEducationRequest } from "./Common/candidateEducation";
import { TCandidateWorkExperience } from "./Common/candidateWorkExperience";
import { TCandidateRequest } from "./candidateBase";
import { TFileAddRequest } from "../fileRequest";

export type TCandidateCreateRequest = TCandidateRequest & {
  curriculumVitae?: TFileAddRequest;
  picture?: TFileAddRequest;
  video?: TFileAddRequest;
  courses: TAddCandidateCourseRequest[];
  educations: TAddCandidateEducationRequest[];
  workExperiences: TCandidateWorkExperience[];
};
