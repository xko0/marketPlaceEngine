import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {path: "/", name: 'home', component: Home},
    {path: "/description",name: 'description', component: UserDescription},
    {path: "/log",name: 'log', component: Log},
    {path: "/adminhome",name: 'admin-home', component: AdminHome},
    {path: "/admincreatecard",name: 'admin-create-card', component: AdminCreateCard}
  ]
})

App.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

