<template>
  <div>
    <main class="home">
      <h1 id="title">Search Marketplace</h1>
      <h2 id="littleTitle">Trouvez votre marketplace en un clic</h2>
      <div class="search">
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
    </main>
    <Cards v-if="ifSearch === 'cards'" :array="cardsArray" />
    <Cards v-else-if="ifSearch === 'categories'" :array="searchCatArray" />
    <Cards v-else-if="ifSearch === 'words'" :array="searchWordsArray" />
    <p class="ifNoResult" v-show="ifNoResult">
      Aucune marketplace ne correspond à vos critères de recherche. Proposez la
      votre ici
    </p>
    <aside>
      <div id="referencement">
        <button class="radius btnReferencement">
          Ajoutez votre marketplace
        </button>
      </div>
    </aside>
    <article class="contentFormulaire">
      <div class="formulaire radiusCard">
        <h1 class="titleForm">Etre au courant des nouvelles MarketPlace</h1>
        <input
          class="inputForm radius"
          placeholder="votre email pour une Newletter"
          type="email"
        />
        <button type="submit" class="btnForm radius">Envoyer</button>
      </div>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Cards from "./layout/Cards.vue";

export default {
  data() {
    return {
      ifSearch: "cards",
      searchCatArray: [],
      selectedCat: "",
      searchWordsArray: [],
      searchWord: "",
      ifNoResult: false,
      regexp: /^[0-9A-Za-zàéèçù\s-]{0,30}$/,
    };
  },
  components: {
    Cards,
  },
  mounted() {
    this.getCategories;
    this.getCards;
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
        this.searchWord = this.searchWord.substring(0, this.searchWord.length - 1) 
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
  },
};
</script>

<style scoped>
/* title */
main {
  width: 100%;
  height: 50vh;
  background: var(--bluePrimary);
}
img {
  width: 5rem;
  height: 3rem;
  z-index: 5;
  transform: rotateY(180deg);
  opacity: 0.33;
}
#title {
  display: flex;
  justify-content: center;
  font-size: 6rem;
  color: white;
  padding-top: 4%;
  background: var(--bluePrimary);
}
#littleTitle {
  display: flex;
  justify-content: center;
  font-size: 2rem;
  color: white;
  padding-top: 30px;
  background: var(--bluePrimary);
}
/* barre de recherche */
.search {
  display: flex;
  position: relative;
  margin-top: 8%;
  justify-content: center;
  height: 10vh;
  background-color: transparent;
}
input {
  padding: 30px;
  background-color: white;
  border: solid 1px var(--bluePrimary);
}
.searchWord {
  width: 40%;
}
.searchCategory {
  width: 20%;
  padding: 30px;
  background-color: white;
  border: solid 1px var(--bluePrimary);
}

/* bouton aside */
aside {
  display: flex;
  justify-content: flex-end;
  margin: 5%;
}
button {
  padding: 2%;
  background-color: var(--bluePrimary);
  color: white;
  font-size: 1rem;
  border-color: var(--bluePrimary);
}
/* formulaire */
.contentFormulaire {
  display: flex;
  justify-content: center;
}
.formulaire {
  width: 40%;
  height: 35vh;
  background-color: var(--bluePrimary);
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 5%;
}
.inputForm {
  width: 80%;
  height: 3vh;
  margin: auto;
}
.btnForm {
  margin: auto;
  width: 20%;
  color: black;
  background-color: var(--button);
}
.btnReferencement {
  width: 30vh;
  color: black;
  background-color: var(--button);
  border: solid 1px var(--button);
  position: fixed;
  top: 5vh;
  right: 0;
  padding: 10px;
  margin-right: 1vh;
}
.titleForm {
  background-color: transparent;
  margin: 2%;
  color: white;
  letter-spacing: 0.3rem;
  line-height: 1.6;
}
.ifNoResult {
  width: 100%;
  margin-top: 5%;
  text-align: center;
}
@media screen and (max-width: 768px) {
  /* title */
  #title {
    font-size: 2rem;
    text-align: center;
  }
  #littleTitle {
    font-size: 1.3rem;
    text-align: center;
  }
  main {
    width: 100%;
    height: 50%;
    background: var(--bluePrimary);
    margin-bottom: 5vh;
  }
  img {
    display: none;
  }
  /* barre de recherche */
  .search {
    height: 3vh;
  }
  .searchWord {
    width: 50%;
    height: 0.5vh;
    padding: 25px;
  }
  .searchCategory {
    width: 30%;
    height: 0.5vh;
    padding: 25px;
  }
  #referencement {
    display: none;
  }
  .formulaire {
    width: 90%;
    height: 35vh;
    background-color: var(--bluePrimary);
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 5%;
  }
  button {
    padding: 1%;
  }
}
</style>
