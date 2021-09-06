import Vue from "vue";
import createAuth0Client from "@auth0/auth0-spa-js";
import axios from "axios";

let instance;

/** Returns the current instance of the SDK */
export const getInstance = () => instance;

/** Creates an instance of the Auth0 SDK. If one has already been created, it returns that instance */
export const useAuth = ({ ...options }) => {
  if (instance) return instance;

  // The 'instance' is simply a Vue object
  instance = new Vue({
    data() {
      return {
        isAuthenticated: false,
        user: null,
      };
    },
    methods: {
      async signupWithEmailPass(options) {
        axios
          .post(process.env.VUE_APP_API_URL + "/signup", {
            firstName: options.first,
            lastName: options.last,
            email: options.email,
            password: options.password,
          })
          .then((res) => {
            if (res.data.errors !== null) {
              this.user = res.data;
              return ["success"];
            } else {
              let errorsObj = [];
              for (const err in res.data.errors) {
                errorsObj.push(res.data.errors[err].msg);
              }
              return errorsObj;
            }
          });
      },

      async loginWithEmailPass(options) {
        axios
          .post(process.env.VUE_APP_API_URL + "/login", {
            email: options.email,
            password: options.password,
          })
          .then((res) => {
            if (res.data.errors !== null) {
              this.user = res.data;
              return ["success"];
            } else {
              let errorsObj = [];
              for (const err in res.data.errors) {
                errorsObj.push(res.data.errors[err].msg);
              }
              return errorsObj;
            }
          });
      },

      logout(o) {},
    },
  });

  return instance;
};

// Create a simple Vue plugin to expose the wrapper object throughout the application
export const AuthPlugin = {
  install(Vue, options) {
    Vue.prototype.$dbAuth = useAuth(options);
  },
};
