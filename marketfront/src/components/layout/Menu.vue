<template>
  <div class="menu">
    <div class="logo">
      <router-link to="/log">
        <img class="logoMenu" src="../../assets/userLogo.png" alt="LogoUser" />
      </router-link>
      <router-link to="/">
        <img class="logoMenu" src="../../assets/homeLogo.png" alt="LogoHome" />
      </router-link>
      <router-link to="/" v-if="isConnected">
        <img class="logoMenu" src="../../assets/deconnect.png" alt="LogoHome" @click="logOut"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState('admin', ['isConnected']),
  },
  methods: {
    logOut() {
      this.$store.dispatch('admin/logOut')
      this.$router.push("/log");
    }
  },
}
</script>

<style scoped>
.menu {
  background-color: var(--bluePrimary);
  display: flex;
  justify-content: flex-end;
  height: 6vh;
  padding: 1vh 0;
}
.logoMenu {
  width: 30px;
  height: 30px;
  margin-right: 1vh;
  background-color: transparent;
}
</style>
