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
        console.log(process.env.VUE_APP_API_URL + "/signup")
        axios
          .post(process.env.VUE_APP_API_URL + "/signup", {
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
    resetPass(state, { options }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: process.env.VUE_APP_API_URL + "/resetPassword",
          data: {
            studentId: options.studentId,
            newPassword: options.password,
          },
          withCredentials: true,
        })
          .then((res) => {
            resolve(res.data)
          })
          .catch((err) => {
            reject(err.response.data.errors)
          })
      })
    },
    loginWithEmailPass(state, { options }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: process.env.VUE_APP_API_URL + "/login",
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
            reject(err.response.data.errors);
          });
      });
    },
    signEveryoneOut(state) {
      axios({
        method: "post",
        url: process.env.VUE_APP_API_URL + "/signEveryoneOut",
        withCredentials: true,
      });
    },
    logout(state) {
      store.commit("changeUser", {
        user: undefined,
      });
      axios({
        method: "post",
        url: process.env.VUE_APP_API_URL + "/logout",
        withCredentials: true,
      });
    },
    studentScanned(state, { studentId }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: process.env.VUE_APP_API_URL + "/scanned",
          data: {
            studentId: studentId,
          },
          withCredentials: true,
        }).then((res) => {
          resolve(res.data);
        });
      });
    },
    retrieveNewData(state) {
      axios({
        method: "post",
        url: process.env.VUE_APP_API_URL + "/user",
        withCredentials: true,
      }).then((res) => {
        store.commit("changeUser", {
          user: res.data,
        });
      });
    },
    updateUser(state, { options }) {
      axios({
        method: "post",
        url: process.env.VUE_APP_API_URL + "/update",
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
    getAllStudents() {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: process.env.VUE_APP_API_URL + "/students",
          withCredentials: true,
        }).then((res) => {
          resolve(res.data);
        });
      });
    },
  },
});

export { store };
