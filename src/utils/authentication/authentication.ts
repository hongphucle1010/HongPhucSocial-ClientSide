import { Dispatch } from "redux";
import {
  getStatusApi,
  logInApi,
  signUpApi,
} from "../../api/authentication/authentication";
import {
  logInReducer,
  logOutReducer,
  Authorization,
} from "../../lib/redux/reducers/userState";
import { AxiosError } from "axios";
import { HttpErrorResponse } from "../../lib/types/error";

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
  const response = await logInApi(email, password);
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
}

export function logOut(dispatch: Dispatch) {
  localStorage.removeItem("token");
  dispatch(logOutReducer());
}

export async function signUp(email: string, password: string, name: string) {
  try {
    const response = await signUpApi(email, password, name);
    return response;
  } catch (error) {
    const typedError = error as AxiosError<HttpErrorResponse>;
    if (typedError.isAxiosError) {
      throw typedError.response;
    } else throw error;
  }
}

export async function initStatus(dispatch: Dispatch) {
  try {
    const response = await getStatusApi();
    if (!response?.data.user) {
      logOut(dispatch);
    }
    return response;
  } catch (error) {
    const typedError = error as AxiosError<HttpErrorResponse>;
    if (typedError.isAxiosError) {
      throw typedError.response;
    } else throw error;
  }
}
