import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import Home from "@/views/Home.vue";
import Ressource from "@/views/Ressource.vue";
import useAuthStore from "@/stores/AuthStore";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
    name: "Home",
  },
  {
    path: "/ressource/:id",
    component: Ressource,
    name: "Ressource",
  },
  {
    path: "/a-propos",
    component: () => import("@/views/About.vue"),
    name: "About",
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
    name: "Login",
  },
  {
    path: "/administration",
    component: () => import("@/views/admin/Admin.vue"),
    name: "Admin",
    meta: { needAuth: true },
    children: [
      {
        path: "management",
        component: () => import("@/views/admin/Management.vue"),
        name: "AdminManagement",
      },
      {
        path: "validation",
        component: () => import("@/views/admin/Validation.vue"),
        name: "AdminValidation",
      },
    ],
  },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  const isAuthenticated = authStore.auth.accessToken;

  const isProtected = to.matched.some((route) => route.meta.needAuth);

  if (isProtected && !isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
