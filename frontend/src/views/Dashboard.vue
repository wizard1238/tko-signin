<template>
  <div class="home">
    <section class="hero" id="modal-cont">
      <div class="hero-body">
        <div class="container">
          <div class="auth-user-container">
            <span
              v-if="$store.state.dbUser.admin === true"
              class="tag is-danger is-light"
              >Admin</span
            >
            <h3 class="is-size-2 welcome has-text-weight-bold is-family-code">
              {{
                $store.state.dbUser.firstName +
                  " " +
                  $store.state.dbUser.lastName
              }}
            </h3>

            <h4 class="is-size-5 has-text-weight-light is-family-sans-serif">
              {{ $store.state.dbUser.email }}
            </h4>
            <br /><br />
            <div class="columns">
              <div class="column is-half is-offset-one-quarter">
                <article class="message is-link">
                  <div class="message-header">
                    <p>Details</p>
                  </div>
                  <div class="message-body">
                    <div class="columns is-vcentered">
                      <div class="column">
                        <h3
                          class="is-size-6 has-text-left has-text-weight-bold"
                        >
                          Department:
                          <span class="has-text-weight-normal">{{
                            this.$store.state.dbUser.department.capitalize()
                          }}</span>
                        </h3>
                        <br />
                        <h3
                          class="is-size-6 has-text-left has-text-weight-bold"
                        >
                          Grade:
                          <span class="has-text-weight-normal">{{
                            this.$store.state.dbUser.grade
                          }}</span>
                        </h3>
                      </div>
                      <div class="column">
                        <div class="columns is-vcentered">
                          <div class="column is-5">
                            <h3
                              class="is-size-4 has-text-left has-text-weight-bold"
                              style="display: inline-block"
                            >
                              Present:
                            </h3>
                          </div>
                          <div class="column is-3">
                            <button class="button is-link">
                              {{ this.$store.state.dbUser.present }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
                <QRWidget />
                <!-- <button @click="" class="button is-danger is-light is-medium">
                  Report Absence
                </button> -->
                <Profile />

                <article
                  class="message is-dark admin-panel"
                  v-if="$store.state.dbUser.admin === true"
                >
                  <div class="message-body">
                    <h3
                      class="is-size-5 has-text-left has-text-weight-bold is-family-code"
                    >
                      Admin Actions
                    </h3>
                    <hr style="background-color: #BEBBBB" />
                    <br />
                    <router-link to="/scan" class="button is-danger "
                      >Display QR Scanner</router-link
                    >
                    <br /><br />
                    <router-link to="/studentdata" class="button is-warning "
                      >Student Data</router-link
                    >
                    <!-- <button @click="test">test</button> -->
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import QRWidget from "../components/DisplayQR";
import ProfileWidget from "../components/Profile";

export default {
  name: "Dashboard",
  components: {
    QRWidget: QRWidget,
    Profile: ProfileWidget,
  },
  mounted: function() {
    this.$store.dispatch("retrieveNewData");
  },
  methods: {
    test() {
      console.log(this.$store.state.dbUser);
    },
  },
};
</script>
<style lang="scss" scoped>
button {
  margin: 2%;
}

.admin-panel {
  margin-top: 4%;
  text-align: left !important;
}

.regenerate-button {
  margin-bottom: 5px;
}

.img-borderify {
  border-radius: 5px;
  border: 7px solid rgb(65, 109, 103);
  margin-bottom: 3%;
}

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
</style>
