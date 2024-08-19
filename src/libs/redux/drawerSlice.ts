import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

const drawerSlice = createSlice({
  name: "openDrawer",
  initialState,
  reducers: {
    openDrawer: (_state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export const { openDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
