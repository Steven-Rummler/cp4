import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import MovieHome from "../components/MovieHome";
import MovieAdmin from "../components/MovieAdmin";
import BookHome from "../components/BookHome";
import BookAdmin from "../components/BookAdmin";
import CharacterHome from "../components/CharacterHome";
import CharacterAdmin from "../components/CharacterAdmin";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      { path: "", component: MovieHome },
      {
        path: "/movie",
        component: MovieHome,
      },
      {
        path: "/book",
        component: BookHome,
      },
      {
        path: "/character",
        component: CharacterHome,
      },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    children: [
      { path: "/admin", component: MovieAdmin },
      {
        path: "/admin/movie",
        component: MovieAdmin,
      },
      {
        path: "/admin/book",
        component: BookAdmin,
      },
      {
        path: "/admin/character",
        component: CharacterAdmin,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
