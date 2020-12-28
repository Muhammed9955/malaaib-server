const { model, Schema } = require("mongoose");

const reservationsSchema = new Schema({
  date: String,
  time: [String],
  newTimes: [],
  createdAt: String,
  senderID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  recipentID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  playgroundID: {
    type: Schema.Types.ObjectId,
    ref: "PlayGround",
  },
});

module.exports = model("Reservation", reservationsSchema);
