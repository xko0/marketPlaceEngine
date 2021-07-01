<template>
  <transition name="fade">
    <div class="modal radiusCard" v-if="show">
      <div class="modal__dialog">
        <h1>Gestion des catégories</h1>
        <div class="addCategory">
          <input
            type="text"
            placeholder="ajouter une categorie"
            v-model="categorieResume.nom"
          />
          <button type="submit" @click="addCategory">Ajouter</button>
        </div>
        <div class="modal__body">
          <ul>
            <li v-for="(cat, catIndex) in categoriesArray" :key="catIndex">
              <input type="text" v-model="cat.nom" />
              <button @click="updateCategory(cat._id)">Modifier</button>
              <img
                src="../../assets/trash.png"
                alt=""
                @click="deleteCategory(cat._id)"
              />
            </li>
          </ul>
        </div>

        <div class="modal__footer">
          <button class="radius" type="submit" @click="closeModal">
            Fermer
          </button>
        </div>
      </div>
    </div>
  </transition>
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
        .post("http://localhost:3001/api/categorie", {
          ...this.categorieResume,
        })
        .then(() => {
          this.categorieResume.nom = "";
          // on "rafraîchit" la liste des catégories:
          this.$store.dispatch('categorie/getCategories');
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteCategory(idCat) {
      this.$store.dispatch("categorie/deleteCategory", idCat);
    },
    updateCategory(idCat) {
      // filter() est mieux !
      for (let i = 0; i < this.categoriesArray.length; i++) {
        if (this.categoriesArray[i]._id === idCat) {
          return axios
            .put(`http://localhost:3001/api/categorie/${idCat}`, {
              ...this.categorieResume,
              nom: this.categoriesArray[i].nom,
            })
            .then(() => {})
            .catch((error) => {
              console.error(error);
            });
        }
      }
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  width: 70%;
  position: fixed;
  top: 20%;
  left: 15%;
  z-index: 9;
  height: 70vh;
}
.modal__body ul {
  height: 25rem;
  overflow-y: scroll;
  margin: 1% 0;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
.modal__body ul li {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

input {
  margin: 10px;
  width: 30%;
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
img {
  cursor: pointer;
}
.modal__footer {
  text-align: center;
  margin-top: 20px;
}
h1 {
  text-align: center;
  margin-bottom: 10px;
}
</style>



