import { Profile } from "../profile/types";

export interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserWithProfile extends User {
  profile: Profile;
}
