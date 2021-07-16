<template>
  <div class="modal">
    <AdminBar />
    <div class="addCategory">
      <input
        class="radius"
        type="text"
        placeholder="Ajouter une categorie"
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
  </div>
</template>

<script>
import AdminBar from "../layout/adminBar.vue";
import axios from "axios";
import { mapState } from "vuex";

export default {
  components: {
    AdminBar,
  },
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
    addCategory() {
      return axios
        .post("http://localhost:3001/api/categorie", {
          ...this.categorieResume,
        })
        .then(() => {
          this.categorieResume.nom = "";
          // on "rafraîchit" la liste des catégories:
          this.$store.dispatch("categorie/getCategories");

          // affichage du message de confirmation:
          let updateCat = document.querySelector(".modal__body p");
          updateCat.innerHTML = "Catégorie créée avec succés !";
          updateCat.setAttribute(
            "style",
            "display: block; background-color: rgb(49, 211, 49);"
          );
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
              updateCat.setAttribute(
                "style",
                "display: block; background-color: rgb(255, 208, 0);"
              );
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
}
.addCategory {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}
.addCategory input {
  font-size: 1rem;
  padding-left: 30px;
  width: 40%;
  border: solid 1px var(--bluePrimary);
  background-color: white;
  height: 8vh;
}
.addCategory button {
  height: 6vh;
  width: 15vh;
  margin-left: 5vh;
  border-radius: 30px;
}
.modal__body p {
  width: 100%;
  padding: 1%;
  text-align: center;
  position: fixed;
  bottom: 5vh;
  display: none;
}
.modal__body ul {
  margin: 3% 0 4% 0;
  position: relative;
}
.modal__body ul li:nth-child(odd),
.modal__body ul li:nth-child(odd) input {
  background-color: whitesmoke;
}
.modal__body ul li {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 6vh;
}
.modal__body input {
  font-size: 1rem;
  padding: 1vh;
  height: 23px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid black;
}
.modal__body button {
  border-radius: 15px;
  width: 100px;
  height: 35px;
  padding: 0;
  cursor: pointer;
  box-shadow: none;
}
img {
  cursor: pointer;
  width: 40px;
}
</style>



