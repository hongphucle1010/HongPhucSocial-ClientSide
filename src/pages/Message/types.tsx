export interface MessageObject {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
}

export interface ChatListProfile {
  userId: number;
  content: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  avatarUrl: string;
}
