import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { sessionStorageUtil } from "src/share/utils";

const baseAPI = import.meta.env.VITE_REQUEST_API_URL;

const accessToken = () => sessionStorageUtil.get("accessToken");

export const hrManagementApi = createApi({
  reducerPath: "hrManagementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseAPI,
    prepareHeaders: (headers) => {
      if (accessToken()) {
        headers.set("authorization", accessToken() as string);
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
