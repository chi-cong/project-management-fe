import { hrManagementApi } from "src/share/services/baseApi";
import { NotificationResp, Response } from "src/share/models";

const NotificationServices = hrManagementApi.injectEndpoints({
  endpoints: (build) => ({
    getInitNotis: build.query<NotificationResp, undefined>({
      query: () => {
        return {
          url: `user-notifications/get-user-notifications?items_per_page=20`,
          method: "GET",
        };
      },
      transformResponse: (response: Response<NotificationResp>) =>
        response.data,
    }),
    markAsRead: build.mutation<NotificationResp, { id: string }>({
      query: ({ id }) => {
        return {
          url: `user-notifications/mark-as-read/${id}`,
          method: "PUT",
        };
      },
    }),
    markAllAsRead: build.mutation<NotificationResp, null>({
      query: () => {
        return {
          url: `user-notifications/read-many`,
          method: "PUT",
        };
      },
    }),
  }),
});

export const {
  useGetInitNotisQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} = NotificationServices;
