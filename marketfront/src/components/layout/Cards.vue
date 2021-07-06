<template>
  <div class="display">
    <div
      class="card"
      v-for="(card, cardIndex) in array"
      :key="cardIndex"
      @click="goWhere(card._id)"
    >
      <button
        class="suppBtn"
        v-show="displayDeleteBtn"
        @click="deleteCard(card._id)"
      >
        <img src="../../assets/moins.png" alt="" />
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
  position: relative;
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
