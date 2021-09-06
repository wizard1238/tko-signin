<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form id="signup-form" name="signup_form" action="" class="box">
              <div class="field">
                <label for="" class="label">First Name</label>
                <div class="control has-icons-left">
                  <input
                    type="text"
                    placeholder="e.g. Bob"
                    class="input"
                    name="firstname"
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
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>

              <div class="field">
                <button @click="signup" class="button is-success">
                  Login
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

export default {
  name: "Signup",
  methods: {
    signup() {
      function allLetter(uname) {
        var letters = /^[A-Za-z]+$/;
        if (uname.value.match(letters)) {
          return true;
        } else {
          alert("First and last name must contain only alphabet characters.");
          uname.focus();
          return false;
        }
      }

      function validateEmail(uemail) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (uemail.value.match(mailformat)) {
          return true;
        } else {
          alert("Invalid email address.");
          uemail.focus();
          return false;
        }
      }

      let first = document.signup_form.firstname;
      let last = document.signup_form.lastname;
      let email = document.signup_form.email;
      let pass = document.signup_form.password;
      let pass2 = document.signup_form.password_2;

      if (!allLetter(first)) return;
      if (!allLetter(last)) return;
      if (!validateEmail(email)) return;
      if (pass.value !== pass2.value) {
        alert("Passwords must match.");
        return;
      }
      if (pass.value.length < 7) {
        alert("Password must be 7 characters or more.");
        return;
      }

      const res = this.$dbAuth.signupWithEmailPass({
        firstName: first,
        lastName: last,
        email: email,
        password: password,
      });

      if (res[0] !== "success") {
        alert(res.join("\n"));
        return;
      } else {
        this.$dbAuth.loginWithEmailPass({
          email: email,
          password: password,
        });
      }
    },
  },
};
</script>
