import { Dispatch } from "redux";
import { updateAvatarApi } from "../../api/profile/profile";
import { updateUserWithProfileApi } from "../../api/user/user";
import {
  Authorization,
  logInReducer,
  updateAvatar,
} from "../../lib/redux/reducers/userState";

export async function updateUserWithProfile(user: any, dispatch: Dispatch) {
  try {
    const updatedUser = await updateUserWithProfileApi(user);
    dispatch(
      logInReducer({
        user: updatedUser.data,
        role: updatedUser.data.isAdmin
          ? Authorization.ADMIN
          : Authorization.USER,
      })
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUserAvatar(formData: FormData, dispatch: Dispatch) {
  try {
    const response = await updateAvatarApi(formData);
    dispatch(updateAvatar(response.data.url));
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
