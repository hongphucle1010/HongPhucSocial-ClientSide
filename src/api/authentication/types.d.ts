import { User, UserWithProfile } from "../user/types";

export interface LogInResponse {
  token: string;
  user: User;
}

export interface SignUpResponse {
  message: string;
  user: UserWithProfile;
}

export interface StatusResponse {
  message: string;
  user: {
    id: number;
    username: string;
    iat: number;
    exp: number;
  };
}
