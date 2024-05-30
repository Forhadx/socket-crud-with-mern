// socketSlice.js
import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    users: [],
  },
  reducers: {
    addUser: (state: any, action: any) => {
      state.users.push(action.payload);
    },
  },
});

export const { addUser } = socketSlice.actions;
export default socketSlice.reducer;
