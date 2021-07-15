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
  beforeCreated() {
    if (localStorage.getItem("jwToken")) {
      this.$store.state.admin.isConnected = true
    } else {
      this.$store.state.admin.isConnected = false
    }
  },
};
</script>

<style>
@import "./css/layout.css";
@import "./css/variables.css";
</style>
