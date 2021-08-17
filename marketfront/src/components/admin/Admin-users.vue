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
    <div class="users__body">
      <ul>
        <li v-for="(user, userIndex) in usersArray" :key="userIndex">
          <p>{{ user.email }}</p>
          <img
            src="../../assets/trash.png"
            alt=""
            @click="deleteUser(user._id)"
          />
        </li>
      </ul>
      <p></p>
    </div>
  </div>
</template>

<script>
import AdminBar from "../layout/adminBar.vue";
import axios from "axios";

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
      usersArray: [],
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    signUp() {
      axios
        .post(`${process.env.VUE_APP_HTTP_REQUEST}/user/signup`, { ...this.userForm })
        .then(() => {
          console.log("creation ok");
          this.userForm = { ..."" };
          this.getUsers();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getUsers() {
      axios
        .get(`${process.env.VUE_APP_HTTP_REQUEST}/user`)
        .then((res) => {
          this.usersArray = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteUser(idUser) {
      axios
        .delete(`${process.env.VUE_APP_HTTP_REQUEST}/user/${idUser}`)
        .then(() => this.getUsers())
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
.users__body ul {
  margin: 3% 0 4% 0;
  position: relative;
}
.users__body ul li:nth-child(odd),
.users__body ul li:nth-child(odd) input {
  background-color: whitesmoke;
}
.users__body ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6vh;
  padding: 0 25%;
}
img {
  cursor: pointer;
  width: 40px;
}
</style>