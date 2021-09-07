import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "bulma/css/bulma.css";

// Import the Auth0 configuration
import { domain, clientId } from "../auth_config.json";

// Import the plugin here
import { Auth0Plugin } from "./auth";
import { AuthPlugin } from "./auth/custom_auth";

import Fragment from "vue-fragment";
Vue.use(Fragment.Plugin);

import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faAngleDown);

Vue.component("font-awesome-icon", FontAwesomeIcon);

import Dropdown from "vue-simple-search-dropdown";
Vue.use(Dropdown);

Vue.component("qrcode-scanner", {
  props: {
    qrbox: Number,
    fps: Number,
  },
  template: `<div id="qr-code-full-region"></div>`,
  mounted: function() {
    var config = { fps: this.fps ? this.fps : 10 };
    if (this.qrbox) {
      config["qrbox"] = this.qrbox;
    }

    function onScanSuccess(qrCodeMessage) {
      console.log(qrCodeMessage);
    }

    var html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-code-full-region",
      config
    );
    html5QrcodeScanner.render(onScanSuccess);
  },
});

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  },
});

Vue.use(AuthPlugin);

Vue.config.productionTip = false;

import { store } from "./store/index";

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
