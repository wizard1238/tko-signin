<template>
  <div class="home">
    <table>
      <tr>
        <th>Name</th>
        <th>Department</th>
        <th>Grade</th>
        <th>Present</th>
        <th>Total Time</th>
      </tr>
      <tr v-for='student in students' v-bind:key='student'>
        <td>{{student.firstName + " "+ student.lastName}}</td>
        <td>{{student.department}}</td>
        <td>{{student.grade}}</td>
        <td>{{student.present}}</td>
        <td>{{student.totalSeconds}}</td>
        <button @click='deleteStudent(student._id)'>del</button>
        <button @click='scan(student._id)'>Scan</button>
      </tr>
    </table>

    <button @click='newStudent'>New Student</button> 
  </div>
</template>

<script>
import axios from 'axios'
// @ is an alias to /src
import('axios')

export default {
  name: 'Home',
  data() {
    return {
      students: null
    }
  },
  mounted() {
    this.getStudents()
  },
  methods: {
    getStudents() {
      axios
      .get(this.$api + '/students')
      .then(res => {this.students = res.data})
      .catch(err => {console.log(err)})
    },
    newStudent() {
      axios.post(this.$api + '/newStudent')
        .then(() => {this.getStudents()})
    },
    deleteStudent(id) {
      axios.post(this.$api + '/deleteStudent', {
        studentId: id,
      })
        .then(() => {this.getStudents()})
    },
    scan(id) {
      axios.post(this.$api + '/scanned', {
        studentId: id,
      })
        .then(() => {this.getStudents()})
    }
  }
}
</script>
