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
      regexp: /^[\wéèçù\s,'-\s"\s(\s)]{0,30}$/,
    };
  },
  computed: {
    ...mapState("card", ["cardsArray"]),
  },
  methods: {
    postProposition(payload) {
      this.checkInputs();
      this.cardResume = payload.card;
      this.cardResume.leveeFonds = payload.cardLeveeFonds.slice(0);

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
          .post("http://localhost:3001/api/proposition", { ...this.cardResume })
          .then(() => {
            this.$store.state.popup.message =
              "Bien reçu, nous examinons votre demande !";
            this.$store.dispatch("popup/popUpMsgGreen");
            this.$router.push("/");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.$store.state.popup.message = "Une marketplace porte déjà ce nom";
        this.$store.dispatch("popup/popUpMsgRed");
      }
    },
    checkInputs() {
      let inputs = document.querySelectorAll("input, textarea");
      inputs.forEach((input) => {
        if (!input.value.match(this.regexp)) {
          input.innerHTML = "";
          this.$store.state.popup.message = "@ < > / \\ _ | & [ ] ne sont pas acceptés";
          this.$store.dispatch("popup/popUpMsgRed");
        }
      });
    },
  },
};
</script>

<style scoped>
#userproposition {
  width: 100%;
  height: 100vh;
  padding-top: 10%;
}

@media screen and (max-width: 769px) {
  #userproposition {
    padding-top: 0;
  }
}
</style>