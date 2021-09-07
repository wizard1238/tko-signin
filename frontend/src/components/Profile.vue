<template>
  <fragment>
    <button
      @click="openProfileModal"
      class="button is-primary is-light is-medium"
    >
      Profile
    </button>
    <div class="modal" id="profile-modal">
      <div class="modal-background"></div>
      <div class="modal-content">
        <article class="message is-info">
          <div class="message-header">
            <p>Dark</p>
          </div>
          <div class="message-body">
            <div class="columns is-vcentered">
              <div class="column">
                <h3
                  class="is-size-4 has-text-centered has-text-weight-semibold is-family-secondary"
                >
                  Grade
                </h3>
                <br />
                <div class="dropdown-container">
                  <Dropdown
                    :options="[
                      { id: 1, name: '9' },
                      { id: 2, name: '10' },
                      { id: 3, name: '11' },
                      { id: 4, name: '12' },
                    ]"
                    :disabled="false"
                    name="grades"
                    :maxItem="10"
                    placeholder="Please select an option"
                  >
                  </Dropdown>
                </div>

                <br />
                <h3
                  class="is-size-4 has-text-centered has-text-weight-semibold is-family-secondary"
                >
                  Department
                </h3>
                <br />
                <div class="dropdown-container">
                  <Dropdown
                    :options="[
                      { id: 1, name: 'Rookie' },
                      { id: 2, name: 'Programming' },
                      { id: 3, name: 'Subsystems' },
                      { id: 4, name: 'Electronics' },
                      { id: 5, name: 'Chassis' },
                      { id: 6, name: 'Media' },
                      { id: 7, name: 'Business' },
                      { id: 8, name: 'Design' },
                      { id: 9, name: 'Outreach' },
                      { id: 10, name: 'Scouting' },
                      { id: 11, name: 'Undeclared' },
                    ]"
                    :disabled="false"
                    name="departments"
                    :maxItem="11"
                    placeholder="Please select an option"
                  >
                  </Dropdown>
                </div>

                <br /><br />
                <button @click="saveData" class="button is-dark">Update</button>
              </div>
            </div>
          </div>
        </article>
      </div>
      <button
        @click="closeProfileModal"
        class="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
  </fragment>
</template>

<script>
import axios from "axios";
import Dropdown from "vue-simple-search-dropdown";

export default {
  name: "ProfileWidget",
  components: {
    Dropdown: Dropdown,
  },
  methods: {
    openProfileModal() {
      document.getElementById("profile-modal").classList.add("is-active");
      document.getElementsByTagName("html")[0].classList.add("is-clipped");
    },
    closeProfileModal() {
      document.getElementById("profile-modal").classList.remove("is-active");
      document.getElementsByTagName("html")[0].classList.remove("is-clipped");
    },
    saveData() {
      const grade = document.getElementsByName("grades")[0].value.toLowerCase();
      const department = document
        .getElementsByName("departments")[0]
        .value.toLowerCase();

      this.$store.dispatch("updateUser", {
        options: {
          grade: grade,
          department: department,
        },
      });

      this.closeProfileModal();
    },
  },
};
</script>
<style lang="scss" scoped>
button {
  margin: 2%;
}

.dropdown-container {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.message {
  border-radius: 6px !important;
  height: 60%;
  transform: translateY(40%);
}
.modal-content {
  height: 90%;
}
.message-body {
  height: 100%;
}
.columns {
  height: 100%;
}
</style>
