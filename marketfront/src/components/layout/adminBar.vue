<template>
  <div class="adminBar">
    <router-link class="link" to="/adminhome">
      <p>Marketplaces</p>
    </router-link>
    <router-link class="link" to="/categories">
      <p>Catégories</p>
    </router-link>
    <router-link class="link" to="users">
      <p>Utilisateurs</p>
    </router-link>
    <router-link class="link" to="propositions">
      <p>Propositions</p>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.adminBar {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 6vh;
  width: 100%;
  background-color: whitesmoke;
  box-shadow: var(--boxShadow);
  margin-bottom: 4vh;
}
.link {
    text-decoration: none;
}
p {
  cursor: pointer;
  color: black;
}
</style>