<template>
    <div>
        <form @submit.prevent='newStudent'>
            <label for="firstName">First Name: </label>
            <input type="text" name="firstName" id="firstName" v-model="firstName">
            <label for="lastName">Last Name: </label>
            <input type="text" name="lastName" id="lastName" v-model="lastName">
            <label for="grade">Grade: </label>
            <select name="grade" id="grade" v-model="grade">
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
            </select>
            <label for="department">Department: </label>
            <select name="department" id="department" v-model="department">
                <option value="scouting">Scouting</option>
                <option value="programming">Programming</option>
                <option value="subsystems">Subsystems</option>
            </select>
            <button type="submit">Create!</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'NewStudent',
    data() {
        return {
            firstName: "",
            lastName: "",
            grade: "",
            department: ""
        }
    },
    methods: {
        newStudent() {
        axios.post(this.$api + '/newStudent', {
            firstName: this.firstName,
            lastName: this.lastName,
            department: this.department,
            grade: this.grade,
        })
            .then(() => {this.$emit('created')})
        }
    }
}
</script>
