<template>
  <div>
    <form @submit.prevent="logIn(form)">
      <section class="radiusCard">
        <div>
          <label for="user" class="label">Email</label>
          <input id="user" type="email" class="input" v-model="form.email" />
        </div>
        <div>
          <label for="pass" class="label">Mot de passe</label>
          <input type="password" class="input" v-model="form.password" />
        </div>
        <div>
          <button class="radius" type="submit">Connexion</button>
        </div>
      </section>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    logIn() {
      axios
        .post(`${process.env.VUE_APP_HTTP_REQUEST}/user/login`, this.form)
        .then((res) => {
          this.$store.commit("admin/IS_CONNECTED", res.data);
        })
        .then(() => {
          this.$router.push("/adminhome");
        })
        .catch((error) => {
          this.$router.push("/");
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
form {
  height: 90vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
form button {
  width: 15vw;
  padding: 3%;
  align-self: center;
  margin-top: 10%;
  cursor: pointer;
}
input {
  padding: 1vh;
  margin-bottom: 1.2vh;
  height: 23px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid black;
  background-color: whitesmoke;
}
label {
  width: 100%;
  margin: 0.5vh 0 0.2vh 0vw;
  font-size: 0.75rem;
  color: rgb(78, 78, 78);
}
section {
  box-shadow: var(--boxShadow);
  padding: 4vh;
  background-color: whitesmoke;
}
section div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 15px;
}
</style>
