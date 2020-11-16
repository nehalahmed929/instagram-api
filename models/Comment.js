var mongoose = require("mongoose");
var joi = require("joi");

commentSchema = mongoose.Schema({
  text: String,
  date: {
    type: Date,
    default: Date.now,
  },

  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

let Comment = mongoose.model("Comment", commentSchema);

function validateComment(data) {
  const schema = joi.object({
    text: joi.string().required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.Comment = Comment;
module.exports.validate = validateComment;
