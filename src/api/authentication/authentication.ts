import { getStatusPath, logInPath, signUpPath } from "../../config/apiPath";
import { getToken } from "../../utils/authentication/authentication";
import { apiClient } from "..";

function setAuthToken(token: string | null) {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
}

export async function logInApi(email: string, password: string) {
  try {
    setAuthToken(getToken());
    const response = await apiClient.post(logInPath, {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function signUpApi(
  email: string,
  username: string,
  password: string
) {
  try {
    const response = await apiClient.post(signUpPath, {
      email,
      username,
      password,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getStatusApi() {
  try {
    setAuthToken(getToken());
    const response = await apiClient.get(getStatusPath);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
