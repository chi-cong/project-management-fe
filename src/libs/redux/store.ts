import { configureStore } from "@reduxjs/toolkit";
import { hrManagementApi } from "src/share/services";

export const store = configureStore({
  reducer: {
    [hrManagementApi.reducerPath]: hrManagementApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([hrManagementApi.middleware]),
});
