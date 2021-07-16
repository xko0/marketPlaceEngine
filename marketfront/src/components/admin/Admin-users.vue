<template>
  <div>
    <AdminBar />
    <form class="inscription" @submit.prevent="signUp">
      <div>
        <input
          class="radius"
          type="email"
          placeholder="Email"
          v-model="userForm.email"
        />
        <input
          class="radius"
          type="password"
          placeholder="Mot de passe"
          v-model="userForm.password"
        />
      </div>
      <button class="radius">Créer</button>
    </form>
    
  </div>
</template>

<script>
import AdminBar from "../layout/adminBar.vue";
import axios from 'axios'

export default {
  components: {
    AdminBar,
  },
  data() {
    return {
      userForm: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signUp() {
      axios
        .post("http://localhost:3001/api/user/signup", { ...this.userForm })
        .then(() => {
          console.log("creation ok");
          this.userForm = {...""}
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.inscription {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inscription div {
  display: flex;
  width: 50%;
}
.inscription input {
  font-size: 1rem;
  padding-left: 30px;
  width: 50%;
  border: solid 1px var(--bluePrimary);
  background-color: white;
  height: 8vh;
}
.inscription button {
  height: 6vh;
  width: 15vh;
  margin-left: 5vh;
  border-radius: 30px;
}
</style>