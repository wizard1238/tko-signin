<template>
  <div class="home">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-mobile is-centered is-vcentered">
            <div class="column">
              <img src="https://i.imgur.com/PuOdxL5.png" alt="" />
            </div>
            <div class="column">
              <span class="title">TKO Attendance Log</span><br /><br />
              <span class="subtitle" v-if="!$auth.isAuthenticated">
                <a @click="login" class="button is-light">Sign in now</a>
                to view stats.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "home",
  methods: {
    // Log the user in
    login() {
      this.$auth.checkSession();
    },
  },
};
</script>
<style lang="scss" scoped>
.hero {
  text-align: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 400px;
}
.hero-body .title {
  padding: 40px 0 20px 0;
  font-size: 60px;
}
.subtitle {
  font-size: 30px;
  margin-top: 5% !important;
}
.button-block {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  position: absolute;
  bottom: -150px;
  .button {
    margin-right: 50px;
    padding-left: 50px;
    padding-right: 50px;
  }
  .welcome {
    width: 400px;
    padding: 10px;
    margin-left: auto;
    margin-right: auto;
  }
}
.is-xl {
  font-size: 1.7rem;
}
</style>
