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
                <div id="grade-dropdown" class="dropdown is-hoverable">
                  <div class="dropdown-trigger">
                    <button
                      class="button"
                      aria-haspopup="true"
                      aria-controls="dropdown-menu"
                    >
                      <span>{{ grade === undefined ? "Select" : grade }}</span>
                      <span class="icon is-small">
                        <font-awesome-icon icon="angle-down" />
                      </span>
                    </button>
                  </div>
                  <div class="dropdown-menu" id="grade-menu" role="menu">
                    <div class="dropdown-content">
                      <a class="dropdown-item grade-m">
                        9
                      </a>
                      <a class="dropdown-item grade-m">
                        10
                      </a>
                      <a class="dropdown-item grade-m">
                        11
                      </a>
                      <a class="dropdown-item grade-m">
                        12
                      </a>
                    </div>
                  </div>
                </div>
                <br /><br />
                <h3
                  class="is-size-4 has-text-centered has-text-weight-semibold is-family-secondary"
                >
                  Department
                </h3>
                <br />
                <div id="department-dropdown" class="dropdown is-hoverable">
                  <div class="dropdown-trigger">
                    <button
                      class="button"
                      aria-haspopup="true"
                      aria-controls="dropdown-menu"
                    >
                      <span>{{
                        department === undefined ? "Select" : department
                      }}</span>
                      <span class="icon is-small">
                        <font-awesome-icon icon="angle-down" />
                      </span>
                    </button>
                  </div>
                  <div class="dropdown-menu" id="department-menu" role="menu">
                    <div class="dropdown-content">
                      <a class="dropdown-item department-m">
                        Programming
                      </a>
                      <a class="dropdown-item department-m">
                        Subsystems
                      </a>
                      <a class="dropdown-item department-m">
                        Fabrication
                      </a>
                      <a class="dropdown-item department-m">
                        Electronics
                      </a>
                      <a class="dropdown-item department-m">
                        Media
                      </a>
                      <a class="dropdown-item department-m">
                        Design
                      </a>
                      <a class="dropdown-item department-m">
                        Business
                      </a>
                      <a class="dropdown-item department-m">
                        Outreach
                      </a>
                    </div>
                  </div>
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

export default {
  name: "ProfileWidget",
  data() {
    return {
      grade: undefined
      department: undefined,
    };
  },
  mounted: function() {
    document.addEventListener("DOMContentLoaded", function() {
      document.querySelectorAll(".dropdown").forEach(function(element) {
        element.addEventListener("click", function(event) {
          event.stopPropagation();
          element.classList.toggle("is-active");
        });
      });
      document.querySelectorAll(".dropdown-item").forEach(function(element) {
        element.addEventListener("click", function(event) {
          event.stopPropagation();
          if (element.classList.contains("grade-m")) {
            // this.grade = element.innerHTML;
          } else if (element.classList.contains("department-m")) {
            // this.department = element.innerHTML;
          }
        });
      });
    });
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
      this.closeProfileModal();
    },
  },
};
</script>
<style lang="scss" scoped>
button {
  margin: 2%;
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
