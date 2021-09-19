<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <span class="tag is-danger is-hidden" id="invalid-pass">{{
              errormsg
            }}</span>
            <form
              id="signup-form"
              name="signup_form"
              action=""
              class="box"
              @submit.prevent="signup"
            >
              <div class="field">
                <label for="" class="label">First Name</label>
                <div class="control has-icons-left">
                  <input
                    type="text"
                    placeholder="e.g. Bob"
                    class="input"
                    name="firstname"
                    v-model="first"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Last Name</label>
                <div class="control has-icons-left">
                  <input
                    type="text"
                    placeholder="e.g. Smith"
                    class="input"
                    name="lastname"
                    v-model="last"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
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
                <label for="" class="label">Repeat Password</label>
                <div class="control has-icons-left">
                  <input
                    type="password"
                    placeholder="*******"
                    class="input"
                    name="password_2"
                    v-model="pass2"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>

              <div class="field">
                <button id="signup-b" type="submit" class="button is-success">
                  Signup
                </button>
              </div>
            </form>
            <div class="box columns m-1 is-vcentered is-centered">
              <a
                id="google-auth-btn-id"
                class="button is-info is-light google-auth-btn"
                v-bind:href="apiUrl + '/auth/google'"
                >Sign up with Google</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import router from "../router/index";

export default {
  name: "Signup",
  data() {
    return {
      first: "",
      last: "",
      email: "",
      pass: "",
      pass2: "",
      errormsg: "Invalid Parameters",
      apiUrl: process.env.VUE_APP_API_URL,
    };
  },
  methods: {
    async signup() {
      document.getElementById("signup-b").classList.add("is-loading");
      if (this.pass.value !== this.pass2.value) {
        alert("Passwords must match.");
        return;
      }
      this.$store
        .dispatch("signUpWithEmailPass", {
          options: {
            first: this.first,
            last: this.last,
            email: this.email,
            password: this.pass,
          },
        })
        .then(() => {
          setTimeout(function() {
            router.push({ name: "Dashboard" });
          }, 500);
        })
        .catch((e) => {
          this.errormsg = e[0]["msg"];
          document.getElementById("signup-b").classList.remove("is-loading");
          document.getElementById("invalid-pass").classList.remove("is-hidden");
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
