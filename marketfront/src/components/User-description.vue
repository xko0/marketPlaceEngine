<template>
  <div>
    <section>
      <header>
        <div
          :style="{
            backgroundImage: `url(${cardResume.imgSite1})`,
          }"
        ></div>
        <div
          class="headerImg"
          :style="{
            backgroundImage: `url(${cardResume.logo})`,
          }"
        ></div>
        <div
          :style="{
            backgroundImage: `url(${cardResume.imgSite2})`,
          }"
        ></div>
      </header>
      <main class="radius">
        <div>
          <section class="resume">
            <h3>Général</h3>
            <div>
              <label for="nom">Nom de la marketplace</label>
              <p>{{ cardResume.titre }}</p>
            </div>
            <div>
              <label for="description">Description</label>
              <p>{{ cardResume.resumeMarketPlace }}</p>
            </div>
          </section>
          <section v-if="leveeFondsArray.length > 0" class="fonds">
            <h3>Levées de fonds</h3>
            <div v-for="(levee, index) in leveeFondsArray" :key="index">
              <div class="detailsMarketPlace">
                <label for="annee">Année</label>
                <p type="text" id="annee">{{ levee.annee }}</p>
              </div>
              <div class="detailsMarketPlace">
                <label for="leveeFonds">Montant</label>
                <p type="number" id="leveeFonds">{{ levee.montant }}</p>
              </div>
            </div>
            <div class="infoList">
            <h3>Informations</h3>
            <div class="detailsMarketPlace">
              <div class="categories">
                <label for="categorie">Catégorie</label>
              </div>
              <p>{{ cardResume.categorie }}</p>
            </div>
            <div id="annee-localisation">
              <div class="detailsMarketPlace">
                <img src="../assets/calendar.png" alt="" />
                <label for="anneeCreation">Année de création</label>
                <p>{{ cardResume.anneeCreation }}</p>
              </div>
              <div class="detailsMarketPlace">
                <img src="../assets/map.png" alt="" />
                <label for="localisation">Localisation</label>
                <p>{{ cardResume.localisation }}</p>
              </div>
            </div>
          </div>
          <a :href="cardResume.urlMarketPlace" target="_blank"
          ><button class="radius-link">Voir le site</button></a
        >
          </section>
        </div>
      </main>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      idCardUrl: this.$route.params.id,
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
    };
  },
  mounted() {
    let cardFind = this.$store.state.card.cardsArray.find(
      (card) => card._id === this.idCardUrl
    );
    this.cardResume = { ...cardFind };
    this.leveeFondsArray = this.cardResume.leveeFonds.slice(0);
  },
};
</script>

<style scoped>
a {
  padding-top: 5%;
  text-decoration: none;
  color: black;
}
a:hover {
  cursor: pointer;
  transform: scale(1.02);
}

section {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 1vh;
}
section button {
  width: 15vh;
  padding: 1%;
  display: block;
  margin: 3% auto 0 auto;
}
/* HEADER =================================================== */
header {
  height: 30vh;
  width: 80%;
  margin-top: 2vh;
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
  flex-direction: column;
  justify-content: space-around;
  width: 70vw;
  margin: 2% 0;
  background-color: whitesmoke;
  box-shadow: var(--boxShadow);
  padding: 2%;
}
main div:first-child {
  display: flex;
  justify-content: space-evenly;
}
main section:first-child {
  width: 35%;
}
main section {
  width: 20%;
}
h3 {
  margin-bottom: 2vh;
  font-size: 1.6rem;
  width: 100%;
}
p {
  font-size: 1.1rem;
}
label {
  width: 100%;
  margin: 0.5vh 0;
  font-size: 0.75rem;
  color: rgb(78, 78, 78);
}
.detailsMarketPlace {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 3%;
}
/* ::::::::::::::::::::::::::::::  */
.resume {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.resume div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 3%;
}
.resume div:nth-child(odd) p {
  text-align: justify;
  width: 90%;
}
/* ::::::::::::::::::::::::::::::: */

.infoList {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 3%;
  padding-top: 30%;
}
.infos {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.infos h3 {
  color: transparent;
}
.infos p {
  font-size: 1.2rem;
}
.infos .detailsMarketPlace {
  width: 100%;
  align-items: center;
  text-align: center;
}
#annee-localisation {
  display: flex;
  width: 100%;
  margin-top: 2vh;
}
#annee-localisation img {
  width: 5vh;
}
/* :::::::::::::::::::::::::::::::: */
.fonds h3 {
  text-align: center;
}
.fonds div {
  display: flex;
  align-items: center;
  width: 100%;
}
.fonds label {
  text-align: center;
}
.fonds p {
  text-align: center;
}

@media screen and (max-width: 1200px) {
  h3 {
    text-align: center;
  }
  .infos h3 {
    display: none;
  }
  header div:first-child {
    display: none;
  }
  #annee-localisation {
    margin: 5vh 0 0 0;
    width: 100%;
  }
  #annee-localisation div {
    margin: 0 auto 2vh auto;
    width: 80%;
  }
}
@media screen and (max-width: 768px) {
  section button {
    width: 20vh;
    margin: 5vh auto;
    padding: 5%;
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
    border-radius: 0;
    padding: 0 1vw;
    margin-bottom: 0;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  main div:first-child {
    flex-direction: column;
    align-items: center;
  }
  main section:first-child {
    width: 80%;
  }
  main section {
    width: 80%;
    margin-top: 6vh;
  }
}
</style>
