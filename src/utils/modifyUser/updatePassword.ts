import { updateUserPasswordApi } from "../../api/user/user";
import { UPDATE_PASSWORD_SUCCESS } from "../../config/responseCode";

export async function updatePassword(password: string, newPassword: string) {
  try {
    const response = await updateUserPasswordApi(password, newPassword);
    if (response.status !== UPDATE_PASSWORD_SUCCESS) {
      throw response.data.message;
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
