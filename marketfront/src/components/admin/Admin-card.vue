<template>
  <div class="display">
    <div class="card" v-for="(card, cardIndex) in tabCards" :key="cardIndex" @click="modifierCard(card._id)">
        <button class="suppBtn" v-show="suppBtnAffiche" @click="deleteCard(card._id)">
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
// import axios from 'axios'
export default {
  computed: {
    ...mapState(['tabCards']),
    ...mapActions(['getCards'])
  },
  props: {
      suppBtnAffiche: {
          type: Boolean,
          default: false
      }
  },
  mounted () {
    this.getCards
  }, 
  methods: {
    deleteCard(idCard) {
      this.$store.dispatch('deleteCard', idCard)
    },
    modifierCard(idCard) {
      if(!this.suppBtnAffiche) { // Condition qui évite de changer de page quand le bouton "supprimer" est affiché
      this.$router.push(`/adminmodifycard/${idCard}`);
      }
    },
    
  },
};
</script>

<style>
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
