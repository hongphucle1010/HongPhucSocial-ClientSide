import { apiClient } from "..";
import { contactListPath, messagePath } from "../../config/apiPath";
import { GetMessageResponse, MessageListElement } from "./types";

export async function getChatList() {
  return apiClient.get<MessageListElement[]>(contactListPath);
}

export async function getMessages(id: number) {
  return apiClient.get<GetMessageResponse>(`${messagePath}/${id}`);
}
