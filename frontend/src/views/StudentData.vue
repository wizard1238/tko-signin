<template>
  <div class="home">
    <section class="hero is-halfheight">
      <div class="hero-body">
        <table class="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Sign in / Sign out</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="item in students">
              <tr :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.action }}</td>
                <td>{{ item.time }}</td>
              </tr>
            </template>
          </tbody>
        </table>
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
        for (let student of data) {
          for (let time of student.times) {
            this.students.push({
              name: student.firstName + " " + student.lastName,
              time: new Date(time.time * 1000).toLocaleString(),
              seconds: time.time,
              action: time.signin ? "Sign in" : "Sign out",
            });
          }
        }

        this.students.sort((a, b) => {
          return a.seconds - b.seconds;
        });
        this.students.console.log(this.students);
      });
    },
  },
  mounted: function() {
    this.showData();
  },
  data() {
    return {
      students: [],
    };
  },
};
</script>
