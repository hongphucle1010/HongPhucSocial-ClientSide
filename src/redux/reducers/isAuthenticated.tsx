import { createSlice } from "@reduxjs/toolkit";

export const enum Authorization {
  GUEST,
  USER,
  ADMIN,
}

const authorization = createSlice({
  name: "authorization",
  initialState: {
    value: Authorization.GUEST,
  },
  reducers: {
    logOut: (state) => {
      state.value = Authorization.GUEST;
    },
    logIn: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { logOut, logIn } = authorization.actions;

export default authorization.reducer;
