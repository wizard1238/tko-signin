<template>
  <div class="container">
    <h1 class="is-size-3 has-text-weight-bold is-family-code">
      Attendance Upload
    </h1>
    <h4 class="is-size-5 has-text-weight-light is-family-sans-serif">
      Upload a screenshot or scan of attendance documents here.
    </h4>

    <span class="tag is-danger is-hidden" id="error"
      >Error: {{ this.responseMsg }}
    </span>
    <span class="tag is-success is-hidden" id="success"
      >Success: {{ this.responseMsg }}
    </span>
    <div id="uploadlink" class="file is-centered has-name">
      <label class="file-label">
        <input
          class="file-input"
          type="file"
          ref="file"
          id="file"
          v-on:change="handleFileUpload()"
        />
        <span class="file-cta">
          <span class="file-icon">
            <font-awesome-icon icon="upload" />
          </span>
          <span class="file-label">
            Choose File
          </span>
        </span>
        <span class="file-name">
          No file uploaded
        </span>
      </label>
    </div>
    <button
      id="submitbutton"
      @click="submitImage"
      class="button is-link"
      disabled
    >
      Submit
    </button>
    <h4 class="is-size-6 has-text-weight-light is-family-sans-serif">
      <span class="tag is-danger is-light">Note</span>
      Make sure first names and last names are clearly in view.
    </h4>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Screenshot",
  data() {
    return {
      file: "",
      responseMsg: "",
    };
  },
  mounted: function() {
    const fileInput = document.querySelector("#uploadlink input[type=file]");
    fileInput.onchange = () => {
      if (fileInput.files.length > 0) {
        const fileName = document.querySelector("#uploadlink .file-name");
        fileName.textContent = fileInput.files[0].name;
        document.getElementById("submitbutton").disabled = false;
      }
    };
  },
  methods: {
    niceTimeout(isSuccess) {
      setTimeout(() => {
        document.getElementById("submitbutton").classList.remove("is-loading");
        if (isSuccess) {
          document.getElementById("error").classList.add("is-hidden");
          document.getElementById("success").classList.remove("is-hidden");
        } else {
          document.getElementById("success").classList.add("is-hidden");
          document.getElementById("error").classList.remove("is-hidden");
        }
      }, 500);
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitImage() {
      document.getElementById("submitbutton").classList.add("is-loading");
      let formData = new FormData();
      formData.append("file", this.file);
      let that = this;
      axios
        .post(process.env.VUE_APP_API_URL + "/screenshot", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function(res) {
          that.responseMsg = res.status;
          that.niceTimeout(true);
        })
        .catch(function(error) {
          that.responseMsg = error.response.status;
          that.niceTimeout(false);
        });
    },
  },
};
</script>
<style scoped>
#submitbutton {
  margin: 2%;
}
.tag {
  margin: 1%;
}
h1 {
  margin-top: 4%;
}
h4 {
  margin: 3%;
}
.container {
  text-align: center;
}
</style>
