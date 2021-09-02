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

    <button @click='toggleNewStudentVue'>New Student</button>
    <new-student v-if='showNewStudentPane' @created='newStudentCreated'></new-student>
  </div>
</template>

<script>
import axios from 'axios'
import NewStudentVue from '../components/NewStudent.vue'
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      students: null,
      showNewStudentPane: false
    }
  },
  mounted() {
    this.getStudents()
  },
  components: {
    'NewStudent': NewStudentVue
  },
  methods: {
    getStudents() {
      axios
      .get(this.$api + '/students')
      .then(res => {this.students = res.data})
      .catch(err => {console.log(err)})
    },
    toggleNewStudentVue() {
      this.showNewStudentPane = !this.showNewStudentPane
    },
    newStudentCreated() {
      this.getStudents()
      this.toggleNewStudentVue()
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
