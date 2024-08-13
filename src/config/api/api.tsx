const host = import.meta.env.VITE_HOST || "https://peaceful-melli-hongphucle-2e1bb2e3.koyeb.app";

export const apiHost = `${host}/api/v1`;
export const socketHost = host;

// Authentication
export const logInPath = "/auth/login";
export const signUpPath = "/auth/signup";
export const getStatusPath = "/auth/status";

// Profile
export const updateUserInfoPath = "/user";
export const updateUserPath = "/user";
export const updatePasswordPath = "/user/password";
export const updateAvatarPath = "/profile/upload/avatar";

// Friendship
export const friendshipPath = "/friendship";

// Message
export const messagePath = "/message";
export const contactListPath = "/messageList";
