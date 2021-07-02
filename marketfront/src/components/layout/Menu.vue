<template>
  <div class="menu">
    <div class="logo">
      <router-link to="/adminhome">
        <img class="logoMenu" src="../../assets/userLogo.png" alt="LogoUser" />
      </router-link>
      <router-link to="/">
        <img class="logoMenu" src="../../assets/homeLogo.png" alt="LogoHome" />
      </router-link>
    </div>
  </div>
</template>

<script></script>

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
