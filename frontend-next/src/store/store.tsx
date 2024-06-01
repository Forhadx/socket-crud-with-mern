import { configureStore } from "@reduxjs/toolkit";
// import postsReducer from "../features/posts/postsSlice";
// import usersReducer from "../features/users/usersSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
  },
});
