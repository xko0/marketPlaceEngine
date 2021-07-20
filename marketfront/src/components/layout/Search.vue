<template>
  <div class="searchPage">
    <div class="search">
      <div v-if="isAdmin">
        <router-link to="/admincreatecard">
          <img
            src="../../assets/plus.png"
            class="icons plus"
            alt="bouton plus"
          />
        </router-link>
        <img
          src="../../assets/moins.png"
          class="icons moins"
          alt="bouton moins"
          @click="displayDeleteBtn = !displayDeleteBtn"
        />
      </div>
      <input
        class="radius searchWord"
        type="search"
        name=""
        placeholder="Nom de la marketplace"
        v-model="searchWord"
        @keyup="searchCardsByWords"
      />
      <select
        id="cat-select"
        class="radius searchCategory"
        type="select"
        name=""
        @change="searchCardsByCat(selectedCat)"
        v-model="selectedCat"
      >
        <option selected="selected" value="">Toutes les catégories</option>
        <option v-for="(cat, catIndex) in categoriesArray" :key="catIndex">
          {{ cat.nom }}
        </option>
      </select>
    </div>

    <div v-if="!isAdmin">
      <Cards
        v-if="ifSearch === 'cards'"
        :array="cardsArray"
        :goWhere="goCardUrl"
      />
      <Cards
        v-else-if="ifSearch === 'categories'"
        :array="searchCatArray"
        :goWhere="goCardUrl"
      />
      <Cards
        v-else-if="ifSearch === 'words'"
        :array="searchWordsArray"
        :goWhere="goCardUrl"
      />
    </div>
    <div v-else>
      <Cards
        :displayDeleteBtn="!displayDeleteBtn"
        v-if="ifSearch === 'cards'"
        :array="cardsArray"
        :goWhere="goToUpdateCard"
      />
      <Cards
        :displayDeleteBtn="!displayDeleteBtn"
        v-else-if="ifSearch === 'categories'"
        :array="searchCatArray"
        :goWhere="goToUpdateCard"
      />
      <Cards
        :displayDeleteBtn="!displayDeleteBtn"
        v-else-if="ifSearch === 'words'"
        :array="searchWordsArray"
        :goWhere="goToUpdateCard"
      />
    </div>
    <p class="ifNoResult" v-show="ifNoResult">
      Aucune marketplace ne correspond à vos critères de recherche.
    </p>
  </div>
</template>

<script>
import Cards from "../layout/Cards.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Cards,
  },
  data() {
    return {
      ifSearch: "cards",
      searchCatArray: [],
      selectedCat: "",
      searchWordsArray: [],
      searchWord: "",
      ifNoResult: false,
      regexp: /^[0-9A-Za-zàéèçù\s-]{0,30}$/,
      displayDeleteBtn: true,
      isAdmin: false,
    };
  },
  mounted() {
    this.getCategories;
    this.getCards;
    if (this.$route.path.substring(1) === "adminhome") {
      this.isAdmin = true;
    }
  },
  computed: {
    ...mapState("categorie", ["categoriesArray"]),
    ...mapActions("categorie", ["getCategories"]),
    ...mapState("card", ["cardsArray"]),
    ...mapActions("card", ["getCards"]),
  },
  methods: {
    searchCardsByWords() {
      if (this.searchWord.match(this.regexp)) {
        this.ifNoResult = false;
        if (this.searchWord !== "") {
          this.ifSearch = "words";
          this.selectedCat = document.querySelector(
            ".search select :first-child"
          ).value; // raz des catégories
          this.searchWordsArray = this.cardsArray.filter((card) =>
            card.titre.toUpperCase().includes(this.searchWord.toUpperCase())
          );
          this.noResult(this.searchWordsArray);
        } else {
          this.ifSearch = "cards";
        }
      } else {
        // si regexp non valide, on supprime le dernier caractère tappé
        this.searchWord = this.searchWord.substring(
          0,
          this.searchWord.length - 1
        );
      }
    },
    searchCardsByCat(catName) {
      this.ifNoResult = false;
      if (catName !== "") {
        this.ifSearch = "categories";
        this.searchWord = ""; // raz de la barre de recherche
        this.searchCatArray = this.cardsArray.filter(
          (card) => card.categorie === catName
        );
        this.noResult(this.searchCatArray);
      } else {
        this.ifSearch = "cards";
      }
    },
    noResult(array) {
      if (!array[0]) {
        return (this.ifNoResult = true);
      }
    },
    goCardUrl(idCard) {
      this.$router.push(`/description/${idCard}`);
    },
    goToUpdateCard(idCard) {
      if (this.displayDeleteBtn) {
        // Condition qui évite de changer de page quand le bouton "supprimer" est affiché
        this.$router.push(`/adminupdateCard/${idCard}`);
      }
    },
  },
};
</script>

<style scoped>
.searchPage {
  padding-bottom: 5%;
}
.search {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 8vh;
  margin-bottom: 3%;
}
.search div:first-child {
  margin-right: 5vh;
}
.search img {
  width: 8vh;
  height: auto;
}
.searchWord {
  font-size: 1rem;
  padding-left: 30px;
  width: 40%;
  border: solid 1px var(--bluePrimary);
  background-color: white;
}
.searchCategory {
  font-size: 1rem;
  width: 20%;
  padding: 0 30px;
  background-color: white;
  border: solid 1px var(--bluePrimary);
}
.ifNoResult {
  width: 100%;
  text-align: center;
  margin-bottom: 10vh;
}
@media screen and (max-width: 769px) {
  .search {
    margin-bottom: 5vh;
  }
  .searchWord {
    width: 60%;
    padding-left: 15px;
  }
  .searchCategory {
    width: 40%;
    padding-left: 15px;
  }
}
</style>