import { apiClient } from "..";
import { updateAvatarPath } from "../../config/apiPath";
import { GetProfileResponse, UploadAvatarResponse } from "./types";

export async function updateAvatarApi(formData: FormData) {
  try {
    const response = await apiClient.post<UploadAvatarResponse>(
      updateAvatarPath,
      formData
    );
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
    const response = await apiClient.get<GetProfileResponse>(
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
