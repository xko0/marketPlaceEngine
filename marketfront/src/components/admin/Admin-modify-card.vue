<template>
  <div>
    <Modal ref="modalName" />
    <form class="radius" @submit.prevent="updateCard(cardResume._id)">
      <header>
        <img :src="cardResume.logo" alt="logoCard" />
        <input type="text" placeholder="Logo" v-model="cardResume.logo" />
      </header>
      <main>
        <section class="resume">
          <input v-model="cardResume.titre" type="text" placeholder="Nom de la marketplace" />
          <textarea
            type="text"
            class="inputSite"
            placeholder="Description de la marketplace"
            v-model="cardResume.resumeMarketPlace"
          />
        </section>
        <section class="infos">
          <div class="detailsMarketPlace">
            <label for="anneeCreation">Année de Création :</label>
            <input
              type="number"
              v-model="cardResume.anneeCreation"
              id="anneeCreation"
            />
          </div>
          <div class="detailsMarketPlace">
            <label for="localisation">Localisation :</label>
            <input
              type="text"
              v-model="cardResume.localisation"
              id="localisation"
            />
          </div>
          <div class="detailsMarketPlace">
            <label for="leveeFonds">Levée de fonds :</label>
            <input
              type="number"
              v-model="cardResume.leveeFonds"
              id="leveeFonds"
            />
          </div>
          <div class="detailsMarketPlace">
            <div class="categories">
              <label for="categorie">Catégorie :</label>
              <img
                src="../../assets/update.png"
                alt=""
                @click="$refs.modalName.openModal()"
              />
            </div>
            <select name="" id="" v-model="cardResume.categorie">
              <option>--Catégories--</option>
              <option
                v-for="(cat, catIndex) in categoriesArray"
                :key="catIndex"
              >
                {{ cat.nom }}
              </option>
            </select>
          </div>
          <div class="detailsMarketPlace">
            <label for="url">Site internet :</label>
            <input type="text" v-model="cardResume.urlMarketPlace" name="url" />
          </div>
          <button type="submit" class="radius">Modifier</button>
        </section>
      </main>
      <!-- <footer>
        <div class="bgScreen radius">
          <img class="screen" src="../../assets/upload.png" alt="screen1" />
          <input
            type="text"
            placeholder="Image 1"
            v-model="cardResume.imgSite1"
          />
        </div>
        <div class="bgScreen radius">
          <img class="screen" src="../../assets/upload.png" alt="screen2" />
          <input
            type="text"
            placeholder="Image 2"
            v-model="cardResume.imgSite2"
          />
        </div>
        <div class="bgScreen radius">
          <img class="screen" src="../../assets/upload.png" alt="screen3" />
          <input
            type="text"
            placeholder="Image 3"
            v-model="cardResume.imgSite3"
          />
        </div>
      </footer> -->
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "../layout/CategorieModal.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      idCardUrl: this.$route.params.id,
      cardResume: {
        titre: "",
        anneeCreation: "",
        localisation: "",
        leveeFonds: "",
        categorie: "",
        resumeMarketPlace: "",
        urlMarketPlace: "",
        logo: "",
        imgSite1: "",
        imgSite2: "",
      },
    };
  },
  mounted() {
    let cardFind = this.$store.state.card.cardsArray.find(
      (card) => card._id === this.idCardUrl
    );
    this.cardResume = { ...cardFind };
    this.getCategories;
  },
  computed: {
    ...mapState("categorie", ["categoriesArray"]),
    ...mapActions("categorie", ["getCategories"]),
  },
  methods: {
    updateCard(idCard) {
      axios
        .put(`http://localhost:3001/api/card/${idCard}`, { ...this.cardResume })
        .then(() => {
          this.$router.push("/adminhome"); // redirection vers la page admin-home
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.blur {
  filter: blur(2px) contrast(50%);
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 30vh;
  margin-top: 3%;
}
header img {
  width: auto;
  height: 90%;
}
main {
  display: flex;
  justify-content: space-around;
  width: 60%;
  height: 40vh;
  margin: 5% 0;
}
.resume {
  flex-direction: column;
}
.info {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
}
.resume textarea {
  /* height: auto;
  width: 80%; */
  margin-top: 2%;
}
.detailsMarketPlace {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2%;
}
.categories {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.categories img {
  width: 15%;
  margin-left: 5%;
}
footer {
  display: flex;
}
</style>
