import axios from "axios";
import get from "lodash/get";

import router from "../router";
import { GetMsg, getBaseUrl, getToken } from "@/common/js/utils";

axios.defaults.baseURL = getBaseUrl();

axios.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
axios.interceptors.response.use(
  response => {
    const status = get(response, "status", "");
    if (status === 200) {
      const resStatus = get(response, "data.status", "");
      if (resStatus === "success") {
        return get(response, "data", {});
      } else {
        const result = GetMsg(response.data);
        return Promise.reject(result);
      }
    }
  },
  err => {
    if (err.response.status === 401) {
      router.push({
        name: "login",
        query: {
          router: window.location.hash.replace("#", "")
        }
      });
    }
    const result = GetMsg(err);
    return Promise.reject(result);
  }
);
export default axios;
