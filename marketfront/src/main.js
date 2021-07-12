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
import store from "./store";
import admin from "./store/modules/admin.module";

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
      beforeEnter(to, from, next) {
        if (admin.state.isConnected === true && admin.state.jwToken) {
          next();
        } else {
          router.push("/log").catch(() => {});
        } 
      },
      component: AdminHome,
    },
    {
      path: "/admincreatecard",
      component: AdminCreateCard,
    },
    {
      path: "/adminupdateCard/:id",
      component: AdminupdateCard,
    },
  ],
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
