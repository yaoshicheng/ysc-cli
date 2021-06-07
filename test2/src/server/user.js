import axios from "../utils/axios";

export function login(params) {
  return axios.post("/api/account/token-auth", params);
}

export function getAuthority() {
  return axios.get("/api/account/permissions");
}

export function getUsers() {
  return axios.get("/api/account/users");
}
