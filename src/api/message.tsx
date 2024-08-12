import { apiClient } from ".";
import { contactListPath, messagePath } from "../config/api/api";

export async function getChatList() {
  return apiClient.get(contactListPath);
}

export async function getMessages(id: number) {
  return apiClient.get(`${messagePath}/${id}`);
}
