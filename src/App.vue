<script>
import Navbar from "./components/Navbar.vue";
import UpArrow from "./components/UpArrow.vue";
import axios from "axios";

export default {
  components: {
    Navbar,
    UpArrow,
  },
  data() {
    return {
      person: {},
      loading: false,
    };
  },
  computed: {},
  methods: {
    async getUserData() {
      if (localStorage.getItem("token")) {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/auth/get/user/",
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.status !== 401) {
            if (response.data.person.id) {
              this.person = response.data.person;
            }
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("password");
          }
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("password");
        }
      }
    },
  },
  async mounted() {
    await this.getUserData();
    this.loading = true;
  },
};
</script>

<template>
  <!-- <div v-if="!loading" class="loader"></div> -->
  <header>
    <div v-if="loading">
      <Navbar :person="person" />
    </div>
  </header>

  <main>
    <router-view></router-view>
    <UpArrow />
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap");

main {
  font-family: "Montserrat", sans-serif;
}

.loader {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 999;
}

hr {
  color: #0000996e !important;
}

h2 {
  font-size: 1.4rem !important;
  font-weight: 700 !important;
}

h3 {
  font-size: 1.3rem !important;
  font-weight: 600 !important;
}
</style>
