<template>
  <div class="display">
    <div
      class="card radiusCard"
      v-for="(card, cardIndex) in array"
      :key="cardIndex"
      @click="goWhere(card._id)"
      :style="{
        backgroundImage: `url(${card.logo})`,
      }"
    >
      <button
        class="suppBtn"
        v-show="displayDeleteBtn"
        @click="deleteCard(card._id)"
      >
        <img src="../../assets/moins.png" alt="" />
      </button>
      <div class="bandeau">
        <h1>{{ card.titre }}</h1>
        <h4>{{ card.categorie }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    array: {
      type: Array,
    },
    ifSearch: {
      type: String,
      Default: false,
    },
    goWhere: {
      type: Function,
    },
    displayDeleteBtn: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    deleteCard(idCard) {
      this.$store.dispatch("card/deleteCard", idCard);
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
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.card:hover {
  transform: scale(1.1);
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
