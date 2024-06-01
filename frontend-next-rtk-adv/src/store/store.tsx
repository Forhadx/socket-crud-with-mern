import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import socketMiddleware from "../socket/socketMiddleware";

export const store = configureStore({
  reducer: {
    users: userSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(socketMiddleware),
});
