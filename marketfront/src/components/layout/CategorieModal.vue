<template>
  <transition name="fade">
    <div class="modal radiusCard" v-if="show">
      <div class="modal__dialog">

        <div class="modal__body">
          <div>
            <input type="text" v-model="categorieResume.nom">
            <button type="submit" @click="ajoutCat">Ajouter</button>
          </div>
          <ul>
              <li>
                    <p></p>
                    <img src="../../assets/trash.png" alt="">
              </li>
          </ul>
        </div>

        <div class="modal__footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios"

export default {
  name: "Modal",
  data() {
    return {
      show: false,
      categorieResume: {
        nom: "",
      },
    };
  },
  methods: {
    closeModal() {
      this.show = false;
      document.querySelector("body").classList.remove("overflow-hidden");
      document.querySelector("form").classList.remove("blur");
    },
    openModal() {
      this.show = true;
      document.querySelector("body").classList.add("overflow-hidden");
      document.querySelector("form").classList.add("blur");
    },
    async ajoutCat() {
      try {
        await axios.post('http://localhost:3001/api/categorie', {...this.categorieResume});
        console.log("categorie créée");
        this.categorieResume.nom = "";
      } catch(e) {
        console.log(e);
      }
    }
  }
};
</script>


<style scoped>
.modal {
    background-color: #fff;
    width: 70%;
    padding: 3%;
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    top: 30%;
    left: 15%; 
    z-index: 9;
}

.modal__body ul li {
    display: flex;
    justify-content: space-between;
}
</style>