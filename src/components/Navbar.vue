<script>
import { telegramLoginTemp } from "vue3-telegram-login";
import axios from "axios";

export default {
  props: {
    person: Object,
  },
  data() {
    return {
      loaded: true,
      is_authenticated: false,
    };
  },

  components: {
    telegramLoginTemp,
  },

  methods: {
    telegramLoadedCallbackFunc() {
      // this.loaded = false
    },

    async createUser(user) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/auth/users/",
          user
        );
        return response.data.id;
      } catch (error) {
        console.error("Error creating user:", error);
        return null; // Возвращаем null в случае ошибки
      }
    },

    async createPerson(user, id) {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/auth/create/person/${id}/`,
          user,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error creating person:", error);
        return null; // Возвращаем null в случае ошибки
      }
    },

    async getToken(user) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/auth/token/login/",
          user
        );
        localStorage.setItem("token", response.data.auth_token);
        return response.data;
      } catch (error) {
        console.error("Error getting token:", error);
        return null; // Возвращаем null в случае ошибки
      }
    },

    async logoutUser() {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/auth/token/logout/",
          {},
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        localStorage.removeItem("token");
        localStorage.removeItem("password");
        location.reload();
      } catch (error) {
        console.error("Error logout:", error);
        return null; // Возвращаем null в случае ошибки
      }
    },

    async checkUserExists(user) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/auth/check/user/exists/${user.username}/`
        );
        return {status: response.data.status, user_id: response.data.user_id};
      } catch (error) {
        console.error("Error checking user existence:", error);
        return false; // Возвращаем false в случае ошибки
      }
    },

    async yourCallbackFunction(data) {

      console.log(data);

      const user = {
        username: `user_${data.id}`,
        password: 'Usr$' + data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        telegram_login: data.username,
        photo_link: data.photo_url,
      };
      const password = await axios.post(
        `http://127.0.0.1:8000/auth/generate/password/`,
        user
      )
      if (password.data.password) {
        user.password = password.data.password
      }
      console.log(password)
      const isExists = await this.checkUserExists(user);
      if (isExists.status) {
        if (!localStorage.getItem("password")){
          localStorage.setItem("password", user.password)
        }
        const response = await axios.post(
          "http://127.0.0.1:8000/auth/token/login/",
          {
            username: user.username,
            password: localStorage.getItem("password"),
          }
        );
        localStorage.setItem("token", response.data.auth_token);
        await this.createPerson(user, isExists.user_id);
        location.reload();
      } else {
        localStorage.setItem("password", user.password);
        const userID = await this.createUser(user);
        await this.getToken(user);
        await this.createPerson(user, userID);
        location.reload();
      }
    },
  },

  mounted() {
    if (this.person.given) {
      this.is_authenticated = true
    } else {
      this.is_authenticated = false
    }
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="/">
        GeekHunter
        <span style="font-size: 10px; vertical-align: top">beta</span>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse row" id="navbarNav">
        <div class="nav-links col-lg-6">
          <ul class="navbar-nav">
            <li class="nav-item"><a class="nav-link" href="/">Вакансии</a></li>
            <li class="nav-item">
              <a class="nav-link" href="/stats">Статистика</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/employer">Работодателю</a>
            </li>
          </ul>
        </div>
        <div v-if="!is_authenticated" class="telegram-auth col-lg-6 py-2">
          <telegramLoginTemp
            mode="callback"
            telegram-login="geekhunter_auth_bot"
            size="medium"
            @callback="yourCallbackFunction"
            @loaded="telegramLoadedCallbackFunc"
          />
        </div>
        <div v-else class="col-lg-6 align-items-center telegram-auth">
          <img
            :src="person.photo_link"
            style="width: 30px; border-radius: 50%; margin: 5px"
          />
          <span class="nav-link" style="cursor: pointer">
            {{ person.given }}
            {{ person.family }}&nbsp;&nbsp;
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x-lg"
            viewBox="0 0 16 16"
            id="logout"
            @click="logoutUser"
          >
            <path
              d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
            />
          </svg>
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
.navbar-brand {
  color: rgb(88 92 249) !important;
  text-decoration: none !important;
  white-space: nowrap !important;
  font-weight: 800 !important;
  font-size: 24px !important;
  font-family: "Montserrat", sans-serif !important;
  /* padding-left: 10px; */
}

.telegram-auth div {
  display: flex;
  justify-content: end !important;
}

.telegram-auth {
  display: flex;
  justify-content: end !important;
}

@media screen and (max-width: 992px) {
  .telegram-auth {
    display: flex;
    justify-content: start !important;
  }
}

.telegram-auth button {
  background-color: rgb(88 92 249) !important;
}

.nav-link {
  font-weight: 600 !important;
  color: #494949 !important;
  font-family: "Montserrat", sans-serif !important;
}

.nav-link:hover {
  color: rgb(88 92 249) !important;
}

.navbar {
  box-shadow: 0 0 10px #00000057;
}

#navbarNav {
  padding-top: 2px;
}

.navbar-toggler {
  border: none !important;
}

.navbar-toggler:focus {
  text-decoration: none;
  outline: 0;
  box-shadow: none !important;
}

#logout {
  cursor: pointer;
}

#logout:hover {
  color: red;
}
</style>