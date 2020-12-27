var mongoose = require("mongoose");
var joi = require("joi");

commentSchema = mongoose.Schema({
  comment: String,

  // reply:{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Comment",
  // },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

let Comment = mongoose.model("Comment", commentSchema);

function validateComment(data) {
  const schema = joi.object({
    comment: joi.string().required(),
    post: joi.required(),
    user: joi.required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.Comment = Comment;
module.exports.validate = validateComment;
