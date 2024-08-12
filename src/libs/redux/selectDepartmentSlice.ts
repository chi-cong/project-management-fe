import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

const selectDepartmentSlice = createSlice({
  name: "selectDepartment",
  initialState,
  reducers: {
    selectDepartment: (_state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { selectDepartment } = selectDepartmentSlice.actions;

export default selectDepartmentSlice.reducer;
