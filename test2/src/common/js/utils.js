import { message } from "ant-design-vue";
import { get, join, split, includes, head, forEach } from "lodash";
import moment from "moment";

import Cookie from "@/utils/cookie";
import axios from "@/utils/axios";

export function handleErrorData(error, callback) {
  const msg = get(error, "message", "");
  const errorData = get(error, "errorData", "");
  message.error(msg);
  if (callback) callback(errorData);
}

export function GetMsg(response) {
  const msgArr = get(response, "data.non_field_errors", []);
  return {
    message: join(msgArr, "\n") || get(response, "message", ""),
    errorData: get(response, "data", {})
  };
}

export function getEnvFromHostname(hostname) {
  const hostnameElements = split(hostname, ".");
  const env =
    includes(hostname, "localhost") ||
    hostnameElements.length <= 1 ||
    includes(head(hostnameElements), "test")
      ? "test"
      : "";
  return env;
}

export function getApiEnv(currentLocation) {
  const { hostname } = currentLocation || {};
  if (hostname) return getEnvFromHostname(hostname);
  const url = new URL(currentLocation);
  return getEnvFromHostname(url.hostname);
}

export function getBaseUrl() {
  const env = getApiEnv(window.location);
  if (window.location.hostname === "localhost")
    return "https://sloth-test-api.matrix.co/";
  return env
    ? `https://sloth-${env}-api.matrix.co/`
    : `https://sloth-api.matrix.co/`;
}

export const getToken = () => {
  const user = Cookie.getCookie("user")
    ? JSON.parse(Cookie.getCookie("user"))
    : {};
  const token = get(user, "token", "");
  return token;
};

export const getMenuList = () => {
  const menus = localStorage.getItem("AUTH_MENU")
    ? JSON.parse(localStorage.getItem("AUTH_MENU"))
    : {};
  return [
    {
      title: "Transfer",
      condition: get(menus, "transfer.MENU_ACCESS", false),
      icon: "OrderedListOutlined",
      key: "transfer",
      crumb: ["Home", "Transfer"],
      crumb2: [
        { name: "Home", path: "/" },
        { name: "Transfer", path: "/transfer" }
      ],
      menuKey: "transfer",
      activeKey: "transfer",
      isSimpleMenu: true,
      children: [
        {
          title: "Transfer Detail",
          crumb: ["Home", "Transfer", "Transfer Detail"],
          crumb2: [
            { name: "Home", path: "/" },
            { name: "Transfer", path: "/transfer" },
            { name: "Transfer Detail" }
          ],
          condition: get(menus, "transfer.MENU_ACCESS", false),
          key: "transferDetail",
          menuKey: "transfer",
          activeKey: "transfer"
        }
      ]
    },
    {
      title: "Kanban",
      condition: get(menus, "kanban.MENU_ACCESS", false),
      icon: "ProjectOutlined",
      key: "kanban",
      crumb: ["Home", "Kanban"],
      crumb2: [
        { name: "Home", path: "/" },
        { name: "Kanban", path: "/kanban" }
      ],
      menuKey: "kanban",
      activeKey: "kanban",
      isSimpleMenu: true,
      children: [
        {
          title: "Kanban Detail",
          crumb: ["Home", "Kanban", "Kanban Detail"],
          condition: get(menus, "kanban.MENU_ACCESS", false),
          key: "kanbanDetail",
          menuKey: "kanban",
          activeKey: "kanban"
        }
      ]
    },
    {
      title: "PMVRM",
      condition: get(menus, "vrm.MENU_ACCESS", false),
      icon: "ShareAltOutlined",
      key: "vrm",
      crumb: ["Home", "PMVRM"],
      crumb2: [
        { name: "Home", path: "/" },
        { name: "PMVRM", path: "/vrm" }
      ],
      menuKey: "vrm",
      activeKey: "vrm",
      isSimpleMenu: true,
      children: [
        {
          title: "PMVRM Detail",
          crumb: ["Home", "PMVRM", "PMVRM Detail"],
          condition: get(menus, "vrm.MENU_ACCESS", false),
          key: "vrmDetail",
          menuKey: "vrm",
          activeKey: "vrm"
        }
      ]
    },
    {
      title: "DevOps",
      condition: true,
      // condition:
      //   get(menus, "application.MENU_ACCESS", false) ||
      //   get(menus, "release.MENU_ACCESS", false) ||
      //   get(menus, "secret.MENU_ACCESS", false),
      icon: "NodeExpandOutlined",
      key: "devops",
      menuKey: "devops",
      activeKey: "devops",
      children: [
        {
          title: "Applications",
          // condition: true,
          condition: get(menus, "application.MENU_ACCESS", false),
          icon: "AppstoreAddOutlined",
          key: "application",
          crumb: ["Home", "DevOps", "Applications"],
          crumb2: [
            { name: "Home", path: "/" },
            { name: "DevOps", path: "/devops/application" },
            { name: "Applications", path: "" }
          ],
          menuKey: "devops",
          activeKey: "application"
        },
        {
          title: "Release",
          // condition: true,
          condition: get(menus, "release.MENU_ACCESS", false),
          icon: "ApartmentOutlined",
          key: "release",
          crumb: ["Home", "DevOps", "Release"],
          crumb2: [
            { name: "Home", path: "/" },
            { name: "DevOps", path: "/devops/application" },
            { name: "Release", path: "" }
          ],
          menuKey: "devops",
          activeKey: "release"
        },
        {
          title: "Release Detail",
          hideInMenu: true,
          // condition: true,
          condition: get(menus, "release.MENU_ACCESS", false),
          icon: "ApartmentOutlined",
          key: "release_Detail",
          crumb: ["Home", "DevOps", "Release", "Detail"],
          crumb2: [
            { name: "Home", path: "/" },
            { name: "DevOps", path: "/devops/application" },
            { name: "Release", path: "/devops/release" },
            { name: "Detail" }
          ],
          menuKey: "devops",
          activeKey: "release"
        },
        {
          title: "Release Transfer",
          hideInMenu: true,
          // condition: true,
          condition: get(menus, "release.MENU_ACCESS", false),
          icon: "ApartmentOutlined",
          key: "devops_release_transfer",
          crumb: ["Home", "DevOps", "Release", "Transfer"],
          crumb2: [
            { name: "Home", path: "/" },
            { name: "DevOps", path: "/devops/application" },
            { name: "Release", path: "/devops/release" },
            { name: "Transfer" }
          ],
          menuKey: "devops",
          activeKey: "release"
        },
        {
          title: "Secret",
          // condition: true,
          condition: get(menus, "secret.MENU_ACCESS", false),
          icon: "UnlockOutlined",
          key: "secret",
          crumb: ["Home", "DevOps", "Secret"],
          crumb2: [
            { name: "Home", path: "/" },
            { name: "DevOps", path: "/devops/application" },
            { name: "Secret" }
          ],
          menuKey: "devops",
          activeKey: "secret"
        }
      ]
    },
    {
      title: "Kubernetes",
      // condition: true,
      condition: get(menus, "k8s_deployment.MENU_ACCESS", false),
      icon: "ClusterOutlined",
      key: "kubernetes",
      menuKey: "kubernetes",
      activeKey: "kubernetes",
      children: [
        {
          title: "Deployment",
          // condition: true,
          condition: get(menus, "k8s_deployment.MENU_ACCESS", false),
          icon: "DeploymentUnitOutlined",
          key: "k8s_deployment",
          crumb: ["Home", "Kubernetes", "Deployment"],
          crumb2: [
            { name: "Home", path: "/" },
            { name: "Kubernetes", path: "/kubernetes/deployment" },
            { name: "Deployment" }
          ],
          menuKey: "kubernetes",
          activeKey: "k8s_deployment"
        }
      ]
    },
    {
      title: "Administration",
      // condition: true,
      condition: get(menus, "mysql_administration.MENU_ACCESS", false),
      icon: "ToolOutlined",
      key: "administration",
      menuKey: "administration",
      activeKey: "administration",
      children: [
        {
          title: "MySQL",
          // condition: true,
          condition: get(menus, "mysql_administration.MENU_ACCESS", false),
          icon: "ConsoleSqlOutlined",
          key: "mysql_administration",
          crumb: ["Home", "Administration", "MySQL"],
          crumb2: [
            { name: "Home", path: "/" },
            { name: "Administration", path: "/administration/mysql" },
            { name: "MySQL" }
          ],
          menuKey: "administration",
          activeKey: "mysql_administration"
        }
      ]
    }
  ];
};

export const findMenuInfo = key => {
  if (!key) return;
  const menuList = getMenuList();
  let menuInfo = {};
  const findVal = arrs => {
    forEach(arrs, arr => {
      if (arr.key === key) {
        menuInfo = arr;
      } else if (arr.children) {
        findVal(arr.children);
      }
    });
  };
  findVal(menuList);
  return menuInfo;
};

export const formatDate = date =>
  date ? moment(date).format("YYYY-MM-DD HH:mm:ss") : null;

export const getAllData = (resUrl, params, headers) => {
  let results = [],
    promise = new Promise(resolve => {
      let axiosFnc = url => {
        axios
          .get(url, { headers: headers })
          .then(response => {
            results = results.concat(response.data.results);
            if (response.data.next) {
              // 还有结果，需要继续获取
              axiosFnc(response.data.next);
            } else {
              // 无结果，返回所有值
              resolve(results);
            }
          })
          .catch(() => {
            resolve(results);
          });
      };
      // 处理参数为string
      if (params) {
        let arr = [];
        for (let [key, val] of Object.entries(params)) {
          arr.push(`${key}=${val}`);
        }
        resUrl += arr.length ? `?${arr.join("&")}` : "";
      }
      axiosFnc(resUrl);
    });
  return promise;
};

const renderVal = (j, v) => {
  if (j === "linked_issue_count") {
    return `${v.linked_done_issue_count}/${v[j]}`;
  } else if (j === "is_done") {
    return v[j] ? "Yes" : "No";
  } else if (j.indexOf(".") !== -1) {
    let fileds = j.split(".");
    return ProptyField(v, fileds);
  } else {
    return v[j];
  }
};

export const ProptyField = (obj, fields) => {
  let k = obj;
  fields.forEach(value => (k = k[value]));
  return k;
};

export const formatJson = (filterVal, jsonData) => {
  return jsonData.map(v =>
    filterVal.map(j => {
      return renderVal(j, v);
    })
  );
};

export const export2Excel = ({ list, tHeader, dataIndex, title }) => {
  require
    .ensure([], () => {
      const { export_json_to_excel } = require("./Export2Excel");
      const data = formatJson(dataIndex, list);
      export_json_to_excel(
        tHeader,
        data,
        title + "-" + moment(new Date()).format("YYYYMMDDHHmmss")
      );
    })
    .catch(() => {
      handleErrorData({ message: "Export Failed" });
    });
};
