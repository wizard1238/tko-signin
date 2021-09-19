<template>
  <nav class="navbar container" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <strong class="is-size-4">TKO Attendance</strong>
      </a>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        id="nav-click"
        @click="toggleNavbar"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbar-m" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/dashboard" class="navbar-item">Dashboard</router-link>
        <router-link to="/mainsite" class="navbar-item"
          >AMHS Robotics</router-link
        >
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <!-- Check that the SDK client is not currently loading before accessing is methods -->
            <!-- show login when not authenticated -->
            <router-link
              v-if="$store.state.dbUser === undefined"
              to="/signup"
              class="button is-dark"
              >Sign up</router-link
            >
            <router-link
              v-if="$store.state.dbUser === undefined"
              to="/login"
              class="button is-dark"
              >Log in</router-link
            >
            <!-- <a
                v-if="!$auth.isAuthenticated"
                @click="login"
                class="button is-dark"
                id="signin-button"
                ><strong>Sign in</strong></a
              > -->
            <!-- show logout when authenticated -->
            <a
              v-if="$store.state.dbUser !== undefined"
              @click="logout"
              class="button is-dark"
              id="logout-button"
              ><strong>Log out</strong></a
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import router from "../../router/index";
import { store } from "../../store/index";

export default {
  name: "Nav",
  methods: {
    // Log the user in
    // login() {
    //   document.getElementById("signin-button").classList.add("is-loading");
    //   this.$auth.checkSession();
    // },
    // Log the user out
    test() {
      console.log(this.$store.state.dbUser);
    },
    logout() {
      document.getElementById("logout-button").classList.add("is-loading");
      setTimeout(function() {
        store.dispatch("logout").then((response) => {
          router.push({ name: "Home" });
        });
      }, 200);
    },
    toggleNavbar() {
      let obj = document.getElementById("nav-click");
      let nav_menu = document.getElementById("navbar-m");
      if (obj.classList.contains("is-active")) {
        obj.classList.remove("is-active");
        nav_menu.classList.remove("is-active");
      } else {
        obj.classList.add("is-active");
        nav_menu.classList.add("is-active");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#navbar-m {
  margin-left: 3%;
}
nav {
  margin-top: 25px;
  margin-bottom: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #27a9d4;
    }
  }
}

.navbar {
  background: transparent;
  margin-top: 0;
  padding-top: 25px;
}
</style>
