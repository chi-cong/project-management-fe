import { OUserRole } from "src/share/models";

import type { DefaultOptionType } from "antd/es/select";

export const userRoleOptions: DefaultOptionType[] = [
  { label: "Admin", value: OUserRole.Admin },
  { label: "Manager", value: OUserRole.Manager },
  { label: "Staff", value: OUserRole.Staff },
];
export const filterRoleOptions: DefaultOptionType[] = [
  { label: "All", value: OUserRole.All },
  { label: "Admin", value: OUserRole.Admin },
  { label: "Manager", value: OUserRole.Manager },
  { label: "Staff", value: OUserRole.Staff },
];
