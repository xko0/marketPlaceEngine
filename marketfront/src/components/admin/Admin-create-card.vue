<template>
  <div>
    <CrudCard submitBtn="Créer" @on-validation="postCard" />
  </div>
</template>

<script>
import axios from 'axios'
import CrudCard from "../layout/CrudCard.vue"

export default {
  components: {
    CrudCard
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
        imgSite2: ""
      }
    }
  },
  methods: {
    postCard(payload) {
      this.cardResume = payload.card
      axios.post('http://localhost:3001/api/card', {...this.cardResume})
      .then(() => {
        this.$router.push('/adminhome') // redirection vers la page admin-home
      })
      .catch((error) => {
        console.error(error);
      })
    }
  }
};
</script>

