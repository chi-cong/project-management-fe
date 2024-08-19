import { configureStore } from "@reduxjs/toolkit";
import { hrManagementApi } from "src/share/services";
import taskAssignReducer from "./taskAssignSlice";
import selectProjectReducer from "./selectProjectSlice";
import selectDepartmentReducer from "./selectDepartmentSlice";
import drawerReducer from "./drawerSlice";

export const store = configureStore({
  reducer: {
    [hrManagementApi.reducerPath]: hrManagementApi.reducer,
    taskAssignment: taskAssignReducer,
    selectedProject: selectProjectReducer,
    selectedDepartment: selectDepartmentReducer,
    openDrawer: drawerReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([hrManagementApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
