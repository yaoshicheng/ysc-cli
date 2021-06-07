import axios from "../utils/axios";

export function getTask(params) {
  return axios.get("/api/tracking/tasks", { params });
}

export function getTaskList() {
  return axios.get("/api/tracking/task_lists");
}

export function fetchNewTask(params) {
  return axios.post("/api/tracking/tasks/fetch", params);
}

export function fetchMoreTask(params) {
  return axios.post("/api/tracking/tasks/fetch", params);
}

export function getTaskInfo(pk) {
  return axios.get(`/api/tracking/tasks/${pk}`);
}

export function getIssueInfo(params) {
  return axios.get("api/tracking/issues", { params });
}

export function getRepo(params) {
  return axios.get("api/tracking/repo", { params });
}

export function getTransferHistory(pk) {
  return axios.get(`/api/tracking/tasks/${pk}/transfer`);
}

export function syncTaskTransfer(pk) {
  return axios.put(`/api/tracking/tasks/${pk}/sync`);
}

export function transfer(pk, params) {
  return axios.post(`/api/tracking/tasks/${pk}/transfer`, params);
}


