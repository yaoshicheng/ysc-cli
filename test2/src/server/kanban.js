import axios from "../utils/axios";

export function getKanban(params) {
  const roleType = params.roleType;
  delete params.roleType;
  return axios.get(`/api/tracking/kanban/${roleType}`, {
    params
  });
}

export function assignRelease(params) {
  const release_pk = params.release_pk;
  delete params.release_pk;
  return axios.post(`/api/devops/release/${release_pk}/assign`, params);
}

export function finishTest(pk) {
  return axios.post(`/api/tracking/tasks/${pk}/finish_testing`);
}