import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    dbUser: undefined,
  },
  mutations: {
    changeUser(state, { user }) {
      state.dbUser = user;
    },
  },
  actions: {
    signUpWithEmailPass(state, { options }) {
      axios
        .post("http://localhost:3000/signup", {
          email: options.email,
          password: options.password,
          firstName: options.first,
          lastName: options.last,
        })
        .then((res) => {
          store.dispatch("loginWithEmailPass", {
            options: {
              email: options.email,
              password: options.password,
            },
          });
        })
        .catch((err) => {
          return err.response.data.errors;
        });
    },
    loginWithEmailPass(state, { options }) {
      axios({
        method: "post",
        url: "http://localhost:3000/login",
        data: {
          email: options.email,
          password: options.password,
        },
        withCredentials: true,
      })
        .then((res) => {
          store.commit("changeUser", {
            user: res.data,
          });
          return res.data;
        })
        .catch((err) => {
          return err.response.data.errors;
        });
    },
  },
});

export { store };
