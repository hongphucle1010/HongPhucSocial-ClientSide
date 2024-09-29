import { apiClient } from "..";
import { ResponseWithMessage } from "../../lib/types/response";
import { FriendshipResponse, FriendsList } from "./types";

export async function makeFriendshipRequestApi(requesteeId: number) {
  try {
    const response = await apiClient.post<FriendshipResponse>(`/friendship/`, {
      requesteeId,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteFriendshipRequestApi(requesteeId: number) {
  try {
    const response = await apiClient.delete<ResponseWithMessage>(
      `/friendship/`,
      {
        data: { id: requesteeId },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getFriendsListApi() {
  try {
    const response = await apiClient.get<FriendsList>(`/friendship/list`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
