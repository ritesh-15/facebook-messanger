import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/user";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
