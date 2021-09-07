import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    dbUser: undefined,
  },
  plugins: [createPersistedState()],
  mutations: {
    changeUser(state, { user }) {
      state.dbUser = user;
    },
  },
  actions: {
    signUpWithEmailPass(state, { options }) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3000/signup", {
            email: options.email,
            password: options.password,
            firstName: options.first,
            lastName: options.last,
          })
          .then((res) => {
            store.commit("changeUser", {
              user: res.data,
            });
            store.dispatch("loginWithEmailPass", {
              options: {
                email: options.email,
                password: options.password,
              },
            });
            resolve();
          })
          .catch((err) => {
            reject(err.response.data.errors);
          });
      });
    },
    loginWithEmailPass(state, { options }) {
      return new Promise((resolve, reject) => {
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
            resolve(res.data);
          })
          .catch((err) => {
            // alert("Invalid Credentials.");
            reject(err.response.data.errors);
          });
      });
    },
    logout(state) {
      store.commit("changeUser", {
        user: undefined,
      });
      axios({
        method: "post",
        url: "http://localhost:3000/logout",
        withCredentials: true,
      });
    },
    updateUser(state, { options }) {
      axios({
        method: "post",
        url: "http://localhost:3000/update",
        data: {
          studentId: store.state.dbUser._id,
          firstName: store.state.dbUser.firstName,
          lastName: store.state.dbUser.lastName,
          grade: options.grade,
          department: options.department,
        },
        withCredentials: true,
      });
    },
  },
});

export { store };
