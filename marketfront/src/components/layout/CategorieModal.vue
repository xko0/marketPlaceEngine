<template>
    <div class="modal radiusCard" v-if="show">
      <div class="addCategory">
        <input
          type="text"
          placeholder="Ajouter une categorie"
          v-model="categorieResume.nom"
        />
        <button type="submit" @click="addCategory">Ajouter</button>
      </div>
      <div class="modal__footer">
        <button class="radius" type="submit" @click="closeModal">Fermer</button>
      </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Modal",
  data() {
    return {
      show: false,
      categorieResume: {
        nom: "",
      },
    };
  },
  computed: {
    ...mapState("categorie", ["categoriesArray"]),
  },
  methods: {
    closeModal() {
      this.show = false;
      document.querySelector("body").classList.remove("overflow-hidden");
      document.querySelector("form").classList.remove("blur");
    },
    openModal() {
      this.show = true;
      document.querySelector("body").classList.add("overflow-hidden");
      document.querySelector("form").classList.add("blur");
    },
    addCategory() {
      return axios
        .post(`${process.env.VUE_APP_HTTP_REQUEST}/categorie`, {
          ...this.categorieResume,
        })
        .then(() => {
          this.categorieResume.nom = "";
          // on "rafraîchit" la liste des catégories:
          this.$store.dispatch("categorie/getCategories");
          this.closeModal()
          this.$store.state.popup.message = "Catégorie créée avec succés";
          this.$store.dispatch("popup/popUpMsgGreen");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #fff;
  box-shadow: var(--boxShadow);
  width: 30%;
  height: 30vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
}
input {
  margin: 10px;
  width: 50%;
  height: 40px;
  border-radius: 15px;
  text-align: center;
}
button {
  border-radius: 15px;
  width: 80px;
  height: 40px;
  padding: 0;
  cursor: pointer;
}
.addCategory {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}
.modal__footer {
  text-align: center;
}
</style>



