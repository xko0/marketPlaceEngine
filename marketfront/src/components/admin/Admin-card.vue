<template>
  <div class="display">
    <div class="card" v-for="(card, cardIndex) in tabCards" :key="cardIndex" @click="modifierCard(card._id)">
        <img :src="card.logo" alt="" />
        <h1>{{ card.titre }}</h1>
        <h6>{{ card.categorie }}</h6>
        <button class="suppBtn" v-show="suppBtnAffiche" @click="suppCard(card._id)">Supprimer</button>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      tabCards: [],
    };
  },
  props: {
      suppBtnAffiche: {
          type: Boolean,
          default: false
      }
  },
  mounted () {
    axios.get('http://localhost:3001/api/card')
      .then(res => {
        // réponse sous forme de tableau
        let tab = res.data; 
        // copie du tableau réponse dans tabCards, sur lequel on boucle dans le template
        this.tabCards = tab.slice(0); 
      })
      .catch(error => {
        console.error(error)
      })
  }, 
  methods: {
    modifierCard(idCard) {
      if(!this.suppBtnAffiche) { // Condition qui évite de changer de page quand le bouton "supprimer" est affiché
      this.$router.push(`/adminmodifycard/${idCard}`);
      }
    },
    suppCard(idCard) {
      axios.delete(`http://localhost:3001/api/card/${idCard}`)
      .then(res => {
        console.log(`${res.data} supprimé`);
        // "recharge" la liste des cartes => affichage sans la carte supprimée
        axios.get('http://localhost:3001/api/card')
          .then(res => {
            let tab = res.data; // réponse sous forme de tableau
            this.tabCards = tab.slice(0); // copie du tableau réponse dans tabCards, sur lequel on boucle dans le template
          })
          .catch(error => {
            console.error(error)
          })
      })
      .catch(error => console.error(error))
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
}
.card img {
  width: 70%;
  height: auto;
  margin-bottom: 3%;
  border-radius: 10px;
}
.display {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.suppBtn {
    border-radius: 15px;
}
</style>
