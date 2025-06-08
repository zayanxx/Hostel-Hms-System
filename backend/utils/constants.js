// utils/constants.js

export const ADMIN_ROLES = {
  superadmin: {
    label: "Super Admin",
    permissions: [
      "create_admin",
      "edit_admin",
      "delete_admin",
      "view_dashboard",
      "manage_users",
      "manage_complaints",
      "manage_requests",
      "assign_roles",
      "full_access",
    ],
  },

  admin: {
    label: "Admin",
    permissions: [
      "create_admin",
      "edit_admin",
      "view_dashboard",
      "manage_users",
      "manage_complaints",
      "manage_requests",
    ],
  },

  manager: {
    label: "Manager",
    permissions: [
      "view_dashboard",
      "manage_complaints",
      "manage_requests",
    ],
  },
};