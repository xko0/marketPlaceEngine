import axios from "../../config/axios-interceptor";

const admin = {
  namespaced: true,
  state: {
    isConnected: false,
    user: '',
    jwToken: localStorage.getItem("jwToken"),
    errors: []
  },
  mutations: {
    IS_CONNECTED(state, data) {
      state.isConnected = true;
      state.jwToken = data.token
      localStorage.setItem("jwToken", state.jwToken)
    },
    IS_DECONNECTED(state) {
      state.isConnected = false;
      state.jwToken = null;
      localStorage.setItem("jwToken", state.jwToken)
    },
  },
  actions: {
    logIn({ commit }, user) {
      axios
        .post("http://localhost:3001/api/user/login", user)
        .then((res) => {
            commit("IS_CONNECTED", res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    logOut({ commit }) {
      commit("IS_DECONNECTED");
    },
    // signUp() {
    //   axios
    //     .post("http://localhost:3001/api/user/signup", { ...this.user })
    //     .then(() => {
    //       console.log("creation ok");
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },
  },
};

export default admin;
