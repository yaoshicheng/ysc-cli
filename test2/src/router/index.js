import { createRouter, createWebHistory } from "vue-router";

import Empty from "../components/Empty.vue";
import Layout from "../components/Layout.vue";
import NoAuthority from "../components/noAuthority.vue";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Transfer from "../views/transfer";
import Kanban from "../views/kanban";
import Vrm from "../views/vrm";
import TaskDetail from "../views/components/taskDetail/TaskDetail";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    name: "home",
    component: Layout,
    children: [
      {
        path: "/",
        name: "home",
        component: Transfer,
        redirect: { name: "transfer" }
      },
      {
        path: "transfer",
        name: "transfer",
        component: Transfer
      },
      {
        path: "transfer/detail",
        name: "transferDetail",
        component: TaskDetail
      },
      {
        path: "kanban",
        name: "kanban",
        component: Kanban
      },
      {
        path: "kanban/detail",
        name: "kanbanDetail",
        component: TaskDetail
      },
      {
        path: "vrm",
        name: "vrm",
        component: Vrm
      },
      {
        path: "vrm/detail",
        name: "vrmDetail",
        component: TaskDetail
      },
      {
        path: "devops",
        name: "devops",
        component: Empty,
        children: [
          {
            path: "application",
            name: "application",
            component: () => import("../views/devops/application/index.vue")
          },
          {
            path: "release",
            name: "release",
            component: () => import("../views/devops/release/index.vue")
          },
          {
            path: "release/detail/:release_id",
            name: "release_Detail",
            component: () => import("../views/devops/release/detail.vue")
          },
          {
            path: "release/transfer/:pk",
            name: "devops_release_transfer",
            component: () => import("../views/devops/release/transfer.vue")
          },
          {
            path: "secret",
            name: "secret",
            component: () => import("../views/devops/secret/secret.vue"),
          }
        ]
      },
      {
        path: "kubernetes",
        name: "kubernetes",
        component: Empty,
        children: [
          {
            path: "k8s_deployment",
            name: "k8s_deployment",
            component: () => import("../views/kube/deployment.vue"),
          }
        ]
      },
      {
        path: "administration",
        name: "administration",
        component: Empty,
        children: [
          {
            path: "mysql_administration",
            name: "mysql_administration",
            component: () => import("../views/tools/MysqlPerform.vue"),
          }
        ]
      },
      {
        path: "noAuthority",
        name: "noAuthority",
        component: NoAuthority
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
