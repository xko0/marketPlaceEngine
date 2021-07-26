<template>
  <div>
    <AdminBar />
    <ul>
      <li v-for="(proposition, index) in propositionsArray" :key="index">
        <p>{{ proposition.titre }}</p>
        <button class="radius" @click="goPropositionUrl(proposition._id)">
          Voir
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import AdminBar from "../layout/adminBar.vue";
// import axios from "axios";
import { mapActions, mapState } from "vuex";
export default {
  components: { AdminBar },
  computed: {
    ...mapState("proposition", ["propositionsArray"]),
  },
  mounted() {
    this.getPropositions()
  },
  methods: {
      ...mapActions('proposition', ['getPropositions']),
    goPropositionUrl(idProposition) {
      this.$router.push(`/adminproposition/${idProposition}`);
    },
  },
};
</script>

<style scoped>
ul li {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5.5vh;
}
ul li:nth-child(odd) {
  background-color: whitesmoke;
}
ul li p {
  margin-left: 30%;
}
ul li button {
  margin-right: 30%;
  border-radius: 15px;
  width: 100px;
  height: 35px;
  padding: 0;
  cursor: pointer;
  box-shadow: none;
}
</style>