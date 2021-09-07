<template>
  <section class="message">
    <div class="message-header">
      <p>Scan QR</p>
    </div>
    <div class="message-body">
      <qrcode-stream @decode="onDecode" :key="rerender">
        <div id="flash" v-if="shown" z-index="999">
          <section class="message">
            <div class="message-header">
              {{ studentName + (present ? " signed in" : " signed out") }}
            </div>
          </section>
        </div>
      </qrcode-stream>
    </div>
  </section>
</template>
<script>
import { QrcodeStream } from "vue-qrcode-reader";

export default {
  name: "QRScanner",
  data() {
    return {
      studentName: "",
      present: false,
      shown: false,
      rerender: 0,
    };
  },
  components: {
    "qrcode-stream": QrcodeStream,
  },
  methods: {
    onDecode(decodedString) {
      this.$store
        .dispatch("studentScanned", {
          studentId: decodedString,
        })
        .then((student) => {
          this.$forceReload;
          this.studentName = student.firstName + " " + student.lastName;
          this.present = student.present;
          this.shown = true;
          var that = this; //whyyyyyyyyyyyyyyyyyyyyyyyyyy
          setTimeout(function() {
            that.shown = false;
            that.rerender++;
          }, 2000);
        });
    },
  },
};
</script>
<style scoped>
.message {
  margin-top: 30px;
  margin: 0 auto;
  max-width: 65%;
  max-height: 50%;
}

#flash {
  left: 50%;
  top: 50%;
}
</style>
