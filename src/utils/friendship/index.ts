import { makeFriendshipRequestApi } from "../../api/friendship/friendship";

export async function makeFriendshipRequest(requesteeId: number) {
  try {
    const response = await makeFriendshipRequestApi(requesteeId);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
