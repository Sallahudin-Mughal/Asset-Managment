import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import InputComp from "../components/InputComp.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/input",
      name: "input",
      component: () => import("@/components/InputComp.vue"),
    },
    {
      path: "/add",
      name: "addassets",
      // route level code-splitting
      // this generates a separate chunk (Addassets.vue) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Addassets.vue"),
    },
  ],
});

export default router;
