import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiUrl + "/auth", { email, password });
  localStorage.setItem("td_token", jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem("td_token", jwt);
}

export function logout() {
  localStorage.removeItem("td_token");
}

export function getJwt() {
  return localStorage.getItem("td_token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("td_token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

const auth = {
  login,
  loginWithJwt,
  logout,
  getJwt,
  getCurrentUser,
};

export default auth;
