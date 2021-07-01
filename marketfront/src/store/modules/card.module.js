import axios from "axios";

const card = {
  namespaced: true,
  state: {
    cardsArray: [],
  },
  mutations: {
    SAVE_CARDS(state, response) {
      state.cardsArray = response;
    },
  },
  actions: {
    getCards({ commit }) {
      return axios
        .get("http://localhost:3001/api/card")
        .then((res) => {
          commit("SAVE_CARDS", res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteCard({ dispatch }, idCard) {
      return axios
        .delete(`http://localhost:3001/api/card/${idCard}`)
        .then(() => {
          // "recharge" la liste des cartes => affichage sans la carte supprimée
          dispatch("getCards");
        })
        .catch((error) => console.error(error));
    },
  },
};

export default card;
