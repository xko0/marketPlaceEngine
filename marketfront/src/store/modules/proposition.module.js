import axios from "axios";

const proposition = {
  namespaced: true,
  state: {
    propositionsArray: [],
  },
  actions: {
    getPropositions({ state }) {
      axios
        .get(`${process.env.VUE_APP_HTTP_REQUEST}/proposition`)
        .then((res) => {
          state.propositionsArray = res.data;
        })
        .catch((error) => console.log(error));
    },
    deleteProposition({ dispatch }, id) {
      return axios
        .delete(`${process.env.VUE_APP_HTTP_REQUEST}/proposition/${id}`)
        .then(() => {
          // "recharge" la liste des cartes => affichage sans la carte supprimée
          dispatch("getPropositions");
        })
        .catch((error) => console.error(error));
    },
  },
};

export default proposition;
