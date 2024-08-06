import { UserRole } from "../models";
import { localStorageUtil } from "src/share/utils";

export const useRoleChecker = () => {
  const localRole = localStorageUtil.get("role");
  return (role: UserRole) => localRole === role;
};
