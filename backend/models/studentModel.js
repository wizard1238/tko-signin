var mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  department: {
    type: String,
    enum: [
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
    default: "undeclared",
  },
  admin: {
    type: Boolean,
    default: false,
  },
  grade: {
    type: Number,
    default: 0,
  },
  present: {
    type: Boolean,
    default: false,
  },
  times: [
    {
      time: Number,
      signin: Boolean,
    },
  ],
  totalSeconds: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("studentModel", studentSchema);