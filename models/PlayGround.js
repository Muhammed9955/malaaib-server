const { model, Schema } = require("mongoose");

const PlayGroundSchema = new Schema({
  name: String,
  city: String,
  location: String,
  price: String,
  contactNumber: String,
  amenities: [String],
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  owner: String,
  ownerPhone: String,
  ownerImgUrl: String,
  ownerCreatedAt: String,
  createdAt: String,
  avaliable_hours_start: String,
  avaliable_hours_end: String,
  playground_Images: [String],
});

module.exports = model("PlayGround", PlayGroundSchema);
