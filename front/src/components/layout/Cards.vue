<template>
  <div>
    <div class="card" v-for="card in cardResume" :key="card._id">
      <bouton @click="deleteTodo(todo._id)"> Supprimer </bouton>
      <img src="" alt="" />
      <h4>{{ Card.titre }}</h4>
      <h6>{{ Card.categorie }}</h6>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardResume: [],
    };
  },
};
</script>

<style>
.card {
  margin-top: 8%;
  width: 371px;
  height: 238px;
  border-radius: 15px;
  box-shadow: 2px 3px 10px 0px rgba(0, 0, 0, 0.4);
  background-color: var(--whiteCard);
  overflow: visible;
}
</style>
