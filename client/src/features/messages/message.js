import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: null,
};

const message = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setNewMessage: (state, action) => {
      return {
        messages: [...state.messages, action.payload],
      };
    },
  },
});

export const { setMessages, setNewMessage } = message.actions;
export const selectMessages = (state) => state.messages.messages;
export default message.reducer;
