import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useMusicListItem } from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/musicitem",
    name: "musicitem",
    // 懒加载，调用时使用
    component: () => import("../views/musicItem.vue"),
  },
  {
    path: "/search",
    name: "search",
    // 懒加载，调用时使用
    component: () => import("../views/Search.vue"),
  },
  {
    path: "/infoUser",
    name: "infoUser",
    // 路由守卫进入个人中心前判断是否登录
    beforeEnter(to, from, next) {
      if (
        useMusicListItem().isLogin ||
        localStorage.getItem("token") ||
        useMusicListItem().token
      ) {
        // 放行，进入个人中心
        next();
      } else {
        next("/Login");
      }
    },
    // 懒加载，调用时使用
    component: () => import("../views/InfoUser.vue"),
  },
  {
    path: "/Login",
    name: "Login",
    // 懒加载，调用时使用
    component: () => import("../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
