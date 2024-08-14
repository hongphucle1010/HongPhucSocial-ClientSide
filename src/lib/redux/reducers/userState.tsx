import { createSlice } from "@reduxjs/toolkit";

export const enum Authorization {
  GUEST,
  USER,
  ADMIN,
}

const authorization = createSlice({
  name: "authorization",
  initialState: {
    value: {
      user: null,
      role: Authorization.GUEST,
    },
  },
  reducers: {
    logOutReducer: (state) => {
      state.value.user = null;
      state.value.role = Authorization.GUEST;
    },
    logInReducer: (state, action) => {
      state.value = action.payload;
    },
    updateAvatar: (state, action) => {
      if (state.value.user) {
        (state.value.user as any).profile.avatarUrl = action.payload;
      }
    },
  },
});

export const { logOutReducer, logInReducer, updateAvatar } = authorization.actions;

export default authorization.reducer;
