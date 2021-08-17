<template>
  <div>
    <CrudCard submitBtn="Modifier" @on-validation="updateCard" />
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
    };
  },
  computed: {
    ...mapState("admin", ["isConnected"]),
  },
  methods: {
    updateCard(payload) {
      this.cardResume = payload.card;
      this.cardResume.leveeFonds = payload.cardLeveeFonds.slice(0);

      axios
        .put(`${process.env.HTTP_REQUEST}/card/${this.idCardUrl}`, {
          ...this.cardResume,
        })
        .then(() => {
          this.$store.state.popup.message = "Marketplace modifiée avec succés";
          this.$store.dispatch("popup/popUpMsgGreen");
          this.$router.push("/adminhome"); // redirection vers la page admin-home
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
</style>
