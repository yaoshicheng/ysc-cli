import axios from "../utils/axios";
import { stringify } from "qs";

export function execSqlAction(params) {
  return axios.post("/api/infrastructure/mysql_management", params);
}

export function uploadSqlFile({ data, headers }) {
  return axios.post("/api/infrastructure/mysql_management", data, {
    headers: headers
  });
}

export function loadDbs() {
  return axios.get("/api/infrastructure/mysql");
}

export function loadHistory(params) {
  return axios.get(`/api/infrastructure/mysql_management?${stringify(params)}`);
}
