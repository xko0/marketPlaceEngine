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
    postCard(payload) {
      this.cardResume = payload.card;
      this.cardResume.leveeFonds = payload.cardLeveeFonds.slice(0);

      axios
        .post(`${process.env.HTTP_REQUEST}/card`, { ...this.cardResume })
        .then(() => {
          this.$store.state.popup.message = "Marketplace créée avec succés";
          this.$store.dispatch("popup/popUpMsgGreen");
          this.$router.push("/adminhome");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

