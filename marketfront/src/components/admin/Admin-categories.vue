<template>
  <div class="modal">
    <AdminBar />
    <div class="addCategory">
      <input
        class="radius"
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
}
.addCategory {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}
.addCategory input {
  padding-left: 30px;
  width: 40%;
  border: solid 1px var(--bluePrimary);
  background-color: white;
  height: 8vh;
}
.addCategory button {
  height: 6vh;
  width: 15vh;
  margin-left: 2%;
  border-radius: 30px;
}
.modal__body ul {
  margin: 3% 0 4% 0;
  position: relative;
}
.modal__body ul :nth-child(odd) {
  background-color: whitesmoke;
}
.modal__body ul li {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 6vh;
}
.modal__body p {
  width: 100%;
  padding: 1%;
  text-align: center;
  background-color: rgb(49, 211, 49);
  display: none;
  position: absolute;
  top: 100%;
  z-index: 15;
}
.modal__body input {
  padding: 1vh;
  margin-bottom: 1.2vh;
  height: 23px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid black;
  background-color: none;
  /* background-color: whitesmoke; */
  /* margin: 10px;
  width: 30%;
  height: 40px;
  border-radius: 15px;
  text-align: center; */
}
button {
  border-radius: 15px;
  width: 100px;
  height: 35px;
  padding: 0;
  cursor: pointer;
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



