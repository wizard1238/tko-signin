<template>
  <div class="home">
    <section class="hero is-halfheight">
      <div class="hero-body">
        <div class="columns">
          <div class="column">
            <h1 class="is-size-2 has-text-weight-bold is-family-code">
              Students
            </h1>
            <p>Students present: {{ studentsPresent }} | Students total: {{ studentsTotal }}</p>
            <br />
            <table class="table is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Total time (seconds)</th>
                  <th>Department</th>
                  <th>Grade</th>
                  <th>Admin</th>
                  <th>Present</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="student in students">
                  <tr :key="student._id">
                    <td>{{ student.firstName + " " + student.lastName }}</td>
                    <td>{{ student.totalSeconds }}</td>
                    <td>{{ student.department }}</td>
                    <td>{{ student.grade }}</td>
                    <td>{{ student.admin }}</td>
                    <td>{{ student.present }}</td>
                    <td><button @click="student.shown = !student.shown" class="button is-danger">Reset Password</button></td>
                    <div v-if="student.shown">
                      <form id="password-reset-form" name="password-reset-form" @submit.prevent="resetPassword(student._id, student.newPassword)">
                        <label for="new-password" class="label">Enter new password: </label>
                        <input type="password" v-model="student.newPassword" class="input" id="new-password" name="new-password">
                        <button type="submit" class="button">Reset</button>
                      </form>
                    </div>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <div class="column">
            <h1 class="is-size-2 has-text-weight-bold is-family-code">Time</h1>
            <br />
            <table class="table is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Sign in / Sign out</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="time in times">
                  <tr :key="time.id">
                    <td>{{ time.name }}</td>
                    <td>{{ time.action }}</td>
                    <td>{{ time.time }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "StudentData",
  methods: {
    showData() {
      this.$store.dispatch("getAllStudents").then((data) => {        
        this.studentsTotal = data.length
        for (let student of data) {

          if (student.present) {
            this.studentsPresent++
          }

          this.students.push({
            ...student,
            shown: false,
            newPassword: "",
          })

          for (let time of student.times) {
            this.times.push({
              name: student.firstName + " " + student.lastName,
              time: new Date(time.time * 1000).toLocaleString(),
              seconds: time.time,
              action: time.signin ? "Sign in" : "Sign out",
            });
          }
        }

        this.times.sort((a, b) => {
          return a.seconds - b.seconds;
        });
      });
    },
    resetPassword(studentId, newPassword) {
      this.$store.dispatch("resetPass", {
        options: {
          studentId: studentId,
          password: newPassword,
        }
      })
        .then((res) => {})
        .catch((err) => {alert(err[0].msg)})

      let student = this.students.find((student) => student._id == studentId)
      student.shown = false
      student.newPassword = ""
    },
  },
  mounted: function() {
    this.showData();
  },
  data() {
    return {
      times: [],
      students: [],
      studentsPresent: 0,
      studentsTotal: 0,
    };
  },
};
</script>
<style scoped>
.hero-body {
  width: 100% !important;
  align-content: center;
  align-items: center;
  justify-content: center;
}
</style>
