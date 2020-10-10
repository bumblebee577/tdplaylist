import http from "./httpService";
import { apiUrl } from "../config.json";

export function register(user) {
  return http.post(apiUrl + "/users", user);
}
