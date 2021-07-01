<template>
  <div>
    <div class="admin">
      <header class="gestionAdmin">
        <router-link to="/admincreatecard">
          <img src="../../assets/plus.png" class="icons plus" alt="bouton plus"/>
        </router-link>
        <img src="../../assets/moins.png" class="icons moins" alt="bouton moins" @click="displayDeleteBtn = !displayDeleteBtn"/>
        <input class="rechercheAdmin radius" type="text" placeholder="recherche" />
        <select id="pet-select" class="radius optionCategory" type="select" name="">
          <option>--Categories--</option>
          <option v-for="(cat, catIndex) in tabCat" :key="catIndex">{{ cat.nom }}</option>
        </select>
      </header>
    </div>
    <AdminCards :displayDeleteBtn="!displayDeleteBtn"/>
    
  </div>
</template>

<script>
import AdminCards from './Admin-card.vue'
import axios from 'axios'
export default {
  data() {
    return {
      displayDeleteBtn: true,
      tabCat: []
    }
  },
  components: { 
    AdminCards 
  },
  mounted () {
    this.afficherCat();
  },
  methods: {
    afficherCat() {
      axios.get("http://localhost:3001/api/categorie")
      .then((res) => {
        // réponse sous forme de tableau
        let tab = res.data;
        // copie du tableau réponse dans tabCat, sur lequel on boucle dans le template
        this.tabCat = tab.slice(0);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  },
}
</script>

<style scoped>
.admin {
  display: flex;
  justify-content: center;
  position: sticky;
  top: 10px;
  background-color: transparent;
  z-index: 5;
}
.gestionAdmin {
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 15vh;
}
.icons {
  width: 80px;
  height: 80px;
  margin-left: 10px;
}
.rechercheAdmin {
  width: 200px;
  height: 80px;
  padding: 30px;
  background-color: white;
  border: solid 1px var(--bluePrimary);
  margin-left: 10px;
}
.optionCategory {
  width: 100px;
  height: 80px;
  background-color: white;
  border: solid 1px var(--bluePrimary);
  margin-left: 10px;
}
.cards {
  margin-bottom: 1%;
}
@media screen and (max-width: 768px) {
  .icons {
    width: 40px;
    height: 40px;
    margin-left: 10px;
  }
  .rechercheAdmin {
    width: 150px;
    height: 40px;
    padding: 10px;
  }
  .optionCategory {
    width: 100px;
    height: 40px;
  }
}
</style>
