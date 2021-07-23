import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const message = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setAllMessages: (state, action) => {
      return {
        messages: action.payload,
      };
    },
    setNewMessage: (state, action) => {
      return {
        messages: [...state.messages, action.payload],
      };
    },
  },
});

export const { setAllMessages, setNewMessage } = message.actions;
export const selectMessages = (state) => state.messages.messages;
export default message.reducer;
