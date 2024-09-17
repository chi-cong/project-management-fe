import { hrManagementApi } from "src/share/services/baseApi";
import { NotificationResp, Response } from "src/share/models";

const NotificationServices = hrManagementApi.injectEndpoints({
  endpoints: (build) => ({
    getInitNotis: build.query<NotificationResp, undefined>({
      query: () => {
        return {
          url: `user-notifications/get-user-notifications?items_per_page=ALL`,
          method: "GET",
        };
      },
      transformResponse: (response: Response<NotificationResp>) =>
        response.data,
    }),
  }),
});

export const { useGetInitNotisQuery } = NotificationServices;
