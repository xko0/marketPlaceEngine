<template>
  <div class="display">
    <div class="card" v-for="(card, cardIndex) in cardsArray" :key="cardIndex" @click="goToUpdateCard(card._id)">
        <button class="suppBtn" v-show="displayDeleteBtn" @click="deleteCard(card._id)">
          <img src="../../assets/moins.png" alt="">
        </button>
        <img class="cardLogo" :src="card.logo" alt="" />
        <div class="bandeau">
          <h1>{{ card.titre }}</h1>
          <h4>{{ card.categorie }}</h4>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex"
export default {
  computed: {
    ...mapState('card', ['cardsArray']),
    ...mapActions('card', ['getCards']),
  },
  props: {
      displayDeleteBtn: {
          type: Boolean,
          default: false
      }
  },
  mounted () {
    this.getCards
  }, 
  methods: {
    deleteCard(idCard) {
      this.$store.dispatch('card/deleteCard', idCard)
    },
    goToUpdateCard(idCard) {
      if(!this.displayDeleteBtn) { // Condition qui évite de changer de page quand le bouton "supprimer" est affiché
      this.$router.push(`/adminupdateCard/${idCard}`);
      }
    },
  },
};
</script>

<style scoped>
.card {
  margin: 8% 2% 0% 2%;
  padding: 2%;
  width: 371px;
  height: 238px;
  border-radius: 15px;
  box-shadow: 2px 3px 10px 0px rgba(0, 0, 0, 0.4);
  background-color: var(--whiteCard);
  overflow: visible;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
}
.cardLogo {
  width: auto;
  height: 50%;
  border-radius: 10px;
}
.suppBtn {
  background-color: transparent;
  border: none;
  position: absolute;
  bottom: 80%;
  left: 80%;
  z-index: 2;
}
.suppBtn img {
  width: 50%;
  height: auto;
  margin: 0;
  padding: 0;
}
</style>
