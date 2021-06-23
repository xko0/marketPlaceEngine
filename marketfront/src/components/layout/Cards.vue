<template>
  <div>
    <div class="card" v-for="(card, cardIndex) in cardResume" :key="cardIndex">
      <bouton @click="deleteTodo(todo._id)"> Supprimer </bouton>
      <img src="" alt="" />
      <h4>{{ Card.titre }}</h4>
      <h6>{{ Card.categorie }}</h6>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      cardResume: [],
    };
  },
  mounted () {
    axios.get('http://localhost:3001/api/card', {...this.cardResume});
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
