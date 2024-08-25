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
