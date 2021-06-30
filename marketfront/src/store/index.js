import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tabCards: []
  },
  mutations: {
    GET_CARDS(state, response) {
      state.tabCards = response;
    }
  },
  actions: {
    getCards({ commit }) {
      axios.get("http://localhost:3001/api/card")
      .then((res) => {
        commit('GET_CARDS', res.data)
      })
      .catch((error) => {
        console.error(error);
      });
    },
    deleteCard({ dispatch }, idCard) {
      axios.delete(`http://localhost:3001/api/card/${idCard}`)
      .then(() => {
        // "recharge" la liste des cartes => affichage sans la carte supprimée
        dispatch('getCards')
      })
      .catch(error => console.error(error))
    },
  },
  modules: {
  }
})
