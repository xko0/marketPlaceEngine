<template>
  <transition name="fade">
    <div class="modal radiusCard" v-if="show">
      <div class="modal__dialog">

        <div class="modal__body">
          <div>
            <input type="text" v-model="categorieResume.nom">
            <button type="submit" @click="ajoutCat">Ajouter</button>
          </div>
          <ul>
              <li v-for="(cat, catIndex) in tabCat" :key="catIndex">
                    <input type="text" v-model="cat.nom" />
                    <p @click="modifierCat(cat._id)">Modifier</p>
                    <img src="../../assets/trash.png" alt="" @click="suppCat(cat._id)">
              </li>
          </ul>
        </div>

        <div class="modal__footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios"

export default {
  name: "Modal",
  data() {
    return {
      show: false,
      categorieResume: {
        nom: "",
      },
      tabCat: []
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
      axios.get('http://localhost:3001/api/categorie')
      .then(res => {
        // réponse sous forme de tableau
        console.log(res.data);
        let tab = res.data; 
        // copie du tableau réponse dans tabCat, sur lequel on boucle dans le template
        this.tabCat = tab.slice(0); 
      })
      .catch(error => {
        console.error(error)
      })
    },
    async ajoutCat() {
      try {
        await axios.post('http://localhost:3001/api/categorie', {...this.categorieResume});
        console.log("categorie créée");
        this.categorieResume.nom = "";
        // on "rafraîchit" la liste des catégories:
        this.afficherCat();
      } catch(e) {
        console.log(e);
      }
    },
    suppCat(idCat) {
      axios.delete(`http://localhost:3001/api/categorie/${idCat}`)
      .then(res => {
        console.log(`${res.data} supprimé`);
        // "recharge" la liste des catégories => affichage sans la catégorie supprimée
        this.afficherCat();
      })
      .catch(error => console.error(error))
    },
    modifierCat(idCat) {
      for(let i=0; i<this.tabCat.length; i++) {
        if(this.tabCat[i]._id === idCat) {
          axios.put(`http://localhost:3001/api/categorie/${idCat}`, {...this.categorieResume, nom: this.tabCat[i].nom})
          .then(res => {
            console.log(`${res} modifié`);
          })
          .catch(error => {
            console.error(error);
          })
        }
      }
    }
  }
};
</script>


<style scoped>
.modal {
    background-color: #fff;
    width: 70%;
    padding: 3%;
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    top: 30%;
    left: 15%; 
    z-index: 9;
}

.modal__body ul li {
    display: flex;
    justify-content: space-between;
}
</style>