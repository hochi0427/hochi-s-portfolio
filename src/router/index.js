import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import PuzzleGame from "@/views/PuzzleGame.vue";
import sourceData from "@/data.json";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/about", name: "About", component: About,
  },
  {
    path: "/puzzlegame", name: "PuzzleGame", component: PuzzleGame,
  },
  {
    path: "/project/:id/:slug",
    name: "project",
    component: () => import("@/views/Project.vue"),
    props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
    //檢查是否有該頁面
    beforeEnter(to, from) {
      const exists = sourceData.projects.find(
        (project) => project.id === parseInt(to.params.id)
      );
      if (!exists)
        return {
          name: "NotFound",
          //到NotFound，但保留原搜尋網址
          params: { pathMatch: to.path.split("/").slice(1) },
          query: to.query,
          hash: to.hash,
        };
    },
    children: [
      {
        path: ":demonstrateSlug",
        name: "demonstrate",
        component: () => import("@/views/Demonstrate.vue"),
        props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active-link",
  //每次都回到頁面頂端
  //   scrollBehavior (to, from, savedPosition) {
  //     return (
  //       savedPosition ||
  //       new Promise((resolve) => {
  //         setTimeout(() => resolve({ top: 0, behavior: "smooth" }), 300)
  //       })
  //     );
  //   },
});

export default router;
