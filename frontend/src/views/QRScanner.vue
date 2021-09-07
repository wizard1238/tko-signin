<template>
  <section class="hero">
    <qrcode-scanner v-bind:qrBox="250" style="width: 500px;"></qrcode-scanner>
  </section>
</template>
<script>
export default {
  name: "QRScanner",
};
</script>
