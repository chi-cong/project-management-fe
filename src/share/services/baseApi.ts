import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { localStorageUtil, sessionStorageUtil } from "src/share/utils";

const baseAPI = import.meta.env.VITE_REQUEST_API_URL;

const accessToken = () => sessionStorageUtil.get("accessToken");
const refreshToken = () => localStorageUtil.get("refreshToken");

export const hrManagementApi = createApi({
  reducerPath: "hrManagementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseAPI,
    prepareHeaders: (headers) => {
      if (accessToken()) {
        headers.set("authorization", accessToken() as string);
      }
      if (refreshToken()) {
        headers.set("x-rftoken-id", refreshToken() as string);
      }
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "userDetail",
    "department",
    "project",
    "task",
    "activity",
    "assignment",
  ],
  endpoints: () => ({}),
});
