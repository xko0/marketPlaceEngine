<template>
  <div>
    <Modal ref="modalName" />
    <form @submit.prevent="updateCard(cardResume._id)">
      <header>
        <div class="imgDesc radiusCard" :style="{'background': `url(${cardResume.imgSite1}) no-repeat center center`, 'background-size': '100%'}">
          <!-- <img class="screen" :src="cardResume.imgSite1" alt="screen1" /> -->
          <input
            type="text"
            placeholder="Image 1"
            v-model="cardResume.imgSite1"
          />
        </div>
        <div class="imgDesc radiusCard" :style="{'background': `url(${cardResume.logo}) no-repeat center center`, 'background-size': '100%'}">
          <!-- <img id="logoCard" :src="cardResume.logo" alt="logoCard" /> -->
          <input type="text" placeholder="Logo" v-model="cardResume.logo" />
        </div>
        <div class="imgDesc radiusCard" :style="{'background': `url(${cardResume.imgSite2}) no-repeat center center`, 'background-size': '100%'}">
          <!-- <img class="screen" :src="cardResume.imgSite2" alt="screen2" /> -->
          <input
            type="text"
            placeholder="Image 2"
            v-model="cardResume.imgSite2"
          />
        </div>
      </header>
      <main class="radius">
        <section class="resume">
          <h3>Général</h3>
          <div>
            <label for="nom">Nom de la marketplace</label>
            <input
              v-model="cardResume.titre"
              type="text"
              placeholder="Nom de la marketplace"
              id="nom"
            />
          </div>
          <div>
            <label for="description">Description</label>
            <textarea
              cols="20"
              rows="8"
              type="text"
              class="inputSite"
              placeholder="Description de la marketplace"
              v-model="cardResume.resumeMarketPlace"
            />
          </div>
        </section>
        <section class="infos">
          <h3>Chiffres Clés</h3>
          <div class="detailsMarketPlace">
            <label for="anneeCreation">Année de création</label>
            <input
              type="number"
              v-model="cardResume.anneeCreation"
              id="anneeCreation"
            />
          </div>
          <div class="detailsMarketPlace">
            <label for="localisation">Localisation</label>
            <input
              type="text"
              v-model="cardResume.localisation"
              id="localisation"
            />
          </div>
          <div class="detailsMarketPlace">
            <div class="categories">
              <label for="categorie">Catégorie</label>
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
            <label for="url">Site internet</label>
            <input type="text" v-model="cardResume.urlMarketPlace" name="url" />
          </div>
        </section>
        <section class="fonds">
          <h3>Levées de fonds</h3>
          <div>
            <div class="detailsMarketPlace">
              <label for="annee">Année</label>
              <input type="text" id="annee" />
            </div>
            <div class="detailsMarketPlace">
              <label for="leveeFonds">Montant</label>
              <input
                type="number"
                v-model="cardResume.leveeFonds"
                id="leveeFonds"
              />
            </div>
          </div>
        </section>
      </main>
      <button type="submit" class="radius">Modifier</button>
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
  flex-wrap: wrap;
  padding: 0 15vw;
}
form button {
  width: 10%;
  padding: 0.5%;
  align-self: flex-end;
  margin-top: 2%;
}
/* HEADER =================================================== */
header {
  height: 30vh;
  width: 100%;
  margin-top: 5vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
header div {
  padding: 1%;
  width: 35%;
  height: 100%;
  box-shadow: var(--boxShadow);
  text-align: center;
  position: relative;
}
header div:first-child, header div:last-child {
  width: 30%;
  height: 80%;
}
/* MAIN ===================================================== */
main {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 2%;
}
main section {
  margin-top: 5vh;
  width: 30%;
}
h3 {
  margin-bottom: 5%;
  font-size: 1.5rem;
}
label {
  width: 100%;
  margin: 0 0 1% 2%;
  font-size: 0.75rem;
  color: rgb(78, 78, 78);
}
input {
  padding: 1%;
}
/* ::::::::::::::::::::::::::::::  */
.resume {
  /* width: 30%; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.resume div {
  display: block;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 3%;
}
.resume textarea {
  padding: 1%;
  resize: none;
}
/* ::::::::::::::::::::::::::::::: */
.infos {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  /* width: 30%; */
}
.infos h3 {
  width: 100%;
  text-align: center;
}
select {
  padding: 1%;
}
.detailsMarketPlace {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 3%;
}
.categories {
  display: flex;
  align-items: center;
}
.categories img {
  width: 5%;
}
/* :::::::::::::::::::::::::::::::: */
/* .fonds {
  width: 30%;
} */
.fonds h3 {
  width: 100%;
  text-align: end;
}
.fonds div {
  display: flex;
  justify-content: flex-end;
}
.fonds div div:first-child {
  margin-right: 2%;
  width: 40%;
}

@media screen and (max-width: 1260px) {
  form {
    padding: 0 5vw;
  }
  h3 {
    text-align: center;
  }
  main {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  main section {
    width: 70%;
  }
}
</style>
