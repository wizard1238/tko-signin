import Home from '../views/Home.vue'
import QR from "../views/QR.vue"
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: '/qr',
    name: 'QR',
    component: QR
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
