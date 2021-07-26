<template>
  <div>
    <AdminBar v-if="isConnected" />
    <Modal ref="modalName" />
    <form @submit.prevent="onValidation">
      <header v-if="isConnected">
        <div
          :style="{
            backgroundImage: `url(${cardResume.imgSite1})`,
          }"
        >
          <input
            type="text"
            placeholder="Image 1"
            v-model="cardResume.imgSite1"
          />
        </div>
        <div
          class="headerImg"
          :style="{
            backgroundImage: `url(${cardResume.logo})`,
          }"
        >
          <input type="text" placeholder="Logo" v-model="cardResume.logo" />
        </div>
        <div
          :style="{
            backgroundImage: `url(${cardResume.imgSite2})`,
          }"
        >
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
              required
              pattern="^[\w\s'\-()éèçà:,.]+$"
              v-model="cardResume.titre"
              type="text"
              id="nom"
            />
          </div>
          <div>
            <label for="description">Description</label>
            <textarea
              required
              pattern="/^[\w\s'\-()éèçà:,.]+$/"
              cols="20"
              rows="8"
              type="text"
              class="inputSite"
              v-model="cardResume.resumeMarketPlace"
            />
          </div>
        </section>
        <section class="infos">
          <h3>Chiffres Clés</h3>
          <div class="detailsMarketPlace">
            <label for="url">Site internet</label>
            <input
              required
              pattern="^[\w\s'\/-()éèçà:,.]+$"
              type="text"
              v-model="cardResume.urlMarketPlace"
              name="url"
            />
            <slot name="website" v-bind:cardResume="cardResume"></slot>
          </div>
          <div class="detailsMarketPlace">
            <div class="categories">
              <label for="categorie">Catégorie</label>
              <img
                src="../../assets/plus.png"
                alt=""
                @click="$refs.modalName.openModal()"
                v-if="isConnected"
              />
            </div>
            <select required name="" id="" v-model="cardResume.categorie">
              <option
                v-for="(cat, catIndex) in categoriesArray"
                :key="catIndex"
              >
                {{ cat.nom }}
              </option>
            </select>
          </div>
          <div id="annee-localisation">
            <div class="detailsMarketPlace">
              <img src="../../assets/calendar.png" alt="" />
              <label for="anneeCreation">Année de création</label>
              <input
                type="number"
                v-model="cardResume.anneeCreation"
                id="anneeCreation"
              />
            </div>
            <div class="detailsMarketPlace">
              <img src="../../assets/map.png" alt="" />
              <label for="localisation">Localisation</label>
              <input
                pattern="^[\w\s'\-()éèçà:,.]+$"
                type="text"
                v-model="cardResume.localisation"
                id="localisation"
              />
            </div>
          </div>
        </section>
        <section class="fonds">
          <h3>Levées de fonds</h3>
          <div v-for="(levee, indexLevee) in leveeFondsArray" :key="indexLevee">
            <div class="detailsMarketPlace">
              <label for="annee">Année</label>
              <input required type="number" id="annee" v-model="levee.annee" />
            </div>
            <div class="detailsMarketPlace">
              <label for="leveeFonds">Montant</label>
              <input
                required
                type="number"
                id="leveeFonds"
                v-model="levee.montant"
              />
            </div>
            <img
              id="moins"
              src="../../assets/moins.png"
              alt="supprimer une levée de fonds"
              @click="removeLeveeFonds(indexLevee)"
            />
          </div>
          <img
            id="plus"
            v-if="leveeFondsArray.length < 4"
            src="../../assets/plus.png"
            alt="ajouter une levée de fonds"
            @click="addLeveeFonds"
          />
        </section>

        <slot name="btn"></slot>
        <button type="submit" class="radius">{{ submitBtn }}</button>
      </main>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Modal from "../layout/CategorieModal.vue";
import AdminBar from "../layout/adminBar.vue";

export default {
  components: {
    Modal,
    AdminBar,
  },
  data() {
    return {
      idCardUrl: this.$route.params.id,
      idPropositionUrl: this.$route.params.id,
      cardResume: {
        titre: "",
        anneeCreation: "",
        localisation: "",
        leveeFonds: [],
        categorie: "",
        resumeMarketPlace: "",
        urlMarketPlace: "",
        logo: "",
        imgSite1: "",
        imgSite2: "",
      },
      leveeFondsArray: [
        {
          montant: "",
          annee: "",
        },
      ],
      // regexp: /^[\wéèçù\s,'-\s"\s(\s)]{0,30}$/,
      // regexp: _[a-zA-Z0-9],
    };
  },
  props: {
    submitBtn: {
      type: String,
    },
  },
  mounted() {
    if (this.$route.path.includes("adminupdate")) {
      let cardFind = this.$store.state.card.cardsArray.find(
        (card) => card._id === this.idCardUrl
      );
      this.cardResume = { ...cardFind };
      this.leveeFondsArray = this.cardResume.leveeFonds.slice(0);
    }
    if (this.$route.path.includes("adminproposition")) {
      let propositionFind =
        this.$store.state.proposition.propositionsArray.find(
          (proposition) => proposition._id === this.idPropositionUrl
        );
      this.cardResume = { ...propositionFind };
      this.leveeFondsArray = this.cardResume.leveeFonds;
    }
    this.getCategories;
  },
  computed: {
    ...mapState("categorie", ["categoriesArray"]),
    ...mapState("admin", ["isConnected"]),
    ...mapActions("categorie", ["getCategories"]),
  },
  methods: {
    onValidation() {
      this.$emit("on-validation", {
        card: { ...this.cardResume },
        cardLeveeFonds: this.leveeFondsArray,
      });
    },
    addLeveeFonds() {
      this.leveeFondsArray.push({
        annee: "",
        montant: "",
      });
    },
    removeLeveeFonds(index) {
      this.leveeFondsArray.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.blur {
  filter: blur(2px) contrast(50%) opacity(0.6);
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 5vh;
}
form button {
  width: 15vw;
  padding: 1%;
  align-self: flex-end;
  margin-top: 2%;
  cursor: pointer;
}
/* HEADER =================================================== */
header {
  height: 30vh;
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
header div {
  padding: 1%;
  margin: 2vh;
  width: 40vw;
  height: 100%;
  text-align: center;
  border-radius: 30px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
header div:first-child,
header div:last-child {
  background-size: cover;
  width: 25vw;
  height: 70%;
}
/* MAIN ===================================================== */
main {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 70vw;
  margin: 2% 0;
  background-color: whitesmoke;
  box-shadow: var(--boxShadow);
  padding: 3%;
}
main section {
  width: 30%;
}
h3 {
  margin-bottom: 2vh;
  font-size: 1.6rem;
  width: 100%;
}
label {
  width: 100%;
  margin: 0.5vh 0 0.2vh 0vw;
  font-size: 0.75rem;
  color: rgb(78, 78, 78);
}
main input,
select {
  padding: 1vh;
  margin: 0.8vh 0 1.2vh 0;
  height: 23px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid black;
  background-color: whitesmoke;
  font-size: 1rem;
}
textarea {
  font-size: 1rem;
  margin-top: 1vh;
  padding: 1vh;
  resize: none;
  border: 1px solid black;
  background-color: whitesmoke;
  border-top: none;
  border-right: none;
  border-bottom: none;
  height: 85%;
}
/* ::::::::::::::::::::::::::::::  */
.resume {
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
/* ::::::::::::::::::::::::::::::: */
.infos {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
}
.infos h3 {
  color: transparent;
}
#annee-localisation {
  display: flex;
  width: 100%;
  margin-top: 2vh;
}
#annee-localisation div {
  width: 50%;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}
#annee-localisation div:first-child input {
  width: 50%;
}
#annee-localisation div input {
  width: 90%;
  text-align: center;
}
select {
  padding: 1%;
  height: 30px;
}
.detailsMarketPlace {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 3%;
}
.detailsMarketPlace img {
  width: 5vh;
}
.categories {
  display: flex;
  align-items: center;
}
.categories img {
  width: 7%;
  cursor: pointer;
}
/* :::::::::::::::::::::::::::::::: */
.fonds h3 {
  text-align: center;
}
.fonds div {
  display: flex;
  justify-content: flex-end;
}
#moins {
  width: 7%;
  height: 10%;
  margin-left: 5%;
  cursor: pointer;
}
.fonds div div {
  border-right: 0px solid white;
  width: 30%;
}
.fonds div div:first-child {
  margin-right: 10%;
}
#plus {
  display: block;
  margin: 0.5vh auto 0 auto;
  width: 15%;
  cursor: pointer;
}

@media screen and (max-width: 1200px) {
  main {
    width: 85vw;
  }
  header div:first-child {
    display: none;
  }
  #annee-localisation {
    display: block;
    margin: 2vh 0 1vh 0;
    width: 100%;
  }
  #annee-localisation div {
    margin: 0 auto 2vh auto;
    width: 80%;
  }
}
@media screen and (max-width: 768px) {
  form button {
    width: 40vh;
    margin: 5vh auto 10vh auto;
    padding: 1vh;
  }
  header {
    margin-top: 0;
  }
  header div {
    margin: 0 5%;
    width: 100%;
    border-radius: 0px;
  }
  header div:first-child,
  header div:last-child {
    display: none;
  }
  form {
    padding: 0;
  }
  main {
    padding: 0 1vw;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-radius: 0;
    margin: 0;
  }
  main section {
    width: 70%;
    margin-top: 6vh;
  }
}
</style>