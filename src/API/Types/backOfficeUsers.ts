export type TBackOfficeUsersResponse = {
  data: TBackOfficeUsers;
};

export type TBackOfficeUsers = {
  users: TBackOfficeUser[];
};

export type TBackOfficeUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pictureUri?: string;
};
