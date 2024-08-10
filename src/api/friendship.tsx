import { apiClient } from ".";

export async function makeFriendshipRequestApi(requesteeId: number) {
  try {
    const response = await apiClient.post(`/friendship/`, {
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
    const response = await apiClient.delete(`/friendship/`, {
      data: { id: requesteeId },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
