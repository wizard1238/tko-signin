<template>
  <section class="hero">
    <qrcode-stream @decode="onDecode"></qrcode-stream>
  </section>
</template>
<script>
import { QrcodeStream } from "vue-qrcode-reader";

export default {
  name: "QRScanner",
  components: {
    "qrcode-stream": QrcodeStream,
  },
  methods: {
    onDecode(decodedString) {
      this.$store.dispatch("studentScanned", {
        studentId: decodedString,
      });
    },
  },
};
</script>
