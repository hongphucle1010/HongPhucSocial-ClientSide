import axios from "axios";
import { apiHost } from "../config/api/api";

export const apiClient = axios.create({
  baseURL: apiHost,
});
