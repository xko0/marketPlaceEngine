<template>
  <div class="searchPage">
    <div class="search">
      <div v-if="isAdmin" id="btn" class="radius">
        <router-link to="/admincreatecard">
          <img
            src="../../assets/plus.png"
            class="icons plus"
            alt="bouton plus"
          />
        </router-link>
        <img
          src="../../assets/moins.png"
          class="icons moins"
          alt="bouton moins"
          @click="displayDeleteBtn = !displayDeleteBtn"
        />
      </div>
      <input
        class="radius searchWord"
        type="search"
        name=""
        placeholder="ex: Consultant marketing, UX designer, ReactJS..."
        v-model="searchWord"
      />
      <button type="submit" class="btn2 btnForm radius" @click="searchMarket">
        search
      </button>
    </div>
    <div class="search-list">
      <p>Platforms recherchées: </p>
      <div
        class="platform-card"
        v-for="(card, cardIndex) in cardsArray"
        :key="cardIndex"
        :style="{
          backgroundImage: `url(${card.logo})`
        }"
      >
      </div>
    </div>
    <!-- <div class="search-btn-div">
      <button type="submit" class="btn2 btnForm radius" @click="searchMarket">
        search
      </button>
    </div> -->
    <p class="ifNoResult" v-show="ifNoResult">
      Aucune marketplace ne correspond à vos critères de recherche.
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from 'axios';

export default {
  data() {
    return {
      ifSearch: "cards",
      searchWordsArray: [],
      searchWord: "",
      ifNoResult: false,
      // regexp: /^[0-9A-Za-z]{0,30}$/ équivaut à:
      regexp: /^\w{0,30}$/,
      displayDeleteBtn: true,
      isAdmin: false,
      selectedPlatformArray: [],
      selectedPlatform: "",
      cardResume: {
        titre: "",
        logo: "",
        urlMarketPlace: "",
      },
    };
  },
  mounted() {
  },
  computed: {
    ...mapState("card", ["cardsArray"]),
    ...mapActions("card", ["getCards"]),
  },
  methods: {
    searchMarket() {
      var link = `https://www.malt.fr/s?q=`
      console.log(encodeURIComponent(link+"ruby+on+rails"))
      
      console.log("test")
      axios.get(`${process.env.VUE_APP_HTTP_REQUEST}/crawler`)
      .then((response) => {
          console.log("progressing")
          console.log(response)
        })
      .catch((error) => {
        console.error(error)
      })
    },
  },
};
</script>

<style scoped>
.searchPage {
  padding-bottom: 5%;
}
.search {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 8vh;
  /* margin-bottom: 3%; */
}
.search-btn-div {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 8vh;
  margin-bottom: 3%;
  margin-top: 2vh;
}
.search-list{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  height: 8vh;
  margin-top: 1vh;
}
.platform-card {
  margin: 0 2% 3% 2%;
  padding: 2%;
  width: 150px;
  height: 100px;
  /* box-shadow: var(--boxShadow); */
  overflow: visible;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  background-origin: border-box;
}
.search div:first-child {
  margin-right: 5vh;
}
#btn {
  background-color: var(--button);
  box-shadow: var(--boxShadow);
  padding: 0.5vh;
  position: fixed;
  left: 2vw;
  top: 23.5vh;
  transform: translateY(-50%);
  display: flex;
  z-index: 15;
}
.btn2 {
  min-width: 30vh;
}
#btn img {
  width: 7vh;
  height: auto;
  cursor: pointer;
}
.searchWord {
  font-size: 1rem;
  padding-left: 30px;
  width: 40%;
  border: solid 1px var(--bluePrimary);
  background-color: white;
}
.searchCategory {
  font-size: 1rem;
  width: 20%;
  padding: 0 30px;
  background-color: white;
  border: solid 1px var(--bluePrimary);
}
.ifNoResult {
  width: 100%;
  text-align: center;
  margin-bottom: 10vh;
}
@media screen and (max-width: 769px) {
#btn {
  background-color: var(--button);
  box-shadow: var(--boxShadow);
  padding: 0.5vh;
  position: fixed;
  left: 2vw;
  top: 23.5vh;
  transform: translateY(-50%);
  display: flex;
  z-index: 15;
}
#btn img {
  width: 7vh;
  height: auto;
  cursor: pointer;
}
  .search {
    margin-bottom: 5vh;
  }
  .searchWord {
    width: 60%;
    padding-left: 15px;
  }
  .searchCategory {
    width: 40%;
    padding-left: 15px;
    text-overflow: ellipsis;
  }
}
</style>