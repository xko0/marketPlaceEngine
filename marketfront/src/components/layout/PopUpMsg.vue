<template>
  <div>
    <p id="popup">{{ msg }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      msg: 'popup/getMessage'
    })
  },
};
</script>

<style scoped>
#popup {
  width: 100%;
  padding: 1%;
  text-align: center;
  position: fixed;
  bottom: 5vh;
  display: none;
  color: white;
  z-index: 15;
}
</style>