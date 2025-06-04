import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { isAuthenticated } from "@/utils/spotifyAuth";

export function authMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated()) {
    // Redirect to login if trying to access protected route while not authenticated
    next({ name: "login" });
  } else if (to.name === "login" && isAuthenticated()) {
    // Redirect to home if trying to access login while already authenticated
    next({ name: "home" });
  } else {
    // Continue with the navigation
    next();
  }
}
