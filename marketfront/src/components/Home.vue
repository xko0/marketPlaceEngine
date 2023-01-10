<template>
  <div>
    <main class="home">
      <h1 id="title">Search Marketplace</h1>
      <h2 id="littleTitle">Trouvez votre marketplace en un clic</h2>
    </main>
    <div class="searchBar">
      <Search />
      <article class="contentFormulaire">
        <div class="formulaire radiusCard">
          <h1 class="titleForm">Etre au courant des nouvelles MarketPlace</h1>
          <input
            class="inputForm radius"
            placeholder="votre email pour une Newletter"
            type="email"
            v-model="email"
          />
          <button type="submit" class="btnForm radius" @click="sendEmail">
            Envoyer
          </button>
          <button type="submit" class="btnForm radius" @click="searchMarket">
            search
          </button>
        </div>
      </article>
    </div>
    <aside>
      <router-link to="/proposition">
        <button class="radius btnReferencement">
          Ajoutez votre marketplace
        </button>
      </router-link>
    </aside>
  </div>
</template>

<script>
import Search from "./layout/Search2.vue";
import axios from "axios";

export default {
  components: {
    Search,
  },
  data() {
    return {
      email: "",
    };
  },
  methods: {
    sendEmail() {
      const marketPlaceList = []
      const findMarketPlaceList = 
        this.$store.state.card.cardsArray.forEach(card =>
          marketPlaceList.push([card.titre, card.urlMarketPlace])
        )
      findMarketPlaceList

      axios
        .post(`${process.env.VUE_APP_HTTP_REQUEST}/sendemail?email=${this.email}&payload=${marketPlaceList}`)
        .then(() => {
          this.$store.state.popup.message = "Adresse mail bien envoyée";
          this.$store.dispatch("popup/popUpMsgGreen");
        })
        .catch(() => {
          this.$store.state.popup.message = "Adresse mail non envoyée";
          this.$store.dispatch("popup/popUpMsgRed");
        });
    },
    searchMarket() {
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
.home {
  height: 40vh;
  background: var(--bluePrimary);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
.searchBar {
  width: 100%;
  position: absolute;
  top: 100%;
  transform: translateY(-58vh);
}
/* bouton aside */
.btnReferencement {
  position: fixed;
  top: 6vh;
  right: 1vh;
}
.btnReferencement:hover {
  cursor: pointer;
  transform: scale(1.02);
  background-color: rgb(231, 235, 11);
}
.btnReferencement:focus {
  box-shadow: 0 0 0 4px whitesmoke;
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
  width: 30%;
}
.titleForm {
  font-size: 2rem;
  color: white;
  letter-spacing: 0.1rem;
  line-height: 1.6;
}
@media screen and (max-width: 998px) {
  /* title */
  .home {
    height: 40vh;
  }
  .home h1 {
    font-size: 3rem;
  }
  .home h2 {
    font-size: 1rem;
  }
  /* bouton aside */
  .btnReferencement {
    padding: 0 3%;
    height: 5vh;
    position: absolute;
    top: 1vh;
    left: 1vh;
  }
  /* formulaire */
  .contentFormulaire {
    margin: 0;
    padding: 0;
  }
  .formulaire {
    width: 100%;
    height: 40vh;
    border-radius: 0;
    padding: 15% 0 20% 0;
  }
  .inputForm {
    width: 80%;
    padding: 10px 0 10px 15px;
  }
  .btnForm {
    width: 50%;
  }
  .titleForm {
    font-size: 1rem;
    letter-spacing: 0rem;
  }
}
@media screen and (max-height: 650px) {
  .home {
    height: 40vh;
  }
  .home h1 {
    font-size: 3rem;
  }
  .home h2 {
    font-size: 1rem;
  }
  /* bouton aside */
  .btnReferencement {
    padding: 0 3%;
    height: 5vh;
    position: absolute;
    top: 1vh;
    left: 1vh;
  }
  /* formulaire */
  .contentFormulaire {
    margin: 0;
    padding: 0;
  }
  .formulaire {
    width: 100%;
    height: 40vh;
    border-radius: 0;
    padding: 15% 0 20% 0;
  }
  .inputForm {
    width: 80%;
    padding: 10px 0 10px 15px;
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
