// "use client";

import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// import postsReducer from "../features/posts/postsSlice";
// import usersReducer from "../features/users/usersSlice";
import userSlice from "./userSlice";
import socketMiddleware from "../socket/socketMiddleware";
// import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    users: userSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(socketMiddleware),

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     thunk: {
  //       extraArgument: socketMiddleware,
  //     },
  //     serializableCheck: false,
  //   }),
});
