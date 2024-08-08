import type { User } from "./accountModels";

const OTaskStatus = {
  Todo: 0,
  OnProgress: 1,
  Done: 2,
} as const;

export interface Task {
  task_id: string;
  description: string;
  document: string[];
  createdBy: string;
  modifiedBy: string;
  createdAt: string;
}

export interface TaskResp {
  data: Task[];
  total: number;
  nextPage: number;
  previousPage: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface Activity {
  activity_id?: string;
  description?: string;
  createdBy?: string;
  modifiedBy?: string;
  createdAt?: string;
  user?: User;
}

export interface ActivityResp {
  data: Activity[];
  total: number;
  nextPage: number;
  previousPage: number;
  currentPage: number;
  itemsPerPage: number;
}
