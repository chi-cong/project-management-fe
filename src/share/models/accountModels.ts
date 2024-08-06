import { Dayjs } from "dayjs";

export const OUserRole = {
  All: "ALL",
  Admin: "ADMIN",
  Manager: "MANAGER",
  Staff: "STAFF",
  ProjectManager: "PROJECT_MANAGER",
} as const;

export type UserRole = (typeof OUserRole)[keyof typeof OUserRole];

export interface User {
  user_id?: string;
  username?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  name?: string;
  birthday?: string | Dayjs;
  createdAt?: string;
  createBy?: string;
  role?: RoleResponse | UserRole;
  department_id?: string;
}

export interface RoleResponse {
  name: UserRole;
  role_id: string;
}

export interface GetUserResp {
  currentPage: number;
  itemsPerPage: number;
  nextPage?: number;
  previousPage?: number;
  total: number;
  users: User[];
}

export interface LoginResp {
  role: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface RoleResp {
  role_id?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: null;
}

export interface CreateUserPartial {
  username: string;
  email: string;
  password: string;
  name?: string;
  role: UserRole;
  department_id?: string;
  phone?: string;
  birthday?: string | Dayjs;
}
