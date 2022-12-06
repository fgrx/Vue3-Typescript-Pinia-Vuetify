import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import Home from "@/views/Home.vue";
import Ressource from "@/views/Ressource.vue";

const routes: RouteRecordRaw[] = [
  {
    component: Home,
    path: "/",
    name: "Home",
  },
  {
    //Lazyloading de route
    component: () => import("@/views/About.vue"),
    path: "/about",
    name: "About",
  },
  {
    //Lazyloading de route
    component: () => import("@/views/Admin/Admin.vue"),
    path: "/admin",
    name: "Admin",
    children: [
      {
        component: () => import("@/views/Admin/Management.vue"),
        path: "management",
        name: "AdminManagement",
      },
      {
        component: () => import("@/views/Admin/Validation.vue"),
        path: "validation",
        name: "AdminValidation",
      },
    ],
  },
  {
    component: Ressource,
    path: "/ressource/:id",
    name: "Ressource",
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
