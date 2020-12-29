import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import(/* webpackChunkName: "main" */ "../views/Main.vue")
  },
  {
    path: "/editor",
    name: "Editor",
    component: () =>
      import(/* webpackChunkName: "editor" */ "../views/Editor.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
