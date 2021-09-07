<template>
  <div class="home">
    <section class="hero is-halfheight">
      <div class="hero-body">
        <div class="columns">
          <div class="column">
            <h1 class="is-size-2 has-text-weight-bold is-family-code">
              Students
            </h1>
            <br />
            <table class="table is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Total time (seconds)</th>
                  <th>Department</th>
                  <th>Grade</th>
                  <th>Present</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="student in students">
                  <tr :key="student.id">
                    <td>{{ student.firstName + " " + student.lastName }}</td>
                    <td>{{ student.totalSeconds }}</td>
                    <td>{{ student.department }}</td>
                    <td>{{ student.grade }}</td>
                    <td>{{ student.present }}</td>
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
        this.students = data;
        for (let student of data) {
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
  },
  mounted: function() {
    this.showData();
  },
  data() {
    return {
      times: [],
      students: [],
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
