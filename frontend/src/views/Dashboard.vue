<template>
  <div class="home">
    <section class="hero" id="modal-cont">
      <div class="hero-body">
        <div class="container">
          <div class="auth-user-container" v-if="$auth.isAuthenticated">
            <h3 class="is-size-2 welcome has-text-weight-bold is-family-code">
              {{ $auth.user.name }}
            </h3>
            <h4 class="is-size-5 has-text-weight-light is-family-sans-serif">
              {{ $auth.user.email }}
            </h4>
            <br /><br />
            <div class="columns">
              <div class="column is-half is-offset-one-quarter">
                <article class="message is-link">
                  <div class="message-header">
                    <p>Statistics</p>
                  </div>
                  <div class="message-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    <strong>Pellentesque risus mi</strong>, tempus quis placerat
                    ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet
                    fringilla. Nullam gravida purus diam, et dictum
                    <a>felis venenatis</a> efficitur. Aenean ac
                    <em>eleifend lacus</em>, in mollis lectus. Donec sodales,
                    arcu et sollicitudin porttitor, tortor urna tempor ligula,
                    id porttitor mi magna a neque. Donec dui urna, vehicula et
                    sem eget, facilisis sodales sem.
                  </div>
                </article>
                <QRWidget />
                <button @click="" class="button is-danger is-light is-medium">
                  Report Absence
                </button>
                <Profile />
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
  methods: {},
};
</script>
<style lang="scss" scoped>
button {
  margin: 2%;
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
