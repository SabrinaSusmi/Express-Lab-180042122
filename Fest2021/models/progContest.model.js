const mongoose = require("mongoose");

const progContestSchema = new mongoose.Schema({
  teamname: {
    type: String,
    required: true,
  },
  institute: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  paid: {
    type: Number,
    required: true,
  },
  selected: {
    type: Boolean,
    required: true,
  },
  coachname: {
    type: String,
    required: true,
  },
  coachcontact: {
    type: String,
    required: true,
  },
  coachmail: {
    type: String,
    required: true,
  },
  coachshirt: {
    type: String,
    required: true,
  },

  leadername: {
    type: String,
    required: true,
  },
  leadercontact: {
    type: String,
    required: true,
  },
  leadermail: {
    type: String,
    required: true,
  },
  leadershirt: {
    type: String,
    required: true,
  },

  mem1name: {
    type: String,
    required: true,
  },
  mem1contact: {
    type: String,
    required: true,
  },
  mem1mail: {
    type: String,
    required: true,
  },
  mem1shirt: {
    type: String,
    required: true,
  },

  mem2name: {
    type: String,
    required: true,
  },
  mem2contact: {
    type: String,
    required: true,
  },
  mem2mail: {
    type: String,
    required: true,
  },
  mem2shirt: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const progContest = mongoose.model("prog-contest", progContestSchema);
module.exports = progContest;
