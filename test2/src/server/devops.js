import axios from "../utils/axios";
import { stringify } from "qs";

export function deleteSecret(id) {
  return axios.delete(`/api/devops/secrets/${id}`);
}

export function addSecret({ data }) {
  return axios.post(`/api/devops/secrets`, data);
}

export function updateSecret({ id, data }) {
  return axios.put(`/api/devops/secrets/${id}`, data);
}

export function getSecrets(params) {
  return axios.get(`/api/devops/secrets?${stringify(params)}`);
}

export function getSecretClassification() {
  return axios.get(`/api/devops/secret_classification`);
}

export function getRelease(params) {
  return axios.get(`/api/devops/release?${stringify(params)}`);
}

export function addRelease({ data }) {
  return axios.post(`/api/devops/release`, data);
}

export function updateRelease({ id, data }) {
  return axios.put(`/api/devops/release/${id}`, data);
}

export function getReleaseHistoryById(id) {
  return axios.get(`/api/devops/release/${id}/history`);
}

export function regressionRelease({ id, data }) {
  return axios.post(`/api/devops/release/${id}/regression_flow`, data);
}

export function getReleaseById({ id }) {
  return axios.get(`/api/devops/release/${id}`);
}

export function getDevopsEnvironment() {
  return axios.get(`/api/devops/environment`);
}

export function getDevopsApplication(params) {
  return axios.get(`/api/devops/application?${stringify(params)}`);
}

export function toggleDeployById({ id, data }) {
  return axios.put(`/api/devops/release/${id}/production_deployed`, data);
}

export function getBranchsById(id) {
  return axios.get(`/api/devops/release/${id}/branches`);
}

export function deleteBranchById({ id, data }) {
  return axios.delete(`/api/devops/release/${id}/branches`, data);
}

export function triggerReleaseById({ id, data }) {
  return axios.post(`/api/devops/release/${id}/release`, data);
}

export function getTagsById(id) {
  return axios.get(`/api/devops/application/${id}/tags`);
}

export function addDeploymentById({ id, data }) {
  return axios.post(`/api/devops/release/${id}/deployment`, data);
}

export function editDeploymentById({ id, data }) {
  return axios.put(`/api/devops/deployment/${id}`, data);
}

export function removeDeploymentById(id) {
  return axios.put(`/api/devops/deployment/${id}/remove`);
}

export function recoverDeploymentById(id) {
  return axios.put(`/api/devops/deployment/${id}/recover`);
}

export function releaseDeploymentById(id) {
  return axios.put(`/api/devops/deployment/${id}/release`);
}

export function syncServiceById({ id, data }) {
  return axios.post(`/api/devops/release/${id}/sync_services`, data);
}

export function getServiceDataById({ id, params }) {
  return axios.get(`/api/devops/release/${id}/deployment?${stringify(params)}`);
}

export function transferReleaseById({ id, data }) {
  return axios.post(`/api/devops/release/${id}/transfer`, data);
}

export function getRepo(params) {
  return axios.get(`/api/tracking/repo?${stringify(params)}`);
}

export function getTransferById(id) {
  return axios.get(`/api/devops/release/${id}/transfer`);
}

export function getApplications(params) {
  return axios.get(`/api/devops/application?${stringify(params)}`);
}

export function deleteApplication(id) {
  return axios.delete(`/api/devops/application/${id}`);
}

export function addApplication({ data }) {
  return axios.post(`/api/devops/application`, data);
}

export function updateApplication({ id, data }) {
  return axios.put(`/api/devops/application/${id}`, data);
}
