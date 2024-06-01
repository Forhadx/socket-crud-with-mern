import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

let POSTS_URL = "http://localhost:5951";

export const fetchUsers = createAsyncThunk(
  "socketUser/fetchUsers",
  async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
  }
);

const socketSlice = createSlice({
  name: "socketUser",
  initialState: {
    users: [],
    status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addUser: (state: any, action: any) => {
      state.users.push(action.payload);
    },
    addHandler: (state: any, action: any) => {
      // state.users.push(action.payload);
      // state.users.unshift(action.payload);
      state.users = [action.payload, ...state.users];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state: any, action) => {
        state.status = "succeeded";
        state.users = action.payload.persons;
      })
      .addCase(fetchUsers.rejected, (state: any, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllUsers = (state: any) => state.users.users;
export const selectAllUsersStatus = (state: any) => state.users.status;
export const selectAllUsersError = (state: any) => state.users.error;

export const { addUser, addHandler } = socketSlice.actions;
export default socketSlice.reducer;
