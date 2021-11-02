<template>
  <div class="home">
    <section class="hero is-halfheight">
      <div class="hero-body">
        <div class="columns">
          <div class="column">
            <h1 class="is-size-2 has-text-weight-bold is-family-code">
              Students
            </h1>
            <p>
              Students present: {{ studentsPresent }} | Students total:
              {{ studentsTotal }}
            </p>
            <br />
            <table class="table is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Total time (seconds)</th>
                  <th>Department</th>
                  <th>Grade</th>
                  <th>Admin</th>
                  <th></th>
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
                    <td>
                      <button @click="toggleAdmin(student._id)" class="button is-danger">
                        Toggle
                      </button>
                    </td>
                    <td>{{ student.present }}</td>
                    <td>
                      <button
                        @click="student.shown = !student.shown"
                        class="button is-danger"
                      >
                        Reset Password
                      </button>
                    </td>
                    <div v-if="student.shown">
                      <form
                        id="password-reset-form"
                        name="password-reset-form"
                        @submit.prevent="
                          resetPassword(student._id, student.newPassword)
                        "
                      >
                        <div class="columns is-vcentered is-centered">
                          <div class="column is-full">
                            <p
                              class="is-size-6 has-text-centered has-text-weight-bold is-family-monospace"
                            >
                              Enter new password
                            </p>
                            <input
                              type="password"
                              v-model="student.newPassword"
                              class="input"
                              id="new-password"
                              name="new-password"
                            />
                            <button
                              type="submit"
                              class="button is-primary is-light reset-btn"
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
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
        this.studentsTotal = data.length;
        this.students = []
        for (let student of data) {
          if (student.present) {
            this.studentsPresent++;
          }

          this.students.push({
            ...student,
            shown: false,
            newPassword: "",
          });
        }
      });
    },
    resetPassword(studentId, newPassword) {
      this.$store
        .dispatch("resetPass", {
          options: {
            studentId: studentId,
            password: newPassword,
          },
        })
        .then((res) => {})
        .catch((err) => {
          alert(err[0].msg);
        });

      let student = this.students.find((student) => student._id == studentId);
      student.shown = false;
      student.newPassword = "";
    },
    toggleAdmin(studentId) {
      this.$store.dispatch("toggleAdmin", {
        studentId: studentId
      })
      .then(() => {
        this.showData()
      })
    }
  },
  mounted: function() {
    this.showData();
  },
  data() {
    return {
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

.reset-btn {
  margin: 0 auto;
}

table {
  background: transparent;
}
</style>
