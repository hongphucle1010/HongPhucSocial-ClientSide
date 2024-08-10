import { apiClient } from ".";
import { updateAvatarPath } from "../config/api/api";

export async function updateAvatarApi(formData: FormData) {
  try {
    const response = await apiClient.post(updateAvatarPath, formData);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getProfileByUsernameApi(
  username: string,
  currentUserId?: number
) {
  try {
    const response = await apiClient.get(
      `/profile/${username}${
        currentUserId ? `?currentUserId=${currentUserId}` : ""
      }`
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
