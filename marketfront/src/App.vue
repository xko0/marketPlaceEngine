<template>
  <div id="app">
    <Menu />
    <router-view></router-view>
    <footer>&copy; SOMEMARK, {{ new Date().getFullYear() }}</footer>
  </div>
</template>

<script>
import Menu from "./components/layout/Menu.vue";

export default {
  name: "App",
  components: {
    Menu,
  },
};
</script>

<style>
@import "./css/layout.css";
@import "./css/variables.css";
</style>
