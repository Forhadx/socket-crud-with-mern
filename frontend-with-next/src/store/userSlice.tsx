// socketSlice.js
import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socketUser",
  initialState: {
    users: [{ name: "forhad", age: "22" }],
  },
  reducers: {
    addUser: (state: any, action: any) => {
      state.users.push(action.payload);
    },
  },
});

export const selectAllUsers = (state: any) => state.users.users;

export const { addUser } = socketSlice.actions;
export default socketSlice.reducer;
