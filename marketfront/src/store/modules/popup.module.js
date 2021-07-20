const popup = {
  namespaced: true,
  state: {
    message: ''
  },
  getters: {
    getMessage: state => {
      return state.message
    }
  },
  actions: {
    popUpMsgGreen() {
      let popUpMsg = document.getElementById("popup");
      popUpMsg.setAttribute(
        "style",
        `display: block; background-color: green;`
      );
      setTimeout(() => {
        popUpMsg.setAttribute("style", "display: none");
      }, 2000);
    },
    popUpMsgRed() {
      let popUpMsg = document.getElementById("popup");
      popUpMsg.setAttribute(
        "style",
        `display: block; background-color: red;`
      );
      setTimeout(() => {
        popUpMsg.setAttribute("style", "display: none");
      }, 2000);
    },
  },
};

export default popup;