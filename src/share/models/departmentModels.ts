import { RoleResp, User } from "src/share/models/accountModels";
export interface getDepartmentsResp {
  total?: number;
  nextPage?: boolean;
  peviousPage?: boolean;
  currentPage?: number;
  itemsPerPage?: number;
  departments?: Department[];
}

export interface DepartInformation {
  total_staff?: number;
  manager?: User;
}
export interface Department {
  department_id?: string;
  name?: string;
  description?: string;
  createdBy?: string;
  createdAt?: string;
  manager_id?: string;
  manager_info: User;
  information?: DepartInformation;
}

export interface manager {
  user_id?: string;
  username?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  name?: string;
  birthday?: string;
  createdAt?: string;
  createBy?: string;
  deletedMark?: boolean;
  userProperty?: UserProperty;
}

export interface UserProperty {
  user_property_id?: string;
  department_id?: string;
  role?: RoleResp;
}

export interface AddDepartmentForm {
  name: string;
  description: string;
  manager_id: string;
  list_user_ids: string[];
}
