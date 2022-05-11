import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  {
    path: "/",
    component: () => import("../views/FrountView"),
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      // 產品頁面
      {
        path: "FrontProducts",
        component: () => import("../views/frount/FrontProducts"),
      },
      // 產品細節頁面
      {
        path: "FrountProduct/:id",
        component: () => import("../views/frount/FrountProduct"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../views/Login"),
  },
  {
    path: "/dashboard",
    component: () => import("../views/Dashboard"),
    // 子路由
    children: [
      {
        path: "products",
        component: () => import("../views/admin/Products"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
