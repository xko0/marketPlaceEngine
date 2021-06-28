<template>
  <div class="display">
    <div class="card" v-for="(card, cardIndex) in tabCards" :key="cardIndex" @click="goCardUrl(card._id)">
      <img class="cardLogo" :src="card.logo" alt="" />
      <div class="bandeau">
        <h1>{{ card.titre }}</h1>
        <h4>{{ card.categorie }}</h4>
      </div>
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
  mounted () {
    axios.get('http://localhost:3001/api/card')
      .then(res => {
        this.tabCards = [];
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
    goCardUrl(idCard) {
      this.$router.push(`/description/${idCard}`);
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
  overflow: visible;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.card:hover {
  transform: scale(1.1);
}
.cardLogo {
  width: 371px;
  height: 238px;
  border-radius: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
}
.display {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.bandeau {
  z-index: 1;
  margin-top: 45.3%;
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  position: absolute;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  text-align: center;
}
</style>
