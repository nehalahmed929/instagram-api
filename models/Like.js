var mongoose = require("mongoose");
var joi = require("joi");

likeSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

let Like = mongoose.model("Like", likeSchema);

function validateLike(data) {
  const schema = joi.object({
    user: joi.required(),
    post: joi.required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.Like = Like;
module.exports.validate = validateLike;
