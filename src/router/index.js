import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from "../views/NotFound.vue"

import VueSocketIo from 'vue-socket.io';
import chartStore from '../store/chartStore.js';

Vue.use(VueRouter)

  const routes = [
    {
      path: "/",
      name: "Tulips",
      component: () => import("../views/Tulips.vue"),
      beforeEnter: async (to, from, next) => {
          await Vue.nextTick()
          // if (!router.app.chatNick) {
          //     next("/chat-sign-in");
          //     return
          // }

          if (!Vue.prototype.$socket) {
              let url = "https://trading-socket.oljo.me";
              if (process.env.NODE_ENV === "development") {
                  url = "http://localhost:4000";
              }
              Vue.use(VueSocketIo, url, chartStore);
          }
          next();
      }
    },
    {
        path: "/overview",
        name: "Overview",
        component: () => import("../views/Overview.vue"),
        beforeEnter: async (to, from, next) => {
            await Vue.nextTick()
            if (!router.app.loggedIn) {
                next("/login");
                return
            }
            next();
        }
    },
    {
        path: "/register",
        name: "Registrera",
        component: () => import("../views/Register.vue")
    },
    {
        path: "/login",
        name: "Logga in",
        component: () => import("../views/Login.vue")
    },
    {
        path: "/404",
        component: NotFound
    },
    {
        path: "*",
        redirect: "/404"
    }
]

const router = new VueRouter({
  routes
})

export default router
