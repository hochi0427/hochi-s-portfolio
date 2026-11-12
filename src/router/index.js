import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import PuzzleGame from "../views/PuzzleGame.vue";
import Vignette from "../views/Vignette.vue";
import sourceData from "../data.json";
import GameMod from "../views/GameMod.vue";
import WeightGame from "../views/WeightGame.vue";
import MathTactics from "../views/MathTactics.vue";
import Education from "../views/Education.vue";
import WorkExperience from "../views/WorkExperience.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/research-journal",
    name: "ResearchTransition",
    component: () => import("../views/ResearchTransition.vue"),
  },
  {
    path: "/game-play",
    name: "GamePlay",
    component: () => import("../views/GamePlay.vue"),
  },
  {
    path: "/musleep",
    name: "Musleep",
    component: () => import("../views/Musleep.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/puzzlegame",
    name: "PuzzleGame",
    component: PuzzleGame,
  },
  {
    path: "/projects/vignette",
    name: "Vignette",
    component: Vignette,
  },
  {
    path: "/project/:id/:slug",
    name: "project",
    component: () => import("../views/Project.vue"),
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
        component: () => import("../views/Demonstrate.vue"),
        props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
      },
    ],
  },
  {
    path: "/projects/game-mod",
    name: "GameMod",
    component: GameMod,
  },
  {
    path: "/projects/weight-game",
    name: "WeightGame",
    component: WeightGame,
  },
  {
    path: "/projects/pattern-cube",
    name: "PatternCube",
    component: () => import("../views/PatternCube.vue"),
  },
  {
    path: "/projects/kingdom-dilemma",
    name: "KingdomDilemma",
    component: () => import("../views/KingdomDilemma.vue"),
  },
  {
    path: "/projects/rhythm-grove",
    name: "RhythmGrove",
    component: () => import("../views/RhythmGrove.vue"),
  },
  {
    path: "/projects/mutation-dog",
    name: "MutationDog",
    component: () => import("../views/MutationDog.vue"),
  },
  {
    path: "/projects/math-tactics",
    name: "MathTactics",
    component: MathTactics,
  },
  {
    path: "/education",
    name: "Education",
    component: Education,
  },
  {
    path: "/work-experience",
    name: "WorkExperience",
    component: WorkExperience,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },

];

const router = createRouter({
  history: createWebHashHistory('/hochi-s-portfolio/'),
  routes,
  linkActiveClass: "active-link",
  //每次都回到頁面頂端
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.name === "About") {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ top: 0, behavior: "smooth" }), 300);
      });
    }
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
