<template>
  <div class="adminBar">
    <router-link class="link home" to="/adminhome">
      <img src="../../assets/shopping.png" alt="">
      <p>Marketplaces</p>
    </router-link>
    <router-link class="link cat" to="/admincategories">
      <img src="../../assets/faders.png" alt="">
      <p>Catégories</p>
    </router-link>
    <router-link class="link users" to="/users">
      <img src="../../assets/users.png" alt="">
      <p>Utilisateurs</p>
    </router-link>
    <router-link class="link propositions" to="/adminproposition">
      <img src="../../assets/chats.png" alt="">
      <p>Propositions</p>
    </router-link>
  </div>
</template>

<script>
export default {
  mounted () {
    let route = this.$route.path
    switch(route) {
      case "/adminhome":
        document.querySelector('.home').setAttribute('style', 'padding: 0 1%; border-bottom: 7px solid var(--button')
        break
      case "/admincategories":
        document.querySelector('.cat').setAttribute('style', 'padding: 0 1%; border-bottom: 7px solid var(--button')
        break
      case "/users":
        document.querySelector('.users').setAttribute('style', 'padding: 0 1%; border-bottom: 7px solid var(--button')
        break
      case "/adminproposition":
        document.querySelector('.propositions').setAttribute('style', 'padding: 0 1%; border-bottom: 7px solid var(--button')
        break
    }
  },
};
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