import { Dispatch } from "redux";
import { getStatusApi, logInApi, signUpApi } from "../../api/authentication/authentication";
import {
  logInReducer,
  logOutReducer,
  Authorization,
} from "../../lib/redux/reducers/userState";

export function setToken(token: string) {
  console.log("Set token: ", token);
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export async function logIn(
  email: string,
  password: string,
  dispatch: Dispatch
) {
  try {
    const response = await logInApi(email, password);
    if (response?.status !== 200) {
      throw new Error(response?.data.message);
    }
    setToken(response.data.token);
    dispatch(
      logInReducer({
        user: response.data.user,
        role: response.data.user.isAdmin
          ? Authorization.ADMIN
          : Authorization.USER,
      })
    );
    return response;
  } catch (error: Error | any) {
    throw error.response;
  }
}

export function logOut(dispatch: Dispatch) {
  localStorage.removeItem("token");
  dispatch(logOutReducer());
}

export async function signUp(email: string, password: string, name: string) {
  try {
    const response = await signUpApi(email, password, name);
    return response;
  } catch (error: Error | any) {
    return error.response;
  }
}

export async function initStatus(dispatch: Dispatch) {
  try {
    const response = await getStatusApi();
    if (!response?.data.user) {
      logOut(dispatch);
    }
    return response;
  } catch (error: Error | any) {
    return error.response;
  }
}
