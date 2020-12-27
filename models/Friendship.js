var mongoose = require("mongoose");
var joi = require("joi");

friendshipSchema = mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  followed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let Friendship = mongoose.model("Friendship", friendshipSchema);

function validateFriendship(data) {
  const schema = joi.object({
    text: joi.string().required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.Friendship = Friendship;
module.exports.validate = validateFriendship;
