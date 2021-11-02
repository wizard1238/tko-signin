<template>
  <div class="home">
    <section class="hero is-halfheight">
      <div class="hero-body">
        <div class="columns">
          <div class="column col-3">
            <h1 class="is-size-2 has-text-weight-bold is-family-code">Time</h1>
            <p>
              Students present: {{ studentsPresent }} | Students total:
              {{ studentsTotal }}
            </p>
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
        this.studentsTotal = data.length;
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
