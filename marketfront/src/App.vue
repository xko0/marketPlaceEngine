<template>
  <div id="app">
    <Menu />
    <router-view></router-view>
    <PopUpMsg />
    <footer>&copy; SOMEMARK, {{ new Date().getFullYear() }}</footer>
  </div>
</template>

<script>
import Menu from "./components/layout/Menu.vue";
import PopUpMsg from './components/layout/PopUpMsg.vue';

export default {
  name: "App",
  components: {
    Menu,
    PopUpMsg,
  },
};
</script>

<style>
@import "./css/layout.css";
@import "./css/variables.css";
</style>
