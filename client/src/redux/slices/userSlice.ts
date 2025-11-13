import { createSlice,  } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"
export interface User {
  id: string;
  name: string;
  email: string;
  profile?: string;
}

export interface UserState {
  user: User | null;
  isLogging: boolean;
}

const initialState: UserState = {
  user: null,
  isLogging: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
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
