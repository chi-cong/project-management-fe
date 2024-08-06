import { hrManagementApi } from "src/share/services";
import { localStorageUtil } from "src/share/utils";
import type {
  Response,
  getDepartmentsResp,
  Department,
  ProjectReportResp,
} from "src/share/models";
import { AddDepartmentForm } from "src/share/models/departmentModels";
import { ProjectResp } from "src/share/models/projectModels";
import { GetUserResp } from "src/share/models";
const accessToken = () => localStorageUtil.get("accessToken");

export const DepartmentServices = hrManagementApi.injectEndpoints({
  endpoints: (build) => ({
    getDepartments: build.query<
      getDepartmentsResp,
      { itemsPerPage?: number | "ALL"; page?: number; search?: string }
    >({
      query: ({ itemsPerPage, page, search }) => {
        return {
          url: `departments/admin/get-all`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
          params: {
            items_per_page: itemsPerPage ? itemsPerPage : 10,
            page: page ? page : 1,
            search: search ? search : "",
          },
        };
      },
      transformResponse: (response: Response<getDepartmentsResp>) =>
        response.data,
      providesTags: ["department"],
    }),

    deleteDepartments: build.mutation<
      Response<Department>,
      Partial<{ departmentId: string }>
    >({
      query({ departmentId }) {
        return {
          url: `departments/admin/delete/${departmentId}`,
          method: "DELETE",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      invalidatesTags: ["department"],
    }),
    addDepartment: build.mutation<
      Response<Department>,
      Partial<AddDepartmentForm>
    >({
      query(body) {
        return {
          url: `departments/admin/create`,
          method: "POST",
          headers: {
            authorization: accessToken(),
          },
          body,
        };
      },
      invalidatesTags: ["department"],
    }),
    updateManagerDepartment: build.mutation<
      Response<{ data: boolean }>,
      { departmentId?: string; managerId?: string }
    >({
      query({ departmentId, managerId }) {
        return {
          url: `departments/admin/update/${departmentId}`,
          method: "PUT",
          headers: {
            authorization: accessToken(),
          },
          body: { manager_id: managerId },
        };
      },
      invalidatesTags: ["department", "User"],
    }),
    getReportDepartments: build.query<
      ProjectReportResp[],
      { departmentId?: string }
    >({
      query: ({ departmentId }) => {
        return {
          url: `report/report-for-department/${departmentId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      transformResponse: (response: Response<ProjectReportResp[]>) =>
        response.data,
    }),
    getAllProjectDepartment: build.query<
      ProjectResp,
      { departmentId?: string }
    >({
      query: ({ departmentId }) => {
        return {
          url: `projects/get-all-project-in-department/${departmentId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      transformResponse: (response: Response<ProjectResp>) => response.data,
      providesTags: ["project"],
    }),
    deleteStaffDepartment: build.mutation<
      Response<{ count: number }>,
      { departmentId?: string; listStaff?: string[] }
    >({
      query({ departmentId, listStaff }) {
        return {
          url: `users/remove-staff-from-department/${departmentId}`,
          method: "POST",
          headers: {
            authorization: accessToken(),
          },
          body: {
            list_user_ids: listStaff,
          },
        };
      },
      invalidatesTags: ["department", "User"],
    }),
    updateDepartment: build.mutation<
      Response<Department>,
      Partial<{ body: Department; departmentId: string }>
    >({
      query({ departmentId, body }) {
        return {
          url: `departments/admin/update/${departmentId}`,
          method: "PUT",
          headers: {
            authorization: accessToken(),
          },
          body,
        };
      },
      invalidatesTags: ["department", "User"],
    }),
    addStaffDepartment: build.mutation<
      Response<{ count: number }>,
      { departmentId?: string; listStaff?: (string | undefined)[] }
    >({
      query({ departmentId, listStaff }) {
        return {
          url: `users/add-user-into-department/${departmentId}`,
          method: "POST",
          headers: {
            authorization: accessToken(),
          },
          body: {
            list_user_ids: listStaff,
          },
        };
      },
      invalidatesTags: ["department", "User"],
    }),
    getDetailDepartment: build.query<Department, { departmentId?: string }>({
      query: ({ departmentId }) => {
        return {
          url: `departments/detail/${departmentId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      transformResponse: (response: Response<Department>) => response.data,
    }),
    managerGetAllStaffDepartment: build.query<
      GetUserResp,
      { departmentId?: string; managerId?: string }
    >({
      query: ({ departmentId, managerId }) => {
        return {
          url: `users/get-All-Staff-In-Department`,
          method: "POST",
          headers: {
            authorization: accessToken(),
          },
          body: {
            department_id: departmentId,
            manager_id: managerId,
          },
        };
      },
      transformResponse: (response: Response<GetUserResp>) => response.data,
      providesTags: ["User"],
    }),

    ManagerGetStaffNoDepartment: build.query<GetUserResp, { search?: string }>({
      query: ({ search }) => {
        return {
          url: "/users/get-a-list-of-staff-do-not-have-departments",
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
          params: {
            search: search || "",
          },
        };
      },
      transformResponse: (response: Response<GetUserResp>) => response.data,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useDeleteDepartmentsMutation,
  useAddDepartmentMutation,
  useUpdateManagerDepartmentMutation,
  useGetReportDepartmentsQuery,
  useGetAllProjectDepartmentQuery,
  useDeleteStaffDepartmentMutation,
  useAddStaffDepartmentMutation,
  useGetDetailDepartmentQuery,
  useManagerGetAllStaffDepartmentQuery,
  useManagerGetStaffNoDepartmentQuery,
  useUpdateDepartmentMutation,
} = DepartmentServices;
