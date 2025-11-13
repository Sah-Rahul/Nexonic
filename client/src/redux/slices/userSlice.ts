import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLogging: false,
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isLogging = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLogging = false;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
