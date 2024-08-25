import axios from "axios";
import { apiHost } from "../config/apiPath";

export const apiClient = axios.create({
  baseURL: apiHost,
});
