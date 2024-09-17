import { hrManagementApi } from "src/share/services/baseApi";

const NotificationServices = hrManagementApi.injectEndpoints({
  endpoints: (build) => ({
    getInitNotis: build.query<[{ content: string }], undefined>({
      query: () => {
        return {
          url: `user-notifications/get-user-notifications?items_per_page=ALL`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetInitNotisQuery } = NotificationServices;
