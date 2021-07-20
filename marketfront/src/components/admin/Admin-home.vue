<template>
  <div class="adminHome">
    <AdminBar/>
    <Search/>
  </div>
</template>

<script>
import Search from "../layout/Search.vue";
import AdminBar from "../layout/adminBar.vue";

export default {
  components: {
    Search,
    AdminBar
  },
};
</script>

<style scoped>
</style>
