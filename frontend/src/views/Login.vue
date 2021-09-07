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
</style>
