import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/user";
import messagesReducer from "../features/messages/message";
import socketReducer from "../features/socket/socket";

export const store = configureStore({
  reducer: {
    user: userReducer,
    messages: messagesReducer,
    socket: socketReducer,
  },
});
