import axios from "../utils/axios";
import { stringify } from "qs";

export function getDeployment(params) {
  return axios.get(`/api/cluster/deployment?${stringify(params)}`);
}

export function getDeploymentOpLogs(params) {
  return axios.get(`/api/cluster/deployment_op_log?${stringify(params)}`);
}

export function updateRcDeployment({ param, data }) {
  return axios.put(`/api/cluster/deployment/${param}/replica_count`, data);
}

export function updateCpuDeployment({ param, data }) {
  return axios.put(`/api/cluster/deployment/${param}/resource`, data);
}

export function getCluster() {
  return axios.get(`/api/cluster/cluster`);
}

export function getNameSpace() {
  return axios.get(`/api/cluster/namespace`);
}
