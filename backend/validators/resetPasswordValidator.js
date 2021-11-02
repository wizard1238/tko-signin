var { checkSchema } = require("express-validator");
var studentModel = require("../models/studentModel");

module.exports = new checkSchema({
  studentId: {
    exists: {
      errorMessage: "Please provide a studentId",
    },
    custom: {
      options: (value) => { 
        return studentModel.findById(value).then((student) => {
          if (!student) {
            return Promise.reject("Student not found");
          }
        });
      },
    },
  },
  newPassword: {
    isLength: {
        errorMessage: "Password has to be at least 7 chars long",
        options: {
            min: 7
        }
    },
    escape: {}
  }
});
