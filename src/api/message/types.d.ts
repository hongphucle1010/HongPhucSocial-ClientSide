import { ProfileWithUsername } from "../profile/types";

export interface MessageListElement {
  userId: number;
  content: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  createdAt: string;
}

interface MessageObject {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
}

export interface GetMessageResponse {
  messageList: MessageObject[];
  userProfile: ProfileWithUsername;
}
