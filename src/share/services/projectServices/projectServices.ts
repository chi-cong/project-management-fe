import { Dayjs } from "dayjs";
import type {
  ProjectResp,
  Response,
  Project,
  TaskResp,
  Assignment,
  Activity,
  Task,
  AssignmentResp,
  ProjectReportResp,
  ActivityResp,
  GetUserResp,
} from "src/share/models";
import { hrManagementApi } from "src/share/services";
import { localStorageUtil } from "src/share/utils";

const accessToken = () => localStorageUtil.get("accessToken");

const projectServices = hrManagementApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProject: build.query<
      ProjectResp,
      {
        page: number;
        items_per_page: number | undefined;
      }
    >({
      query: ({ page, items_per_page }) => {
        return {
          url: `projects/admin/get-all`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
          params: {
            page,
            items_per_page,
          },
        };
      },
      transformResponse: (response: Response<ProjectResp>) => response.data,
      providesTags: ["project"],
    }),
    createProject: build.mutation<boolean, Partial<Project>>({
      query: (body) => {
        return {
          url: `projects/create`,
          method: "POST",
          headers: {
            authorization: accessToken(),
          },
          body,
        };
      },
      transformResponse: (response: Response<boolean>) => response.data,
      invalidatesTags: ["project"],
    }),
    updateProject: build.mutation<
      Project,
      Partial<{ values: Project; projectId: string }>
    >({
      query: (body) => {
        return {
          url: `projects/update/${body.projectId}`,
          method: "PUT",
          headers: {
            authorization: accessToken(),
          },
          body: body.values,
        };
      },
      transformResponse: (response: Response<Project>) => response.data,
      invalidatesTags: ["project"],
    }),
    deleteProject: build.mutation<boolean, Partial<string>>({
      query: (body) => {
        return {
          url: `projects/delete/${body}`,
          method: "DELETE",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      transformResponse: (response: Response<boolean>) => response.data,
      invalidatesTags: ["project"],
    }),
    getClient: build.query<ProjectResp, { page: number }>({
      query: ({ page }) => {
        return {
          url: `projects/admin/get-all`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
          params: {
            page,
          },
        };
      },
      transformResponse: (response: Response<ProjectResp>) => response.data,
      providesTags: ["project"],
    }),
    createAssigment: build.mutation<
      Assignment,
      Partial<{
        user_id?: string;
        project_id: string;
        task_id?: string;
        endAt?: string | Dayjs;
      }>
    >({
      query({ user_id, project_id, task_id }) {
        return {
          url: "assignments/create",
          method: "POST",
          headers: {
            authorization: accessToken(),
          },
          body: {
            project_id,
            task_id,
            user_id: user_id ? user_id : null,
          },
        };
      },
      transformErrorResponse: (response: Response<Assignment>) => response.data,
      invalidatesTags: ["assignment", "project", "task"],
    }),
    createTask: build.mutation<
      Task,
      Partial<{
        description: string;
      }>
    >({
      query(body) {
        return {
          url: "tasks/create",
          method: "POST",
          headers: {
            authorization: accessToken(),
          },
          body,
        };
      },
      transformResponse: (response: Response<Task>) => response.data,
    }),
    getTaskActivity: build.query<
      Activity[],
      {
        page?: number;
        search?: string;
        items_per_page?: number | "ALL";
        taskId?: string;
      }
    >({
      query({ page, search, items_per_page, taskId }) {
        return {
          url: `activities/get-all-activities/${taskId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
          params: {
            page: page || "1",
            search: search ? search : "",
            items_per_page: items_per_page || "10",
          },
        };
      },
      transformResponse: (response: Response<ActivityResp>) =>
        response.data.data,
      providesTags: ["activity"],
    }),
    createActivity: build.mutation<
      Response<boolean>,
      Partial<{
        description?: string;
        task_id?: string;
      }>
    >({
      query(body) {
        return {
          url: `activities/create`,
          method: "POST",
          headers: {
            authorization: accessToken(),
          },
          body,
        };
      },
      invalidatesTags: ["activity"],
    }),
    getDocFile: build.mutation<string, Partial<{ file: string }>>({
      query(body) {
        return {
          url: "upload/get-file",
          method: "POST",
          headers: {
            authorization: accessToken(),
          },
          body,
        };
      },
      transformResponse: (response: Response<string>) => response.data,
    }),
    updateTask: build.mutation<
      Response<boolean>,
      {
        value: { description: string };
        taskId: string;
      }
    >({
      query({ taskId, value }) {
        return {
          url: `tasks/update/${taskId}`,
          method: "PUT",
          headers: {
            authorization: accessToken(),
          },
          body: value,
        };
      },
      invalidatesTags: ["task"],
    }),
    updateAssignment: build.mutation<
      Response<boolean>,
      {
        value: {
          status?: boolean;
          endAt?: string | Dayjs;
          user_id?: string;
        };
        assignmentId: string;
      }
    >({
      query({ assignmentId, value }) {
        return {
          url: `assignments/update/${assignmentId}`,
          method: "PUT",
          headers: {
            authorization: accessToken(),
          },
          body: {
            status: value.status,
            endAt: value.endAt ? value.endAt : null,
            user_id: value.user_id ? value.user_id : null,
          },
        };
      },
      invalidatesTags: ["assignment", "project"],
    }),
    getProjectReports: build.query<
      ProjectReportResp,
      {
        projectId?: string;
      }
    >({
      query({ projectId }) {
        return {
          url: `report/report-for-project/${projectId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      transformResponse: (response: Response<ProjectReportResp>) =>
        response.data,
      providesTags: ["activity", "task"],
    }),
    getDepartmentProjectInfo: build.query<
      { data: Project[] },
      {
        departmentId?: string;
      }
    >({
      query({ departmentId }) {
        return {
          url: `/projects/get-all-info-project-in-department/${departmentId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      transformResponse: (response: Response<{ data: Project[] }>) =>
        response.data,
      providesTags: ["project"],
    }),
    getUserProjectInDepartment: build.query<ProjectReportResp, void>({
      query() {
        return {
          url: `/projects/get-all-user-project-in-department`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      transformResponse: (response: Response<ProjectReportResp>) =>
        response.data,
      providesTags: ["activity", "task"],
    }),
    getProjectStaffs: build.query<
      GetUserResp,
      {
        projectId?: string;
        page?: number;
        items_per_page?: number | "ALL";
      }
    >({
      query({ projectId, page, items_per_page }) {
        return {
          url: `/users/get-all-staff-in-project/${projectId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
          params: {
            page: page || "1",
            items_per_page: items_per_page || "10",
          },
        };
      },
      transformResponse: (response: Response<GetUserResp>) => response.data,
    }),
    getAssignments: build.query<
      AssignmentResp,
      {
        items_per_page?: number | "ALL";
        page?: number;
        target?: "user" | "project" | "task";
        status?: boolean;
        isAssignment?: boolean;
        targetId: string;
      }
    >({
      query({ items_per_page, page, target, isAssignment, targetId }) {
        return {
          url: `/assignments/get-all-assignment/${targetId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
          params: {
            page: page || 1,
            items_per_page: items_per_page || 10,
            target: target || "",
            isAssignment: isAssignment || false,
          },
        };
      },
      transformResponse: (response: Response<AssignmentResp>) => response.data,
      providesTags: ["assignment"],
    }),
    deleteAssignment: build.mutation<
      Response<boolean>,
      Partial<{
        assigmentId?: string;
      }>
    >({
      query({ assigmentId }) {
        return {
          url: `assignments/delete/${assigmentId}`,
          method: "DELETE",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      invalidatesTags: ["assignment"],
    }),
    deleteTask: build.mutation<
      Response<boolean>,
      Partial<{
        taskId?: string;
      }>
    >({
      query({ taskId }) {
        return {
          url: `tasks/admin/delete/${taskId}`,
          method: "DELETE",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      invalidatesTags: ["task"],
    }),
    updateActivity: build.mutation<
      Response<string>,
      Partial<{
        activityId?: string;
        value: {
          description: string;
        };
      }>
    >({
      query({ activityId, value }) {
        return {
          url: `/activities/update/${activityId}`,
          method: "PUT",
          headers: {
            authorization: accessToken(),
          },
          body: value,
        };
      },
      invalidatesTags: ["activity"],
    }),
    deleteActivity: build.mutation<
      Response<string>,
      Partial<{
        activityId?: string;
      }>
    >({
      query({ activityId }) {
        return {
          url: `/activities/admin/delete/${activityId}`,
          method: "DELETE",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      invalidatesTags: ["activity"],
    }),
    getProjectTasks: build.query<
      TaskResp,
      {
        projectId?: string;
        page: number;
        items_per_page: number | "ALL";
      }
    >({
      query({ projectId, page, items_per_page }) {
        return {
          url: `tasks/get-all-task-in-project/${projectId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
          params: {
            page,
            items_per_page,
          },
        };
      },
      transformResponse: (response: Response<TaskResp>) => response.data,
      providesTags: ["task"],
    }),
    getUserProject: build.query<
      ProjectResp,
      {
        page: number;
        items_per_page: number | "ALL";
      }
    >({
      query({ page, items_per_page }) {
        return {
          url: `projects/get-all-user-project`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
          params: {
            page,
            items_per_page,
          },
        };
      },
      transformResponse: (response: Response<ProjectResp>) => response.data,
      providesTags: ["project"],
    }),
  }),
});

export const {
  useGetAllProjectQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
  useCreateAssigmentMutation,
  useCreateTaskMutation,
  useGetTaskActivityQuery,
  useGetDocFileMutation,
  useGetProjectReportsQuery,
  useCreateActivityMutation,
  useUpdateTaskMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
  useDeleteTaskMutation,
  useGetProjectStaffsQuery,
  useGetAssignmentsQuery,
  useGetProjectTasksQuery,
  useUpdateActivityMutation,
  useDeleteActivityMutation,
  useGetUserProjectInDepartmentQuery,
  useGetDepartmentProjectInfoQuery,
  useGetUserProjectQuery
} = projectServices;
