import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";

import Vue from "vue";
import VueRouter from "vue-router";
import { authGuard } from "../auth/authGuard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: authGuard,
  },
  {
    path: "/mainsite",
    beforeEnter() {
      location.href = "https://amhsrobotics.com";
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
