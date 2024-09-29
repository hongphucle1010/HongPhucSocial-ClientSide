import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserWithProfile } from "../../../api/user/types";

export const enum Authorization {
  GUEST,
  USER,
  ADMIN,
}

type UserType = UserWithProfile | undefined;

export interface AuthorizationState {
  user: UserType;
  role: Authorization;
}

const authorization = createSlice({
  name: "authorization",
  initialState: {
    value: {
      user: undefined as UserType,
      role: Authorization.GUEST,
    },
  },
  reducers: {
    logOutReducer: (state) => {
      state.value.user = undefined;
      state.value.role = Authorization.GUEST;
    },
    logInReducer: (state, action: PayloadAction<AuthorizationState>) => {
      state.value = action.payload;
    },
    updateAvatar: (state, action: PayloadAction<AuthorizationState>) => {
      if (state.value.user) {
        (state.value.user as any).profile.avatarUrl = action.payload;
      }
    },
  },
});

export const { logOutReducer, logInReducer, updateAvatar } =
  authorization.actions;

export default authorization.reducer;
