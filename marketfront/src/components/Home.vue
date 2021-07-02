<template>
  <div>
    <main class="home">
      <div>
        <h1>Search Marketplace</h1>
        <h2>Trouvez votre marketplace en un clic</h2>
      </div>
      <div class="search">
        <input
          class="radius searchWord"
          type="search"
          name=""
          placeholder="Nom de la marketplace"
        />
        <select
          id="cat-select"
          class="radius searchCategory"
          type="select"
          name=""
        >
          <option>--Catégories--</option>
          <option v-for="(cat, catIndex) in categoriesArray" :key="catIndex">
            {{ cat.nom }}
          </option>
        </select>
      </div>
    </main>
    <Cards />
    <aside>
      <button class="radius btnReferencement">Ajoutez votre marketplace</button>
    </aside>
    <section class="contentFormulaire">
      <form class="formulaire radiusCard">
        <h1 class="titleForm">Etre au courant des nouvelles MarketPlaces</h1>
        <input
          class="inputForm radius"
          placeholder="Votre email pour une Newletter"
          type="email"
        />
        <button type="submit" class="btnForm radius">S'abonner</button>
      </form>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Cards from "./layout/Cards.vue";
export default {
  components: {
    Cards,
  },
  mounted() {
    this.getCategories;
  },
  computed: {
    ...mapState("categorie", ["categoriesArray"]),
    ...mapActions("categorie", ["getCategories"]),
  },
};
</script>

<style scoped>
.home {
  height: 50vh;
  background: var(--bluePrimary);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 7%;
}
.home h1 {
  text-align: center;
  font-size: 6rem;
  color: white;
}
.home h2 {
  text-align: center;
  font-size: 3rem;
  color: white;
}
/* barre de recherche */
.search {
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 100%;
  transform: translateY(-50%);
  height: 8vh;
}
.searchWord {
  padding-left: 30px;
  width: 40%;
  border: solid 1px var(--bluePrimary);
  background-color: white;
}
.searchCategory {
  width: 20%;
  padding: 0 30px;
  background-color: white;
  border: solid 1px var(--bluePrimary);
}
/* bouton aside */
.btnReferencement {
  position: fixed;
  top: 6vh;
  right: 1vh;
}
/* formulaire */
.contentFormulaire {
  display: flex;
  justify-content: center;
  padding-bottom: 7%;
}
.formulaire {
  width: 40%;
  height: 35vh;
  background-color: var(--bluePrimary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 50px;
}
.inputForm {
  width: 80%;
  height: 5vh;
  margin: 5% 0 7% 0;
  padding-left: 30px;
}
.btnForm {
  width: 20%;
}
.titleForm {
  font-size: 2rem;
  color: white;
  letter-spacing: 0.1rem;
  line-height: 1.6;
}
@media screen and (max-width: 768px) {
  /* title */
  .home {
    height: 40vh;
    margin-bottom: 15%;
  }
  .home h1 {
    font-size: 3rem;
  }
  .home h2 {
    font-size: 1rem;
  }
  /* barre de recherche */
  .searchWord {
    width: 60%;
    padding-left: 15px;
  }
  .searchCategory {
    width: 40%;
    padding-left: 15px;
  }
  /* bouton aside */
  .btnReferencement {
    padding: 0 3%;
    height: 3.3vh;
    position: absolute;
    top: 1vh;
    left: 1vh;
  }
  /* formulaire */
  .contentFormulaire {
    margin: 0;
  }
  .formulaire {
    width: 100%;
    height: 40vh;
    border-radius: 0;
    padding: 15% 0 20% 0;
  }
  .inputForm {
    padding-left: 15px;
  }
  .btnForm {
    width: 50%;
  }
  .titleForm {
    font-size: 1rem;
    letter-spacing: 0rem;
  }
}
</style>
