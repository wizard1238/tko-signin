import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import QR from "../views/QR.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/qr',
    name: 'QR',
    component: QR
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
