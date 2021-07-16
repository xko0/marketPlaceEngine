import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";

// Routes ====================
import AdminCreateCard from "./components/admin/Admin-create-card";
import AdminHome from "./components/admin/Admin-home";
import Log from "./components/admin/Log";
import Home from "./components/Home";
import UserDescription from "./components/User-description";
import AdminupdateCard from "./components/admin/Admin-modify-card";
import AdminCategories from "./components/admin/Admin-categories";
import AdminUsers from "./components/admin/Admin-users";
import store from "./store";
import "./store/modules/admin.module";
// import admin from "./store/modules/admin.module";

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Home },
    { path: "/description/:id", component: UserDescription },
    { path: "/log", component: Log },
    {
      path: "/adminhome",
      component: AdminHome,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/admincreatecard",
      component: AdminCreateCard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/adminupdateCard/:id",
      component: AdminupdateCard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/admincategories",
      component: AdminCategories,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/users",
      component: AdminUsers,
      meta: {
        requiresAuth: true
      }
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem("jwToken")) {
      next({
        path: "/log"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
