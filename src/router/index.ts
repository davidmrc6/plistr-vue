import { createRouter, createWebHistory } from "vue-router";
import { authMiddleware } from "@/middleware/auth";

import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import CallbackView from "@/views/CallbackView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/callback",
      name: "callback",
      component: CallbackView,
    },
  ],
});

router.beforeEach(authMiddleware);

export default router;
