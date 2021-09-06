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
            <div v-if="!$auth.loading">
              <!-- show login when not authenticated -->
              <router-link to="/signup" class="button is-dark"
                >Sign up</router-link
              >
              <a
                v-if="!$auth.isAuthenticated"
                @click="login"
                class="button is-dark"
                id="signin-button"
                ><strong>Sign in</strong></a
              >
              <!-- show logout when authenticated -->
              <a
                v-if="$auth.isAuthenticated"
                @click="logout"
                class="button is-dark"
                id="logout-button"
                ><strong>Log out</strong></a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Nav",
  methods: {
    // Log the user in
    login() {
      document.getElementById("signin-button").classList.add("is-loading");
      this.$auth.checkSession();
    },
    // Log the user out
    logout() {
      document.getElementById("logout-button").classList.add("is-loading");
      this.$auth.logout({
        returnTo: window.location.origin,
      });
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
</style>
