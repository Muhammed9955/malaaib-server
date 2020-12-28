const { model, Schema } = require("mongoose");

const rev_hoursSchema = new Schema({
  date: String,
  playgroundID: String,
  rev_hours: [],
  createdAt: String,
});

module.exports = model("Rev_hours", rev_hoursSchema);
