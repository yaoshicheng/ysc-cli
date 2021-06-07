import axios from "../utils/axios";

export function getData(pk) {
  return axios.get(`/api/devops/release/${pk}/assign`);
}

export function getMiscInfo(pk) {
  return axios.get(`/api/devops/release/${pk}/misc`);
}

export function getVrmList() {
  return axios.get("/api/tracking/tasks/vrm_choices");
}

export function addVrm(params) {
  const release_pk = params.release_pk;
  delete params.release_pk;
  return axios.post(`/api/devops/release/${release_pk}/assign`, params);
}

export function generateVrm(release_pk) {
  return axios.post(`/api/devops/release/${release_pk}/assign`);
}
