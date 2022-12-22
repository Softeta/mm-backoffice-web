import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TJobSalaryBudget } from "API/Types/Jobs/Common/jobSalaryBudget";
import { TJobPermanent } from "API/Types/Jobs/Common/jobPermanent";
import { TJobCalibration } from "API/Types/Jobs/jobCalibrate";
import { TJobFreelance } from "API/Types/Jobs/Common/jobFreelance";
import { TJobYearExperience } from "API/Types/Jobs/Common/jobYearExperience";
import IJobForm from "./IJobForm";
import { jobFormValidationSchema } from "./JobFormValidationSchema";

const yearExperienceData = (
  job: TJobCalibration
): TJobYearExperience | undefined =>
  job.yearExperience
    ? {
        from: job.yearExperience.from,
        to: job.yearExperience.to,
      }
    : undefined;

const amountRangeData = (
  salaryBudget?: TJobSalaryBudget
): TJobSalaryBudget | undefined =>
  salaryBudget
    ? {
        from: salaryBudget.from,
        to: salaryBudget.to,
      }
    : undefined;

const permanentData = (job: TJobCalibration): TJobPermanent | undefined =>
  job.permanent
    ? {
        monthlyBudget: amountRangeData(job.permanent.monthlyBudget),
      }
    : undefined;

const freelanceData = (job: TJobCalibration): TJobFreelance | undefined =>
  job.freelance
    ? {
        hoursPerProject: job.freelance.hoursPerProject,
        hourlyBudget: amountRangeData(job.freelance.hourlyBudget),
        monthlyBudget: amountRangeData(job.freelance.monthlyBudget),
      }
    : undefined;

export const useJobUpdateForm = (job: TJobCalibration) =>
  useForm<IJobForm>({
    defaultValues: {
      ownerId: job.owner?.id,
      position: job.position,
      deadLineDate: job.deadLineDate,
      description: job.description,
      startDate: job.startDate,
      endDate: job.endDate,
      currency: job.currency,
      weeklyWorkHours: job.weeklyHours,
      permanent: permanentData(job),
      freelance: freelanceData(job),
      yearExperience: yearExperienceData(job),
      isUrgent: job.isUrgent,
      workingHourTypes: job.workingHourTypes,
      workTypes: job.workTypes,
      assignedEmployees: job.assignedEmployees,
      skills: job.skills,
      industries: job.industries,
      seniorities: job.seniorities,
      languages: job.languages,
      formats: job.formats,
      isPriority: job.isPriority,
      interestedCandidates: job.interestedCandidates,
      interestedLinkedIns: job.interestedLinkedIns,
    },
    resolver: yupResolver(jobFormValidationSchema),
    mode: "onChange",
  });
