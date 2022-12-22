export const Roles = {
  BackOffice: {
    Admin: "BackOffice.Admin",
    Consultant: "BackOffice.Consultant",
    Researcher: "BackOffice.Researcher",
  },
};

export const AllowedDashboardRoles = [
  Roles.BackOffice.Consultant,
  Roles.BackOffice.Researcher,
];

export const AllowedCommonRoles = [
  Roles.BackOffice.Consultant,
  Roles.BackOffice.Researcher,
  Roles.BackOffice.Admin,
];
