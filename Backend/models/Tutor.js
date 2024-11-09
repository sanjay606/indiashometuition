// models/Tutor.js
const mongoose = require("mongoose");

const TutorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
});

const Tutor = mongoose.model("Tutor", TutorSchema);

module.exports = Tutor; // Make sure this line is present
