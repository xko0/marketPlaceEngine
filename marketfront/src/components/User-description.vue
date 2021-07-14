<template>
  <div>
    <form>
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
        <section class="infos">
          <h3>Chiffres Clés</h3>
          <div class="detailsMarketPlace">
            <label for="anneeCreation">Année de création</label>
            <p>{{ cardResume.anneeCreation }}</p>
          </div>
          <div class="detailsMarketPlace">
            <label for="localisation">Localisation</label>
            <p>{{ cardResume.localisation }}</p>
          </div>
          <div class="detailsMarketPlace">
            <div class="categories">
              <label for="categorie">Catégorie</label>
            </div>
            <p>{{ cardResume.categorie }}</p>
          </div>
          <div class="detailsMarketPlace">
            <label for="url">Site internet</label>
            <p type="text" name="url">{{ cardResume.urlMarketPlace }}</p>
          </div>
        </section>
        <section class="fonds">
          <h3>Levées de fonds</h3>
          <div>
            <div class="detailsMarketPlace">
              <label for="annee">Année</label>
              <p type="text" id="annee"></p>
            </div>
            <div class="detailsMarketPlace">
              <label for="leveeFonds">Montant</label>
              <p type="number" id="leveeFonds">{{ cardResume.leveeFonds }}</p>
            </div>
          </div>
        </section>
      <button class="radius">
        <a :href="cardResume.urlMarketPlace" target="_blank">Voir le site</a>
      </button>
      </main>
    </form>
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
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 15vh;
}
form button {
  width: 15vw;
  padding: 1%;
  align-self: flex-end;
  margin-top: 5%;
}
/* HEADER =================================================== */
header {
  height: 30vh;
  width: 80%;
  margin-top: 5vh;
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
  padding: 5%;
}
main section {
  width: 30%;
}
h3 {
  margin-bottom: 2vh;
  font-size: 1.5rem;
}
label {
  width: 100%;
  margin: 0.5vh 0 0.2vh 0vw;
  font-size: 0.75rem;
  color: rgb(78, 78, 78);
}
input,
select {
  padding: 1vh;
  margin-bottom: 1.2vh;
  height: 23px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid black;
}
textarea {
  margin-top: 1vh;
  padding: 1vh;
  resize: none;
  border: 1px solid black;
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
.fonds h3 {
  width: 100%;
  text-align: end;
}
.fonds div {
  display: flex;
  justify-content: flex-end;
}
.fonds div div {
  border-right: 0px solid white;
  width: 40%;
}
.fonds div div:first-child {
  margin-right: 10%;
}
.fonds img {
  margin: 0.5vh 0 2vh 85%;
  width: 15%;
}

@media screen and (max-width: 1200px) {
  header div:first-child {
    display: none;
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
  }
  main section {
    width: 70%;
    margin-top: 6vh;
  }
}
</style>
