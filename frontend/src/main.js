import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "bulma/css/bulma.css";

import Fragment from "vue-fragment";
Vue.use(Fragment.Plugin);

import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faAngleDown);
library.add(faUpload);

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
