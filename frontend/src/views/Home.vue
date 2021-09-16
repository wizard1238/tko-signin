<template>
  <div class="home">
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-desktop is-centered is-vcentered">
            <div class="column">
              <img
                style="max-width: 250px"
                src="https://i.imgur.com/KrUxjBa.png"
                alt=""
              />
            </div>
            <div class="column">
              <span class="title">TKO Attendance Log</span><br /><br />
              <span class="subtitle" v-if="$store.state.dbUser === undefined">
                <router-link to="/login" class="button is-light"
                  >Log in now</router-link
                >

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
  mounted() {
    this.$store.dispatch("getUser")
  }
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
