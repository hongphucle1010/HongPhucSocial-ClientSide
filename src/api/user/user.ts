import { apiClient } from "..";
import { updatePasswordPath, updateUserPath } from "../../config/apiPath";
import { UserWithProfile } from "./types";

export async function updateUserWithProfileApi(user: any) {
  try {
    console.log(user);
    const response = await apiClient.put<UserWithProfile>(updateUserPath, user);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUserPasswordApi(
  password: string,
  newPassword: string
) {
  try {
    const response = await apiClient.put<{ message: string }>(
      updatePasswordPath,
      {
        password,
        newPassword,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
