import { createRouter, createWebHistory } from "vue-router";
const routes = [
  { path: "/", component: () => import("../pages/Index.vue") },
  { path: "/calculator", component: () => import("../pages/Calculator.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
