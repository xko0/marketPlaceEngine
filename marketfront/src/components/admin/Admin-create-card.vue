<template>
  <div>
    <CrudCard submitBtn="Créer" @on-validation="postCard" />
  </div>
</template>

<script>
import axios from "axios";
import CrudCard from "../layout/CrudCard.vue";
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
      verifyDuplicate: [],
    };
  },
  computed: {
    ...mapState("card", ["cardsArray"]),
  },
  methods: {
    postCard(payload) {
      this.cardResume = payload.card;

      // Première lettre en majuscule
      let word = this.cardResume.titre;
      this.cardResume.titre =
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

      this.verifyDuplicate = this.cardsArray.filter((card) =>
        card.titre.toUpperCase().includes(this.cardResume.titre.toUpperCase())
      );
      // Pour éviter les doublons de marketplace:
      if (this.verifyDuplicate.length === 0) {
        axios
          .post("http://localhost:3001/api/card", { ...this.cardResume })
          .then(() => {
            this.$store.state.popup.message = "Marketplace créée avec succés";
            this.$store.dispatch("popup/popUpMsgGreen");
            this.$router.push("/adminhome");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.$store.state.popup.message =
          "Une marketplace existe déjà avec ce nom";
        this.$store.dispatch("popup/popUpMsgRed");
      }
    },
  },
};
</script>

