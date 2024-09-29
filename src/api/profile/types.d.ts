import { FriendshipStatus } from "../friendship/types";

export interface Profile {
  id: number;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  userId: number;
}

export interface UploadAvatarResponse {
  message: string;
  url: string;
}
export interface GetProfileResponse {
  username: string;
  profile: Omit<Profile, "id">;
  friendStatus: FriendshipStatus;
}

export interface ProfileWithUsername extends Profile {
  user: {
    username: string;
  };
}
