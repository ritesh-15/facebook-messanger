import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/user";
import messagesReducer from "../features/messages/message";

export const store = configureStore({
  reducer: {
    user: userReducer,
    messages: messagesReducer,
  },
});
