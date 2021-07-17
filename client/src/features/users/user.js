import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
    },
    setLogOut: (state) => {
      state.user = null;
    },
  },
});

export const { setLogin, setLogOut } = user.actions;
export const selectUser = (state) => state.user.user;
export default user.reducer;
