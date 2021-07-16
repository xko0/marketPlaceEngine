<template>
  <div class="adminBar">
    <router-link class="link" to="/adminhome">
      <img src="../../assets/shopping.png" alt="">
      <p>Marketplaces</p>
    </router-link>
    <router-link class="link" to="/admincategories">
      <img src="../../assets/faders.png" alt="">
      <p>Catégories</p>
    </router-link>
    <router-link class="link" to="users">
      <img src="../../assets/users.png" alt="">
      <p>Utilisateurs</p>
    </router-link>
    <router-link class="link" to="propositions">
      <img src="../../assets/chats.png" alt="">
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
  height: 10vh;
  width: 100%;
  background-color: whitesmoke;
  box-shadow: var(--boxShadow);
  margin-bottom: 4vh;
}
.link {
  text-decoration: none;
}
img {
  width: 5vh;
  display: block;
  margin: auto;
}
p {
  cursor: pointer;
  color: black;
}
</style>