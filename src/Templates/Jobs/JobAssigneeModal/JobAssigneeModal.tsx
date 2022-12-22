import { CircularProgress, FormControl } from "@mui/material";
import { updateJobAssignedEmployees } from "API/Calls/jobs";
import { TBackOfficeUser } from "API/Types/backOfficeUsers";
import { TJobEmployee } from "API/Types/Jobs/Common/jobEmployee";
import { TJobBriefResponse } from "API/Types/Jobs/jobGet";
import { TUpdateJobAssignedEmployeesRequest } from "API/Types/Jobs/jobUpdateAssignedEmployees";
import ColorType from "Components/Enums/colorType";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import MenuItem from "Components/UI/atoms/MenuItem";
import SearchField from "Components/UI/atoms/SearchField";
import EmployeeCard from "Components/UI/molecules/AssigneeCard";
import AvatarWithText from "Components/UI/molecules/AvatarWithText";
import Popover from "Components/UI/organisms/Popover";
import BackOfficeUsersContext from "Contexts/BackOfficeUsers/BackOfficeUsersContext";
import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";

interface IJobAssigneeModal {
  open: boolean;
  job: TJobBriefResponse;
  anchorEl?: HTMLDivElement;
  onSubmitSuccess: () => void;
  onClose: () => void;
}

const userToEmployee = (user: TBackOfficeUser): TJobEmployee => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  pictureUri: user.pictureUri,
});

const JobAssigneeModal = ({
  open,
  job,
  anchorEl,
  onSubmitSuccess,
  onClose,
}: IJobAssigneeModal) => {
  const users = useContext<TBackOfficeUser[]>(BackOfficeUsersContext);

  const [search, setSearch] = useState("");
  const [assignees, setAssignees] = useState<TJobEmployee[]>(
    job.assignedTo || []
  );
  const [isLoading, setIsLoading] = useState(false);

  const options: TBackOfficeUser[] = useMemo(() => {
    const assigneesIds = assignees.map((assignee) => assignee.id);
    return !search
      ? []
      : users.filter(
          (user) =>
            !assigneesIds.includes(user.id) &&
            `${user.firstName ?? ""} ${user.lastName ?? ""}`
              .toLowerCase()
              .search(search.toLowerCase()) > -1
        );
  }, [users, assignees, search]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event?.target?.value ?? "");
  };

  const handleSelect = (user: TBackOfficeUser) => {
    setAssignees((prev) => [...prev, userToEmployee(user)]);
  };

  const handleDelete = (id: string) => {
    setAssignees((prev) => prev.filter((e) => e.id !== id));
  };

  const reset = () => {
    setAssignees(job.assignedTo || []);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const payload: TUpdateJobAssignedEmployeesRequest = {
      assignedEmployees: assignees.map(({ id }) => id),
    };
    try {
      await updateJobAssignedEmployees(payload, job.jobId);
      onSubmitSuccess();
      handleClose();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setAssignees(job.assignedTo || []);
  }, [job.assignedTo]);

  return (
    <Popover
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      showHeader
      headerLabel="Assigned to"
    >
      <div className="w-[392px] p-4">
        <div className="flex flex-col max-h-[50vh]">
          <div className="flex flex-wrap gap-2">
            {assignees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onDelete={() => handleDelete(employee.id)}
              />
            ))}
          </div>
          <FormControl className="w-full">
            <SearchField value={search} onChange={handleSearch} />
          </FormControl>
          <div className="max-h-[200px] overflow-auto">
            {options.map((option, index) => (
              <MenuItem
                className={`px-0 ${
                  index > 0 ? "border-t border-solid border-alto" : ""
                }`}
                key={option.id}
                value={option.id}
                onClick={() => handleSelect(option)}
                tabIndex={0}
              >
                <AvatarWithText
                  imageURL={option.pictureUri}
                  title={`${option.firstName} ${option.lastName}`}
                  size={AvatarSizeType.Medium}
                  showImagePlaceholder
                />
              </MenuItem>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Button
                variant={ButtonVariantType.Outlined}
                color={ColorType.Info}
                label="Cancel"
                className="mt-1"
                onClick={handleClose}
              />
              <Button label="Save" className="mt-1" onClick={handleSubmit} />
            </>
          )}
        </div>
      </div>
    </Popover>
  );
};

export default JobAssigneeModal;
