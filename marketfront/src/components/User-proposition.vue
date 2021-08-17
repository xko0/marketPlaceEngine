<template>
  <div>
    <div id="userproposition">
      <CrudCard submitBtn="Soumettre" @on-validation="postProposition" />
    </div>
  </div>
</template>

<script>
import CrudCard from "./layout/CrudCard.vue";
import axios from "axios";
import { mapState } from "vuex";

export default {
  components: {
    CrudCard,
  },
  data() {
    return {
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
      verifyDuplicate: [],
    };
  },
  computed: {
    ...mapState("card", ["cardsArray"]),
  },
  methods: {
    postProposition(payload) {
      this.cardResume = payload.card;
      this.cardResume.leveeFonds = payload.cardLeveeFonds.slice(0);

      axios
        .post(`${process.env.VUE_APP_HTTP_REQUEST}/proposition`, {
          ...this.cardResume,
        })
        .then(() => {
          this.$store.state.popup.message =
            "Bien reçu, nous examinons votre demande !";
          this.$store.dispatch("popup/popUpMsgGreen");
          this.$router.push("/");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
#userproposition {
  width: 100%;
  height: 94vh;
  padding: auto;
  padding-top: 15vh;
}

@media screen and (max-width: 769px) {
  #userproposition {
    padding-top: 0;
  }
}
</style>