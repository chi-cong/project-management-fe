import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

const selectProjectSlice = createSlice({
  name: "selectProject",
  initialState,
  reducers: {
    selectProject: (_state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { selectProject } = selectProjectSlice.actions;

export default selectProjectSlice.reducer;
