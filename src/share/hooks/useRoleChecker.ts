import { UserRole } from "../models";
import { sessionStorageUtil } from "src/share/utils";

export const useRoleChecker = () => {
  const localRole = sessionStorageUtil.get("role");
  return (role: UserRole) => localRole === role;
};
