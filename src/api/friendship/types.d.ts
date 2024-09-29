export type FriendshipStatus =
  | "none"
  | "pendingToBeAccepted"
  | "pendingToAccept"
  | "accepted"
  | "rejected";

export interface FriendsListData {
  userId: number;
  username: string;
  profile: {
    avatarUrl: string | null;
    firstName: string | null;
    lastName: string | null;
  };
}

export interface FriendsList {
  friendsList: FriendsListData[];
}

export interface FriendshipResponse {
  message: string;
  status: FriendshipStatus;
}
