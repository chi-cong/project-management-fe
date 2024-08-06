import type { Dayjs } from "dayjs";
import { Task, User } from "src/share/models";

export interface Project {
  project_id?: string;
  name?: string;
  projectCode?: string;
  description?: string;
  startAt?: string | Dayjs;
  endAt?: string | Dayjs;
  turnover?: boolean;
  document?: string[];
  investor?: string;
  createdBy?: string;
  modifiedBy?: string;
  createdAt?: string | Dayjs;
  project_manager_id?: string;
  department_id?: string;
  total_staff?: string;
  total_task?: {
    total_task_is_done: string;
    total_task_is_not_done: string;
  };
  client_ownership?: {
    client_id: string;
    fullname: string;
    email: string;
    avatar: string;
    address: string;
    phone: string;
    createdBy: string;
    modifiedBy: string;
    createdAt: string | Dayjs;
    updatedAt: string | Dayjs;
    deletedAt: string | Dayjs;
    deletedMark: boolean;
  };
}

export interface ProjectProperty {
  project_property_id: string;
  project_id: string;
  department_id: string;
  client_id: string;
}

export interface ProjectResp {
  data: Project[];
  total?: number;
  nextPage?: number;
  previousPage?: number;
  currentPage?: number;
  itemsPerPage?: number;
}

export interface Client {
  client_id: string;
  fullname: string;
  email: string;
  avatar: string;
  address: string;
  phone: string;
  createdBy: string;
  modifiedBy: string;
  ProjectProperty: ProjectProperty[];
}

export interface Assignment {
  assignment_id?: string;
  user_id?: string;
  project_id?: string;
  task_id?: string;
  startAt?: string | Dayjs;
  endAt?: string | Dayjs;
  status?: boolean;
  createdBy?: string;
  createdAt?: string | Dayjs;
  task?: Task;
  user?: User;
  project?: Project;
}

export interface AssignmentResp {
  assignments: Assignment[];
  total: number;
  nextPage?: number;
  previousPage?: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface ProjectReportResp {
  project_id?: string;
  name?: string;
  projectCode?: string;
  description?: string;
  startAt?: string | Dayjs | unknown;
  endAt?: string | Dayjs | unknown;
  turnover?: string;
  document?: string[];
  investor?: string;
  createdBy?: string;
  modifiedBy?: string;
  createdAt?: string;
  ProjectProperty: ProjectProperty;
  information?: {
    total_user: number;
    total_task: {
      total_task_is_done: number;
      total_task_is_not_done: number;
    };
  };
  tasks: {
    task_id: string;
    description?: string;
    document: [];
    createdBy: string;
    modifiedBy: null;
    createdAt: string;
    TaskProperty: {
      task_property_id: string;
      task_id: string;
    };
    activities: Record<
      string,
      {
        activity_id?: string;
        description?: string;
        createdBy?: string;
        modifiedBy?: string;
        createdAt?: string;
        ActivityProperty?: {
          activity_property_id?: string;
          user_property_id?: string;
          activity_id?: string;
        };
        user_information: User;
      }[]
    >[];
  }[];
}
