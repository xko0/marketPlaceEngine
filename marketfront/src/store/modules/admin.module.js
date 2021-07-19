const admin = {
  namespaced: true,
  state: {
    isConnected: localStorage.getItem("jwToken"), //vérifie si le jwToken du localStorage est présent, sinon isConnected = false
    jwToken: "",
    errors: [],
  },
  mutations: {
    IS_CONNECTED(state, data) {
      state.isConnected = true;
      state.jwToken = data.token;
      localStorage.setItem("jwToken", state.jwToken);
    },
    IS_DECONNECTED(state) {
      state.isConnected = false;
      localStorage.removeItem("jwToken");
    },
  },
  actions: {
    logOut({ commit }) {
      commit("IS_DECONNECTED");
    },
  },
};

export default admin;
