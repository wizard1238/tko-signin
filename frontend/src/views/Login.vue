<template>
  <section class="hero">
    <!-- <button @click="test">test</button> -->
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <span class="tag is-danger is-hidden" id="invalid-pass"
              >Invalid Credentials</span
            >
            <form
              id="login-form"
              name="login_form"
              action=""
              class="box"
              @submit.prevent="login"
            >
              <div class="field">
                <label for="" class="label">Email</label>
                <div class="control has-icons-left">
                  <input
                    type="email"
                    placeholder="e.g. bobsmith@gmail.com"
                    class="input"
                    name="email"
                    v-model="email"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Password</label>
                <div class="control has-icons-left">
                  <input
                    type="password"
                    placeholder="*******"
                    class="input"
                    name="password"
                    v-model="pass"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>

              <div class="field">
                <button id="login-b" type="submit" class="button is-success">
                  Log In
                </button>
              </div>
            </form>
            <div class="box columns m-1 is-vcentered is-centered">
              <a
                id="google-auth-btn-id"
                class="button is-info is-light google-auth-btn"
                v-bind:href="apiUrl + '/auth/google'"
                >Log in with Google</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import router from "../router/index";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      pass: "",
      apiUrl: process.env.VUE_APP_API_URL,
    };
  },
  methods: {
    async login() {
      document.getElementById("login-b").classList.add("is-loading");

      this.$store
        .dispatch("loginWithEmailPass", {
          options: {
            email: this.email,
            password: this.pass,
          },
        })
        .catch((e) => {
          document.getElementById("login-b").classList.remove("is-loading");
          document.getElementById("invalid-pass").classList.remove("is-hidden");
        })
        .then((resp) => {
          setTimeout(function() {
            router.push({ name: "Dashboard" });
          }, 500);
        });
    },
  },
};
</script>
<style scoped>
#invalid-pass {
  margin-bottom: 4%;
}

.google-auth-btn {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
  background-repeat: no-repeat;
  background-position: 12px 11px;
  padding: 12px 16px 12px 42px;
}
</style>
