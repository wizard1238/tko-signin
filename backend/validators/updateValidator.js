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
  firstName: {
    isLength: {
      errorMessage: "Please provide a first name",
      options: {
        min: 1,
      },
    },
    escape: {},
    trim: {},
  },
  lastName: {
    isLength: {
      errorMessage: "Please provide a last name",
      options: {
        min: 1,
      },
    },
    escape: {},
    trim: {},
  },
  department: {
    isIn: {
      errorMessage:
        "department must be one of undeclared, rookie, programming, subsystems, electronics, chassis, media, business, design, outreach, scouting",
      options: [
        [
          "undeclared",
          "rookie",
          "programming",
          "subsystems",
          "electronics",
          "chassis",
          "media",
          "business",
          "design",
          "outreach",
          "scouting",
        ],
      ],
    },
  },
  grade: {
    isNumeric: {},
  },
});
