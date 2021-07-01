<template>
  <div class="userDescriptionPage">
      <header>
        <img class="imgMain" :src="this.card.logo" alt="logoCard" />
      </header>
      <div class="containerMain">
        <article class="container1 radius">
          <div class="imgScreen radius">
            <img class="screen" :src="this.card.imgSite1" alt="screen1" />
            <img class="screen" :src="this.card.imgSite2" alt="screen2" />
            <img class="screen" :src="this.card.imgSite3" alt="screen3" />
          </div>
          <div class="sommary radius">
            <h4>Brève description de la marketplace :</h4>
            <p>{{ this.card.titre }}</p>
            <p>
              {{ this.card.resumeMarketPlace }}
            </p>
          </div>
        </article>
        <aside class="container2 radius">
          <div>
            <h4>Chiffre clé :</h4>
            <p>
              - Année de création : {{ this.card.anneeCreation }}
              <br />
              <br />
              - Localisation : {{ this.card.localisation }}
              <br />
              <br />
              - Levée de fond : {{ this.card.leveeFonds }}
              <br />
              <br />
              - Categories : {{ this.card.categorie }}
            </p>
          </div>
          <a :href="this.card.urlMarketPlace" target="_blank">
            <button class="radius">Voir le site !</button>
          </a>
        </aside>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      idCardUrl: this.$route.params.id, // on récupère l'id de la carte via l'url
      card: {}
    }
  },
  mounted () {
    let cardFind = this.$store.state.card.cardsArray.find(card => card._id === this.idCardUrl)
    this.card = {...cardFind}
  },
}
</script>

<style scoped>
.userDescriptionPage {
  background-color: var(--bgColor);
  height: 95vh;
}
.imgMain {
  width: auto;
  height: 40vh;
  margin: auto;
  padding: 0;
}
.containerMain {
  display: flex;
  flex-wrap: wrap;
  background-color: var(--bgColor);
}

.container1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 60%;
  height: 48vh;
  margin: 2%;
  box-shadow: var(--boxShadow);
  background-color: var(--whiteCard);
}
.imgScreen {
  background-color: var(--whiteCard);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.screen {
  width: auto;
  height: 15vh;
  background-color: var(--whiteCard);
  border-radius: 10px;
}
.sommary {
  width: 100%;
  padding: 2%;
}
h4 {
  padding-top: 2%;
  padding-bottom: 2%;
  text-align: center;
}

.container2 {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 32%;
  height: 48vh;
  margin: 2%;
  padding: 1%;
  box-shadow: var(--boxShadow);
  background-color: var(--whiteCard);
}
.container2 a {
  text-align: center;
}
p {
  padding-top: 2%;
}
button {
  margin: auto;
  width: 120%;
  padding: 10%;
  background-color: var(--button);
  color: black;
  font-size: 1rem;
  border-color: var(--button);
}
@media (max-width: 767px) {
  .userDescriptionPage {
    display: flex;
    flex-direction: column;
    height: 125vh;
  }
  .imgMain {
    height: 15vh;
    width: 100%;
  }
  .containerMain {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    height: 80vh;
  }
  .container1 {
    width: 95%;
    height: 50%;
    background-color: transparent;
    box-shadow: none;
    margin: 0;
  }
  .sommary {
    width: 100%;
    padding: 2%;
    background-color: var(--whiteCard);
    box-shadow: var(--boxShadow);
    margin-top: 2%;
  }
  .container2 {
    width: 95%;
    height: 45%;
    margin: 0;
  }
  .imgScreen {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: transparent;
  }
  .screen {
    width: 100%;
    margin-left: 0;
    margin-top: 4%;
    margin-bottom: 2%;
  }
  p {
    padding: 5px;
  }
}
</style>
