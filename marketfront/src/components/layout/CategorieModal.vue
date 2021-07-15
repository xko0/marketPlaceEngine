<template>
  <transition name="fade">
    <div class="modal radiusCard" v-if="show">
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
        <p></p>
      </div>

      <div class="modal__footer">
        <button class="radius" type="submit" @click="closeModal">Fermer</button>
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
          this.$store.dispatch("categorie/getCategories");
          let updateCat = document.querySelector(".modal__body p");
          updateCat.innerHTML = "Catégorie créée avec succés !";
          updateCat.setAttribute("style", "display: block");
          setTimeout(() => {
            updateCat.setAttribute("style", "display: none");
          }, 2000);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteCategory(idCat) {
      this.$store.dispatch("categorie/deleteCategory", idCat);
    },
    updateCategory(idCat) {
      this.categoriesArray.filter((category) => {
        if (category._id === idCat) {
          return axios
            .put(`http://localhost:3001/api/categorie/${idCat}`, {
              ...this.categorieResume,
              nom: category.nom,
            })
            .then(() => {
              let updateCat = document.querySelector(".modal__body p");
              updateCat.innerHTML = "Catégorie modifiée avec succés !";
              updateCat.setAttribute("style", "display: block");
              setTimeout(() => {
                updateCat.setAttribute("style", "display: none");
              }, 2000);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
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
  box-shadow: var(--boxShadow);
  width: 70%;
  position: fixed;
  top: 12%;
  left: 15%;
  z-index: 9;
  height: 75vh;
}
.modal__body ul {
  height: 25rem;
  overflow-y: scroll;
  margin: 1% 0;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  position: relative;
}
.modal__body ul li {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.modal__body p {
  width: 100%;
  padding: 1%;
  text-align: center;
  background-color: rgb(49, 211, 49);
  display: none;
  position: absolute;
  top: 81.5%;
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
  width: 40px;
}
.modal__footer {
  text-align: center;
}
h1 {
  text-align: center;
  margin-bottom: 10px;
}
</style>



