<template>
  <div class="about">
    <GetQRCode/>
  </div>
</template>

<script>
import GetQRCode from "../components/GetQRCode.vue"

export default {
  name: "QR",
  components: {
    "GetQRCode": GetQRCode
  }
}
</script>
