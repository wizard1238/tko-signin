<template>
  <fragment>
    <button @click="openQRModal" class="button is-link is-light is-medium">
      Display QR
    </button>
    <div class="modal" id="qr-modal">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">QR Code - {{ $auth.user.name }}</p>
            <button class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </header>
          <br />
          <img
            v-bind:src="'data:image/png;base64,' + qrCode"
            class="img-borderify"
          />
          <br />
          <button
            @click="toggleQR"
            class="button is-danger is-light is-medium regenerate-button"
          >
            {{ toggleType }}
          </button>
          <h4 class="is-size-6 is-italic">(click to toggle)</h4>
          <br />
        </div>

        <!-- Any other Bulma elements you want -->
      </div>
      <button
        @click="closeQRModal"
        class="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
  </fragment>
</template>

<script>
import axios from "axios";

export default {
  name: "QRWidget",
  data() {
    return {
      qrCode: undefined,
      toggleType: "Student ID",
    };
  },
  mounted: function() {
    this.$auth.checkSession();
  },
  methods: {
    openQRModal() {
      document.getElementById("qr-modal").classList.add("is-active");
      document.getElementsByTagName("html")[0].classList.add("is-clipped");
      this.getQR();
    },
    closeQRModal() {
      document.getElementById("qr-modal").classList.remove("is-active");
      document.getElementsByTagName("html")[0].classList.remove("is-clipped");
    },
    toggleQR() {
      if (this.toggleType === "Student ID") {
        this.toggleType = "Email";
      } else {
        this.toggleType = "Student ID";
      }
      this.getQR();
    },
    getQR() {
      axios
        .post(process.env.VUE_APP_API_URL + "/qr", {
          link:
            this.toggleType === "Student ID"
              ? this.$auth.dbUser._id
              : this.$auth.user.email,
        })
        .then((res) => {
          this.qrCode = res.data;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
button {
  margin: 2%;
}
</style>
