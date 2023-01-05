import Vue from 'vue'
import Vuex from 'vuex'

// MODULES 
import card from'./modules/card.module'
import categorie from'./modules/categorie.module'
import admin from'./modules/admin.module'
import popup from'./modules/popup.module'
import proposition from'./modules/proposition.module'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    card,
    categorie,
    admin,
    popup,
    proposition
  },
  plugins: [createPersistedState()]
})
