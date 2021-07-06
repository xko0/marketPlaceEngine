<template>
  <div class="adminHome">
    <div class="admin">
      <header class="gestionAdmin">
        <router-link to="/admincreatecard">
          <img src="../../assets/plus.png" class="icons plus" alt="bouton plus"/>
        </router-link>
        <img src="../../assets/moins.png" class="icons moins" alt="bouton moins" @click="displayDeleteBtn = !displayDeleteBtn"/>
        <input class="rechercheAdmin radius" type="text" placeholder="recherche" />
        <select id="pet-select" class="radius optionCategory" type="select" name="">
          <option>--Categories--</option>
          <option v-for="(cat, catIndex) in categoriesArray" :key="catIndex">{{ cat.nom }}</option>
        </select>
      </header>
    </div>
    <Cards :displayDeleteBtn="!displayDeleteBtn" :goWhere="goToUpdateCard" :array="cardsArray"/>
    
  </div>
</template>

<script>
import Cards from '../layout/Cards.vue'
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      displayDeleteBtn: true,
    }
  },
  computed: {
    ...mapState("categorie", ["categoriesArray"]),
    ...mapActions("categorie", ["getCategories"]),
    ...mapState("card", ["cardsArray"]),
    ...mapActions("card", ["getCards"]),
  },
  components: { 
    Cards 
  },
  mounted () {
    this.getCategories;
    this.getCards;
  },
  methods: {
    goToUpdateCard(idCard) {
      if(this.displayDeleteBtn) { // Condition qui évite de changer de page quand le bouton "supprimer" est affiché
      this.$router.push(`/adminupdateCard/${idCard}`);
      }
    },
  },
}
</script>

<style scoped>
.adminHome {
  padding-bottom: 7%;
}
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
