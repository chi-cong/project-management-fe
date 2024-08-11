import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Assignment, Task } from "src/share/models";

type TaskAssignment = { task?: Task; assignment?: Assignment };

const initialState: TaskAssignment = { task: undefined, assignment: undefined };

const taskAssignSlice = createSlice({
  name: "taskAssign",
  initialState,
  reducers: {
    selectTaskAssign: (_state, action: PayloadAction<TaskAssignment>) => {
      return {
        task: action.payload.task,
        assignment: action.payload.assignment,
      };
    },
  },
});

export const { selectTaskAssign } = taskAssignSlice.actions;

export default taskAssignSlice.reducer;
