import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
};

const socket = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { setSocket } = socket.actions;
export const selectSocket = (state) => state.socket.socket;
export default socket.reducer;
