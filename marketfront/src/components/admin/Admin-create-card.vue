<template>
  <div>
    <form @submit.prevent="submitForm">
      <header>
        <div class="imgMain">
          <img class="imgUpdate" src="../../assets/upload.png" alt="logoCard" />
          <input type="text" placeholder="Logo" v-model="cardResume.logo" />
        </div>
      </header>
      <div class="containerMain">
        <article class="container1 radius">
          <div class="imgScreen radius">
            <div class="bgScreen radius">
              <img class="screen" src="../../assets/upload.png" alt="screen1" />
              <input type="text" placeholder="Image 1" v-model="cardResume.imgSite1" />
            </div>
            <div class="bgScreen radius">
              <img class="screen" src="../../assets/upload.png" alt="screen2" />
              <input type="text" placeholder="Image 2" v-model="cardResume.imgSite2" />
            </div>
            <div class="bgScreen radius">
              <img class="screen" src="../../assets/upload.png" alt="screen2" />
              <input type="text" placeholder="Image 3" v-model="cardResume.imgSite3" />
            </div>
          </div>
          <div class="sommary radius">
            <h4>Résumer du site :</h4>
            <input v-model="cardResume.titre" placeholder="Nom de la marketplace" type="text" />
            <textarea type="text" class="inputSite" placeholder="Description de la marketplace" v-model="cardResume.resumeMarketPlace"
            />
          </div>
        </article>
        <aside class="container2 radius">
          <div class="sommaryService">
            <h4>Résumer des services :</h4>
            <input type="text" placeholder="Année de création" v-model="cardResume.anneeCreation" />
            <input type="text" placeholder="Localisation" v-model="cardResume.localisation" />
            <input type="text" placeholder="Levée de fonds" v-model="cardResume.leveeFonds" />
            <input type="text" placeholder="Catégorie" v-model="cardResume.categorie" />
            <input type="text" placeholder="Adresse internet" v-model="cardResume.urlMarketPlace" />
          </div>
          <button type="submit" class="radius">Valider</button>
        </aside>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
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
        imgSite2: "",
        imgSite3: ""
      },
      idCarte: this.$route.params.id
    };
  },
  methods: {
    async submitForm() {
      try {
        await axios.post('http://localhost:3001/api/card', {...this.cardResume});
        this.$router.push('/adminhome'); // redirection vers la page admin-home
      } catch(e) {
        console.log(e);
      }
    }
  },
};
</script>

<style scoped>
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
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
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
  height: 15vh;
}
.bgScreen {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 25vh;
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
  height: 22vh;
  padding: 0 1% 1% 5%;
  flex: fill;
  overflow: hidden;
  background-color: var(--whiteCard);
}

.container2 {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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
  margin-bottom: 1%;
  overflow: hidden;
}
p {
  background-color: var(--whiteCard);
  padding-top: 2%;
}
button {
  margin: auto;
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
  width: 95%;
  height: 50%;
  resize: none;
}
.inputService {
  width: 100%;
  height: 75%;
  resize: none;
}
</style>
