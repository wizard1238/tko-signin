<template>
    <div>
        <form @submit.prevent='getCode'>
            <img v-bind:src="'data:image/jpeg;base64,' + qrCode" />
            <input type="text" name="studentId" id="studentId" v-model="studentId">
            <button type="submit">Go!</button>
        </form>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: 'GetQRCode',
    data() {
        return {
            studentId: undefined,
            qrCode: undefined
        }
    },
    methods: {
        getCode() {
            axios.post(this.$api + '/qr', {
                link: this.studentId
            })
            .then((res) => {this.qrCode = res.data})
        }
    }
}
</script>
