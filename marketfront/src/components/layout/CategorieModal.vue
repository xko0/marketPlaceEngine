<template>
  <transition name="fade">
    <div class="modal radiusCard" v-if="show">
      <div class="modal__dialog">
        <h1>Gestion des catégories</h1>
        <div class="ajoutCat">
          <input
            type="text"
            placeholder="ajouter une categorie"
            v-model="categorieResume.nom"
          />
          <button type="submit" @click="ajoutCat">Ajouter</button>
        </div>
        <div class="modal__body">
          <ul>
            <li v-for="(cat, catIndex) in tabCat" :key="catIndex">
              <input type="text" v-model="cat.nom" />
              <button @click="modifierCat(cat._id)">Modifier</button>
              <img src="../../assets/trash.png" alt="" @click="suppCat(cat._id)" />
            </li>
          </ul>
        </div>

        <div class="modal__footer">
            <button class="radius" type="submit" @click="closeModal">Fermer</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios";

export default {
  name: "Modal",
  data() {
    return {
      show: false,
      categorieResume: {
        nom: "",
      },
      tabCat: [],
    };
  },
  methods: {
    closeModal() {
      this.show = false;
      document.querySelector("body").classList.remove("overflow-hidden");
      document.querySelector("form").classList.remove("blur");
    },
    openModal() {
      this.afficherCat();
      this.show = true;
      document.querySelector("body").classList.add("overflow-hidden");
      document.querySelector("form").classList.add("blur");
    },
    afficherCat() {
      axios.get("http://localhost:3001/api/categorie")
            .then((res) => {
              // réponse sous forme de tableau
              console.log(res.data);
              let tab = res.data;
              // copie du tableau réponse dans tabCat, sur lequel on boucle dans le template
              this.tabCat = tab.slice(0);
            })
            .catch((error) => {
              console.error(error);
            });
    },
    async ajoutCat() {
      try {
        await axios.post("http://localhost:3001/api/categorie", {
          ...this.categorieResume,
        });
        console.log("categorie créée");
        this.categorieResume.nom = "";
        // on "rafraîchit" la liste des catégories:
        this.afficherCat();
      } catch (e) {
        console.log(e);
      }
    },
    suppCat(idCat) {
      axios
        .delete(`http://localhost:3001/api/categorie/${idCat}`)
        .then((res) => {
          console.log(`${res.data} supprimé`);
          // "recharge" la liste des catégories => affichage sans la catégorie supprimée
          this.afficherCat();
        })
        .catch((error) => console.error(error));
    },
    modifierCat(idCat) {
      // filter() est mieux !
      for (let i = 0; i < this.tabCat.length; i++) {
        if (this.tabCat[i]._id === idCat) {
          axios.put(`http://localhost:3001/api/categorie/${idCat}`, {
              ...this.categorieResume,
              nom: this.tabCat[i].nom,
            })
            .then((res) => {
              console.log(`${res} modifié`);
              alert("Catégorie modifiée avec succés")
            })
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
.ajoutCat {
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



