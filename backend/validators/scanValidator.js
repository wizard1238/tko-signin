var { checkSchema } = require("express-validator");
var studentModel = require("../models/studentModel");

module.exports = new checkSchema({
  studentId: {
    isLength: {
      errorMessage: "Please provide a valid studentId",
      bail: true,
      options: {
        min: 24,
        max: 24,
      },
    },
    isAlphanumeric: {
      errorMessage: "Please provide a valid studentId",
    },
    custom: {
      options: (value) => {
        return studentModel.findOne({ _id: value }).then((student) => {
          if (!student) {
            return Promise.reject("Please provide a valid studentId");
          }
        });
      },
    },
    escape: {},
    trim: {},
  },
});
