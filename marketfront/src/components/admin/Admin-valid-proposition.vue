<template>
  <div>
    <CrudCard submitBtn="Valider la marketplace" @on-validation="validation">
      <template v-slot:website="slotProps">
        <a
          :href="slotProps.cardResume.urlMarketPlace"
          target="_blank"
          style="color: black; text-align: end; margin-bottom: 2vh"
        >
          Voir le site
        </a>
      </template>
      <template v-slot:btn>
        <button
          @click.prevent="deleteProposition"
          class="radius"
          style="background-color: red; color: white"
        >
          Supprimer la proposition
        </button>
      </template>
    </CrudCard>
  </div>
</template>

<script>
import CrudCard from "../layout/CrudCard.vue";
import axios from "axios";

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
      idPropositionUrl: this.$route.params.id,
    };
  },
  methods: {
    validation(payload) {
      this.cardResume = payload.card;
      this.cardResume.leveeFonds = payload.cardLeveeFonds.slice(0);
      this.postCard();
      this.$store.dispatch(
        "proposition/deleteProposition",
        this.idPropositionUrl
      );
    },
    postCard() {
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
    deleteProposition() {
      this.$store.dispatch(
        "proposition/deleteProposition",
        this.idPropositionUrl
      );
      this.$store.state.popup.message = "Proposition supprimée";
      this.$store.dispatch("popup/popUpMsgRed");
      this.$router.push("/adminproposition");
    },
  },
};
</script>

<style scoped>
</style>