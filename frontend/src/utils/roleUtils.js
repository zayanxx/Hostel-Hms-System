export const isAdmin = (user) => user?.role === 'admin';
export const isResident = (user) => user?.role === 'resident';
export const getRoleLabel = (role) => {
  switch (role) {
    case 'admin': return 'Admin';
    case 'resident': return 'Resident';
    default: return 'Unknown';
  }
};