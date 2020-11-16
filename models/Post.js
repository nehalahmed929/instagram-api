var mongoose = require("mongoose");
var joi = require("joi");

postSchema = mongoose.Schema({
  imageUrl: String,
  caption: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

let Post = mongoose.model("Post", postSchema);

function validatePost(data) {
  const schema = joi.object({
    imageUrl: joi.string(),
    caption: joi.string(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.Post = Post;
module.exports.validate = validatePost;
