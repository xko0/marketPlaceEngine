<template>
  <div>
    <Modal ref="modalName">
      <template v-slot:header>
        <h1>Catégories</h1>
      </template>

      <template v-slot:body>
      </template>

      <template v-slot:footer>
      </template>
    </Modal>
    <form @submit.prevent="modifyCard(cardResume._id)">
      <header>
        <div class="imgMain">
          <img class="imgUpdate" :src="cardResume.logo" alt="logoCard" />
          <input type="text" placeholder="Logo" v-model="cardResume.logo"/>
        </div>
      </header>
      <div class="containerMain">
        <article class="container1 radius">
          <div class="imgScreen radius">
            <div class="bgScreen radius">
              <img class="screen" src="../../assets/upload.png" alt="screen1" />
              <input type="text" placeholder="Image 1" v-model="cardResume.imgSite1"/>
            </div>
            <div class="bgScreen radius">
              <img class="screen" src="../../assets/upload.png" alt="screen2" />
              <input type="text" placeholder="Image 2" v-model="cardResume.imgSite2"/>
            </div>
            <div class="bgScreen radius">
              <img class="screen" src="../../assets/upload.png" alt="screen3" />
              <input type="text" placeholder="Image 3" v-model="cardResume.imgSite3"/>
            </div>
          </div>
          <div class="sommary radius">
            <h4>Résumer du site :</h4>
            <input v-model="cardResume.titre" type="text"/>
            <textarea type="text" class="inputSite" v-model="cardResume.resumeMarketPlace"/>
          </div>
        </article>
        <aside class="container2 radius">
          <div class="sommaryService">
            <h4>Résumer des services :</h4>
            <div class="detailsMarketPlace">
              <label for="anneeCreation">Année de Création :</label>
              <input type="number" v-model="cardResume.anneeCreation" id="anneeCreation"/>
            </div>
            <div class="detailsMarketPlace">
              <label for="localisation">Localisation :</label>
              <input type="text" v-model="cardResume.localisation" id="localisation"/>
            </div>
            <div class="detailsMarketPlace">
              <label for="leveeFonds">Levée de fonds :</label>
              <input type="number" v-model="cardResume.leveeFonds" id="leveeFonds"/>
            </div>
            <div class="detailsMarketPlace">
              <div class="categories">
                <label for="categorie">Catégorie :</label>
                <img src="../../assets/update.png" alt="" @click="$refs.modalName.openModal()">
              </div>
              <select name="" id="" v-model="cardResume.categorie" @change="afficherCat">
                <option>--Catégories--</option>
                <option v-for="(cat, catIndex) in tabCat" :key="catIndex">{{ cat.nom }}</option>
              </select>
            </div>
            <div class="detailsMarketPlace">
              <label for="url">Site internet :</label>
              <input type="text" v-model="cardResume.urlMarketPlace" name="url"/>
            </div>
          </div>
          <button type="submit" class="radius">Modifier</button>
        </aside>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "../layout/CategorieModal.vue"
export default {
  components: {
    Modal,
  },
  data() {
    return {
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
        imgSite2: ""
      },
      idCard: this.$route.params.id,
      tabCat: []
    };
  },
  mounted () {
    axios.get(`http://localhost:3001/api/card/${this.idCard}`)
      .then(res => {
        this.cardResume = {...res.data}; // on stock l'objet reçu de la bdd dans cardResume
      })
      .catch(error => console.error(error))
    this.afficherCat()
  },
  methods: {
    modifyCard(idCard) {
        axios.put(`http://localhost:3001/api/card/${idCard}`, {...this.cardResume})
        .then(() => {
            this.$router.push('/adminhome'); // redirection vers la page admin-home
        })
        .catch(error => {
          console.error(error);
        })
    },
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
};
</script>

<style>
.blur {
  filter: blur(2px) contrast(50%);
}
.imgMain {
  height: 40vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--radial-gradient);
}
.imgUpdate {
  width: 10%;
  height: 30%;
  background-color: transparent;
}
.containerMain {
  display: flex;
  flex-wrap: wrap;
  background-color: var(--bgColor);
  height: 55vh;
}

.container1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 2%;
  margin-left: 2%;
  width: 60%;
  height: 90%;
  box-shadow: var(--boxShadow);
  background-color: var(--whiteCard);
}
.imgScreen {
  background-color: transparent;
  padding: 1%;
  padding-left: 2%;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}
.bgScreen {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: 20vh;
  background: var(--radial-gradient);
}
.screen {
  display: flex;
  justify-content: center;
  margin: 1%;
  background: transparent;
  width: 60px;
  height: 60px;
}
.sommary {
  width: 100%;
  height: 25vh;
  flex: fill;
  padding: 1%;
  overflow: hidden;
  background-color: var(--whiteCard);
}

.container2 {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 32%;
  height: 90%;
  margin-top: 2%;
  margin-left: 2%;
  padding: 1%;
  box-shadow: var(--boxShadow);
  background-color: var(--whiteCard);
}
.sommaryService {
  margin-top: 3%;
  background-color: transparent;
  height: 30vh;
  width: 90%;
  margin-bottom: 1%;
  overflow: hidden;
}
.detailsMarketPlace {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5% 0;
}
.detailsMarketPlace img {
  width: 25px;
  margin: 0;
}
.categories {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;
}
p {
  background-color: var(--whiteCard);
  padding-top: 2%;
}
button {
  /* margin: auto; */
  width: 40%;
  padding: 2%;
  background-color: var(--button);
  color: black;
  font-size: 1rem;
  border-color: var(--button);
}
h4 {
  background-color: transparent;
  padding-top: 2%;
  padding-bottom: 2%;
  text-align: center;
}
.inputSite {
  width: 100%;
  height: 50%;
  resize: none;
}
.inputService {
  width: 100%;
  height: 75%;
  resize: none;
}
select {
  width: 182px;
}

</style>
