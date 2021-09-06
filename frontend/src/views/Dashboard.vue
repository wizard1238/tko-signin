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
            <button
              @click="openQRModal"
              class="button is-info is-light is-medium"
            >
              Display QR
            </button>
          </div>
        </div>
      </div>
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
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Dashboard",
  data() {
    return {
      qrCode: undefined,
      toggleType: "Email",
      studentId: undefined,
    };
  },
  mounted: function() {
    this.getStudentID();
  },
  methods: {
    openQRModal() {
      document.getElementById("qr-modal").classList.add("is-active");
      document.getElementsByTagName("html")[0].classList.add("is-clipped");
      this.getQR();
      this.getStudentID();
    },
    closeQRModal() {
      document.getElementById("qr-modal").classList.remove("is-active");
    },
    getStudentID() {
      axios.get(process.env.VUE_APP_API_URL + "/students").then((res) => {
        for (const obj in res.data) {
          if (res.data[obj].email === this.$auth.user.email) {
            this.studentId = res.data[obj]._id;
          }
        }
      });
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
              ? this.studentId
              : this.$auth.user.email,
        })
        .then((res) => {
          this.qrCode = res.data;
        });
    },

    // createTestStudent() {
    //   axios
    //     .post("http://localhost:3000/newStudent", {
    //       firstName: "Rohan",
    //       lastName: "Bansal",
    //       email: "bansalrohan18@gmail.com",
    //     })
    //     .then((res) => {
    //       this.$emit("created");
    //     });
    // },
    getStudents() {
      axios.get(process.env.VUE_APP_API_URL + "/students").then((res) => {
        console.log(res.data);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
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
.is-xl {
  font-size: 1.7rem;
}
</style>
