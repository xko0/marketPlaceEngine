<template>
  <div class="display">
    <div
      class="card radiusCard"
      v-for="(card, cardIndex) in cardsArray"
      :key="cardIndex"
      :style="{'background': `url(${card.logo}) no-repeat center center`, 'background-size': '100%'}"
      @click="goCardUrl(card._id)"
    >
      <div class="bandeau">
        <h1>{{ card.titre }}</h1>
        <h4>{{ card.categorie }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("card", ["cardsArray"]),
    ...mapActions("card", ["getCards"]),
  },
  mounted() {
    this.getCards;
  },
  methods: {
    goCardUrl(idCard) {
      this.$router.push(`/description/${idCard}`);
    },
  },
};
</script>

<style scoped>
.display {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.card {
  margin: 0 2% 5% 2%;
  padding: 2%;
  width: 371px;
  height: 238px;
  box-shadow: var(--boxShadow);
  overflow: visible;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}
.card:hover {
  transform: scale(1.1);
}
.bandeau {
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  position: absolute;
  top: 100%;
  transform: translateY(-100%);
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  text-align: center;
  padding: 2% 0;
}
.bandeau h1 {
  font-size: 1.5rem;
}
.bandeau h4 {
  font-size: 1rem;
}
@media screen and (max-width: 768px) {
  .card {
    margin-bottom: 12%;
  }
}
</style>
