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
        leveeFonds: "",
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
      this.verifyDuplicate = this.cardsArray.filter((card) =>
        card.titre.toUpperCase().includes(this.cardResume.titre.toUpperCase())
      );
      if (this.verifyDuplicate.length === 0) {
        axios
          .post("http://localhost:3001/api/card", { ...this.cardResume })
          .then(() => {
            this.$router.push("/adminhome"); // redirection vers la page admin-home
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.log('carte existante');
      }
    },
  },
};
</script>

