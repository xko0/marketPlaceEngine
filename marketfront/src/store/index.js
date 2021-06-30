import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tabCards: [],
    cardResume: {
      titre: "",
      anneeCreation: "",
      localisation: "",
      leveeFonds: "",
      categorie: "",
      resumeMarketPlace: "",
      urlMarketPlace: "",
      logo: "",
      imgSite1: "",
      imgSite2: ""
    }
  },
  mutations: {
    GET_CARDS(state, response) {
      state.tabCards = response;
    }
  },
  actions: {
    postCard({ state }) {
      axios.post('http://localhost:3001/api/card', {...state.cardResume})
      .then(() => {})
      .catch((error) => {
        console.error(error);
      })
    },
    getCards({ commit }) {
      axios.get("http://localhost:3001/api/card")
      .then((res) => {
        commit('GET_CARDS', res.data)
      })
      .catch((error) => {
        console.error(error);
      })
    },
    getCard({ state }, idCard) {
      axios.get(`http://localhost:3001/api/card/${idCard}`)
      .then(res => {
        state.cardResume = {...res.data}; // on stock l'objet reçu de la bdd dans cardResume
      })
      .catch(error => console.error(error))
    },
    deleteCard({ dispatch }, idCard) {
      axios.delete(`http://localhost:3001/api/card/${idCard}`)
      .then(() => {
        // "recharge" la liste des cartes => affichage sans la carte supprimée
        dispatch('getCards')
      })
      .catch(error => console.error(error))
    },
    updateCard({ state }, idCard) {
      axios.put(`http://localhost:3001/api/card/${idCard}`, {...state.cardResume})
      .then(() => {})
      .catch(error => {
        console.error(error);
      })
    },
  },
  modules: {
  }
})
